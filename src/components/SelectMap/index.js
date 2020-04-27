import React, { useState } from 'react';
import { Modal, Button, Select } from 'antd';
import Map from 'components/Map';
import { useDispatch, useSelector } from 'react-redux';
import * as actions from 'actions/index';
import addMarkers from 'utils/addMarkers';

import './SelectMap.css';

function SelectMap({
  yourLocaltion,
  showMarkers,
  setShowMarkers,
  markerIndex,
  setMarkerIndex,
  geolocation,
  setLoad
}) {
  const threebox = useSelector((state) => state.threebox);
  const dispatch = useDispatch();

  const [visible, setVisible] = useState(false);
  const [markerNumber, setMarkerNumber] = useState(1);

  const removeMarker = (value) => {
    // remove in selector
    let filteredItems = markerIndex.filter((item) => item !== value);
    setMarkerIndex(filteredItems);

    // remove point in map
    filteredItems = showMarkers.filter((item) => item.index !== value);
    setShowMarkers(filteredItems);
  };
  const submitZone = () => {
    if (threebox.space) dispatch(actions.setPrivateSpace(JSON.stringify(showMarkers)));
    setVisible(false);
  };

  const onReset = () => {
    // reset zone if user not save
    setLoad(true);

    setVisible(false);
  };

  return (
    <div>
      <Button type='primary' onClick={() => setVisible(true)}>
        Note your position
      </Button>
      <Modal title='Zone' visible={visible} onOk={() => submitZone()} onCancel={() => onReset()}>
        {/* if geolocation error by your not allow */}
        {!geolocation.error && typeof geolocation.latitude === 'number' ? (
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
