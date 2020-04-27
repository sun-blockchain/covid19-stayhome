import React, { useState, useEffect, useRef, initialState } from 'react';

export default function Map({
  options,
  onMount,
  showMarkers,
  setShowMarkers,
  markerIndex,
  setMarkerIndex,
  markerNumber,
  setMarkerNumber,
  yourLocaltion,
  isShowOnly
}) {
  const ref = useRef();
  const [map, setMap] = useState(initialState);

  useEffect(() => {
    const onLoad = () => {
      setMap(new window.google.maps.Map(ref.current, options));
    };
    if (!window.google) {
      const script = document.createElement(`script`);
      script.src =
        `https://maps.googleapis.com/maps/api/js?key=` + process.env.REACT_APP_GOOGLEMAP_KEY;
      document.head.append(script);
      script.addEventListener(`load`, onLoad);
      return () => script.removeEventListener(`load`, onLoad);
    } else onLoad();
  }, [options]);

  if (map && typeof onMount === `function`)
    onMount(
      map,
      showMarkers,
      setShowMarkers,
      markerIndex,
      setMarkerIndex,
      markerNumber,
      setMarkerNumber,
      yourLocaltion,
      isShowOnly
    );

  return (
    <div
      style={{ minHeight: `60vh`, height: `100%`, margin: `1em 0`, borderRadius: `0.5em` }}
      {...{ ref }}
    />
  );
}
