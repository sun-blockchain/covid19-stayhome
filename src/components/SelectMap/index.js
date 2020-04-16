import React, { useState, useEffect } from 'react';
import { Modal, Button, Select } from 'antd';
import Map from './Map';
import useGeolocation from 'utils/useGeolocation';

import './SelectMap.css';

function addMarkers(map, showMakers, setShowMakers, makerIndex, setMakerIndex, yorLocation) {
  showMakers.forEach((showMaker, index) => {
    if (showMaker.lat && showMaker.lng) {
      const marker = new window.google.maps.Marker({
        map,
        position: { lat: showMaker.lat, lng: showMaker.lng },
        label: `${index + 1}`
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
    setShowMakers((showMakers) => [
      ...showMakers,
      { lat: mapsMouseEvent.latLng.lat(), lng: mapsMouseEvent.latLng.lng() }
    ]);
    setMakerIndex((makerIndex) => [...makerIndex, showMakers.length + 1]);
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
  const [showMakers, setShowMakers] = useState([]);
  const [makerIndex, setMakerIndex] = useState([]);

  useEffect(() => {
    setYourLocaltion({ lat: geolocation.latitude, lng: geolocation.longitude });
  }, [geolocation]);

  return (
    <div>
      <Button type='primary' onClick={() => setVisible(true)}>
        Note your position
      </Button>
      <Modal
        title='Basic Modal'
        visible={visible}
        onOk={() => setVisible(false)}
        onCancel={() => setVisible(false)}
      >
        {/* if geolocation error by your not allow */}
        {!geolocation.error ? (
          <div>
            <p>Select your area</p>
            <Map
              onMount={addMarkers}
              options={{
                center: { lat: geolocation.latitude, lng: geolocation.longitude },
                zoom: 19
              }}
              showMakers={showMakers}
              setShowMakers={setShowMakers}
              setMakerIndex={setMakerIndex}
              makerIndex={makerIndex}
              yourLocaltion={yourLocaltion}
            />
            <p>Your selection</p>
            <Select
              mode='multiple'
              style={{ width: '100%' }}
              placeholder='Please select'
              value={makerIndex}
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
