import { useEffect, useState } from "react";
import { db } from "@/lib/firebase";
import { FacilitiesRepository } from "@/repository/FacilitiesRepository";
export const useMapCachePage = () => {
  const facilitiesRepository = new FacilitiesRepository(db);
  const [facilities, setFacilities] = useState<any[]>([]);
  const [fetchTime, setFetchTime] = useState<number>();
  const fetchFacilities = async () => {
    const startTime = performance.now();
    const faci = await facilitiesRepository.fetchCacheAll();
    // @ts-ignore
    setFacilities(faci);
    const endTime = performance.now();
    const timeTaken = (endTime - startTime) / 1000;
    setFetchTime(timeTaken);
  };
  useEffect(() => {
    fetchFacilities();
  }, []);
  return {
    facilities,
    fetchTime,
  };
};
