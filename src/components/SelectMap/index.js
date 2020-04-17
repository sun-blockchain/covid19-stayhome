import React, { useState, useEffect } from 'react';
import { Modal, Button, Select } from 'antd';
import Map from './Map';
import useGeolocation from 'utils/useGeolocation';

import './SelectMap.css';

function addMarkers(
  map,
  showMarkers,
  setShowMarkers,
  markerIndex,
  setMarkerIndex,
  markerNumber,
  setMarkerNumber,
  yorLocation
) {
  showMarkers.forEach((showMarker) => {
    if (showMarker.lat && showMarker.lng) {
      const marker = new window.google.maps.Marker({
        map,
        position: { lat: showMarker.lat, lng: showMarker.lng },
        label: `${showMarker.index}`
      });

      // if wanna click in maker
      marker.addListener(`click`, () => {
        console.log(marker.getPosition().lat(), marker.getPosition().lng());
      });
    }
  });

  new window.google.maps.Marker({
    map,
    position: { lat: yorLocation.lat, lng: yorLocation.lng },
    label: `You`
  });

  map.addListener(`click`, (mapsMouseEvent) => {
    if (showMarkers.length < 4) {
      setShowMarkers((showMarkers) => [
        ...showMarkers,
        { lat: mapsMouseEvent.latLng.lat(), lng: mapsMouseEvent.latLng.lng(), index: markerNumber }
      ]);
      setMarkerIndex((markerIndex) => [...markerIndex, markerNumber]);
      setMarkerNumber(markerNumber + 1);
    }
  });
}

function SelectMap() {
  // get your Geolocation
  const geolocation = useGeolocation({
    enableHighAccuracy: true,
    maximumAge: 15000,
    timeout: 12000
  });

  const [visible, setVisible] = useState(false);
  const [yourLocaltion, setYourLocaltion] = useState(null);
  const [showMarkers, setShowMarkers] = useState([]);
  const [markerIndex, setMarkerIndex] = useState([]);
  const [markerNumber, setMarkerNumber] = useState(1);

  useEffect(() => {
    setYourLocaltion({ lat: geolocation.latitude, lng: geolocation.longitude });
  }, [geolocation]);

  const removeMarker = (value) => {
    // remove in selector
    let filteredItems = markerIndex.filter((item) => item !== value);
    setMarkerIndex(filteredItems);

    // remove point in map
    filteredItems = showMarkers.filter((item) => item.index !== value);
    setShowMarkers(filteredItems);
  };
  const submitZone = () => {
    setVisible(false);
  };

  return (
    <div>
      <Button type='primary' onClick={() => setVisible(true)}>
        Note your position
      </Button>
      <Modal
        title='Basic Modal'
        visible={visible}
        onOk={() => submitZone()}
        onCancel={() => setVisible(false)}
      >
        {/* if geolocation error by your not allow */}
        {!geolocation.error ? (
          <div>
            <p>You must select 4 point around you</p>
            <Map
              onMount={addMarkers}
              options={{
                center: { lat: geolocation.latitude, lng: geolocation.longitude },
                zoom: 19
              }}
              showMarkers={showMarkers}
              setShowMarkers={setShowMarkers}
              markerIndex={markerIndex}
              setMarkerIndex={setMarkerIndex}
              markerNumber={markerNumber}
              setMarkerNumber={setMarkerNumber}
              yourLocaltion={yourLocaltion}
            />
            <p>Your selection</p>
            <Select
              mode='multiple'
              style={{ width: '100%' }}
              placeholder='Your point'
              open={false}
              value={markerIndex}
              onDeselect={removeMarker}
            />
          </div>
        ) : (
          <p>No geolocation, sorry.</p>
        )}
      </Modal>
    </div>
  );
}

export default SelectMap;
