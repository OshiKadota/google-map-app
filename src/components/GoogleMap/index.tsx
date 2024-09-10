"use client";

import {
  useRef,
  useState,
  useEffect,
  isValidElement,
  Children,
  cloneElement,
} from "react";

type MapProps = google.maps.MapOptions & {
  style: { [key: string]: string };
  children?:
    | React.ReactElement<google.maps.MarkerOptions>[]
    | React.ReactElement<google.maps.MarkerOptions>;
};

export const GoogleMap: React.FC<MapProps> = ({
  children,
  style,
  ...options
}) => {
  const ref = useRef<HTMLDivElement>(null);
  const [map, setMap] = useState<google.maps.Map>();

  useEffect(() => {
    if (ref.current && !map) {
      const option = {
        center: options.center,
        zoom: 16,
        zoomControl: true,
        mapTypeControl: false,
        scaleControl: false,
        streetViewControl: false,
        rotateControl: false,
        fullscreenControl: false,
        minZoom: 16 - 2,
        maxZoom: 16 + 2,
        keyboardShortcuts: false,
      };
      setMap(new window.google.maps.Map(ref.current, option));
    }
  }, [ref, map, options.center]);

  return (
    <>
      <div ref={ref} style={style} />
      {Children.map(children, (child) => {
        if (isValidElement(child)) {
          return cloneElement(child, { map });
        }
      })}
    </>
  );
};
