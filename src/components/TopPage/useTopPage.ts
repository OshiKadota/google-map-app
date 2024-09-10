import { useRouter } from "next/navigation";

export const useTopPage = () => {
  const router = useRouter();
  const jumpToMapPage = () => {
    return router.push("/map");
  };
  const jumpToMapCachePage = () => {
    return router.push("/map-cache");
  };
  return {
    jumpToMapPage,
    jumpToMapCachePage,
  };
};
