"use client";

import { Status, Wrapper } from "@googlemaps/react-wrapper";
import { GoogleMap } from "../GoogleMap";
import { useMapCachePage } from "./useMapCachePage";

export default function MapCachePage() {
  const { facilities, fetchTime } = useMapCachePage();
  const render = (status: Status) => {
    return <h1>{status}</h1>;
  };
  const mapApiKey = process.env.NEXT_PUBLIC_GOOGLE_MAP_KEY as string;
  const position = {
    lat: 35.875630048514026,
    lng: 139.79076301889265,
  };
  return (
    <div>
      <p>Map page</p>
      <p>取得した施設数：{facilities.length}</p>
      <p>取得にかかった時間：{fetchTime}</p>
      <Wrapper apiKey={mapApiKey} render={render}>
        <div className="h-96 w-96">
          <GoogleMap
            style={{ width: "100%", height: "100%" }}
            center={position}
          />
        </div>
      </Wrapper>
    </div>
  );
}
