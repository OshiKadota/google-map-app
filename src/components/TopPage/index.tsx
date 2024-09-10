"use client";

import Button from "../atoms/Button";
import { useTopPage } from "../TopPage/useTopPage";
export default function TopPage() {
  const { jumpToMapPage, jumpToMapCachePage } = useTopPage();

  return (
    <div>
      <div>
        <p>top page</p>
      </div>
      <div>
        <Button onClick={jumpToMapPage} value={"map page"} />
      </div>
      <div>
        <Button onClick={jumpToMapCachePage} value={"map cache page"} />
      </div>
    </div>
  );
}
