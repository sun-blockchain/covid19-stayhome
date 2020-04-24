import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import * as UI from 'actions/UI';
import SelectMap from 'components/SelectMap';
import useGeolocation from 'utils/useGeolocation';
import * as actions from 'actions/index';
import Map from 'components/Map';
import addMarkers from 'utils/addMarkers';

import './home.css';
import { Button, Row, Col } from 'antd';
import ErrorAlert from 'components/Alert/errorAlert';

function Home() {
  const threebox = useSelector((state) => state.threebox);
  const dispatch = useDispatch();
  const [yourLocaltion, setYourLocaltion] = useState(null);
  const [showMarkers, setShowMarkers] = useState([]);
  const [markerIndex, setMarkerIndex] = useState([]);
  const [load, setLoad] = useState(true);

  // get your Geolocation
  const geolocation = useGeolocation({
    enableHighAccuracy: true,
    maximumAge: 15000,
    timeout: 12000
  });

  let text = `I haved stayed home at ${threebox.point} days
${process.env.REACT_APP_HOME_URL}
#StayHome`;

  text = encodeURIComponent(text);

  useEffect(() => {
    dispatch(UI.updateMenuKey(1));
  }, [dispatch]);

  useEffect(() => {
    if (geolocation.latitude && geolocation.longitude) {
      setYourLocaltion({ lat: geolocation.latitude, lng: geolocation.longitude });
      dispatch(actions.setUserLocation({ lat: geolocation.latitude, lng: geolocation.longitude }));
    }
  }, [geolocation, dispatch]);

  useEffect(() => {
    if (threebox.zone) {
      if (load) {
        setShowMarkers(threebox.zone);
        setMarkerIndex([]);
        threebox.zone.forEach((element) => {
          setMarkerIndex((markerIndex) => [...markerIndex, element.index]);
        });
        setLoad(false);
      }
    }
  }, [threebox.zone, load]);

  if (threebox.error) {
    return (
      <div>
        <ErrorAlert msg={threebox.error} />
        <div style={{ textAlign: 'center' }}>
          <Button type='primary' onClick={() => window.location.reload()}>
            Reload
          </Button>
        </div>
      </div>
    );
  }
  return (
    <Row style={{ height: '75vh' }}>
      <Col span={16}>
        {!geolocation.error ? (
          <Map
            onMount={addMarkers}
            options={{
              center: { lat: geolocation.latitude, lng: geolocation.longitude },
              zoom: 19
            }}
            showMarkers={showMarkers}
            setShowMarkers={setShowMarkers}
            yourLocaltion={yourLocaltion}
            isShowOnly={true}
          />
        ) : (
          <p>No geolocation, sorry.</p>
        )}
      </Col>
      <Col span={8}>
        <div className='site-layout-title'>
          You have stayed home for {threebox.point} days
          <div className='tweet'>
            <a
              className='twitter-share-button'
              href={`https://twitter.com/intent/tweet?text=${text}`}
              target='_blank'
              rel='noopener noreferrer'
            >
              <img src='https://i.imgur.com/IDBc8HC.png' alt='tweet' />
            </a>
          </div>
          <SelectMap
            yourLocaltion={yourLocaltion}
            showMarkers={showMarkers}
            setShowMarkers={setShowMarkers}
            geolocation={geolocation}
            markerIndex={markerIndex}
            setMarkerIndex={setMarkerIndex}
            setLoad={setLoad}
          />
          <p>Start time : {threebox.startTime}</p>
          <p>Last check : {threebox.lastCheck}</p>
        </div>
      </Col>
    </Row>
  );
}

export default Home;
