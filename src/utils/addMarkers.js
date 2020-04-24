const addMarkers = (
  map,
  showMarkers,
  setShowMarkers,
  markerIndex,
  setMarkerIndex,
  markerNumber,
  setMarkerNumber,
  yourLocation,
  isShowOnly
) => {
  showMarkers.forEach((showMarker) => {
    if (showMarker.lat && showMarker.lng) {
      const marker = new window.google.maps.Marker({
        map,
        position: { lat: showMarker.lat, lng: showMarker.lng },
        label: `${showMarker.index}`
      });

      if (!isShowOnly)
        // if wanna click in maker
        marker.addListener(`click`, () => {
          console.log(marker.getPosition().lat(), marker.getPosition().lng());
        });
    }
  });

  if (yourLocation) {
    new window.google.maps.Marker({
      map,
      position: { lat: yourLocation.lat, lng: yourLocation.lng },
      label: `You`
    });
  }

  if (!isShowOnly)
    map.addListener(`click`, (mapsMouseEvent) => {
      if (showMarkers.length < 4) {
        setShowMarkers((showMarkers) => [
          ...showMarkers,
          {
            lat: mapsMouseEvent.latLng.lat(),
            lng: mapsMouseEvent.latLng.lng(),
            index: markerNumber
          }
        ]);
        setMarkerIndex((markerIndex) => [...markerIndex, markerNumber]);
        setMarkerNumber(markerNumber + 1);
      }
    });
};

export default addMarkers;
