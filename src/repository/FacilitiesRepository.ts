import {
  collection,
  DocumentData,
  Firestore,
  getDocs,
  getDocsFromCache,
  getDocsFromServer,
  limit,
  query,
  QueryDocumentSnapshot,
  startAfter,
} from "firebase/firestore";

export class FacilitiesRepository {
  db: Firestore;
  constructor(db: Firestore) {
    this.db = db;
  }

  public async fetchAll() {
    try {
      console.log("fetchAll");
      let colRef = collection(this.db, "Facilities");
      let batchSize = 100;
      let lastDoc: QueryDocumentSnapshot<DocumentData> | null = null;
      let allData: DocumentData[] = [];
      while (true) {
        let q;
        if (lastDoc) {
          q = query(colRef, limit(batchSize), startAfter(lastDoc));
        } else {

          q = query(colRef, limit(batchSize));
        }

        // @ts-ignore
        const snapshot = await getDocsFromServer(q);

        if (snapshot.empty) {
          console.log("No more documents to fetch");
          break;
        }

 
        // @ts-ignore
        snapshot.docs.forEach((doc) => {
          allData.push(doc.data());
        });


        lastDoc = snapshot.docs[snapshot.docs.length - 1];

        console.log(`${allData.length} documents fetched so far`);
      }

      return allData;
    } catch (e) {
      console.error("Error fetching documents in batches", e);
    }
  }

  public async fetchCacheAll() {
    try {
      console.log("fetchCacheAll");
      let colRef = collection(this.db, "Facilities");
      const cachedSnapshot = await getDocsFromCache(colRef);
      if (cachedSnapshot.empty) {
        console.log("cacheされていないです");
        this.fetchAll();
        return;
      }
      return cachedSnapshot.docs.map((doc) => {
        return doc.data();
      });
    } catch (e) {
      console.error("Error fetching documents in batches", e);
    }
  }
}
