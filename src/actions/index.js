import Box from '3box';
import isOutZone from 'utils/isOutZone';

const getThreeBox = async (address) => {
  const profile = await Box.getProfile(address);
  return profile;
};

export const THREE_BOX_CONNECT = 'THREE_BOX_CONNECT';
export const THREE_BOX_NOT_CONNECT = 'THREE_BOX_NOT_CONNECT';
export const WALLET_NOT_FOUND = 'WALLET_NOT_FOUND';
export const ACCOUNT_NOT_FOUND = 'ACCOUNT_NOT_FOUND';
export const getAddressFromMetaMask = () => async (dispatch) => {
  if (typeof window.ethereum === 'undefined') {
    dispatch({
      type: WALLET_NOT_FOUND,
      error: 'Please install metamask'
    });
    return;
  }
  window.ethereum.autoRefreshOnNetworkChange = false;
  const accounts = await window.ethereum.enable();
  if (accounts.length > 0) {
    const account = accounts[0];
    try {
      const threeBoxProfile = await getThreeBox(account);

      const box = await Box.openBox(account, window.ethereum);

      const space = await box.openSpace('stay-home');
      // Sync 3Box
      await box.syncDone;
      dispatch({
        type: THREE_BOX_CONNECT,
        box,
        space,
        account,
        threeBoxProfile
      });

      if (space) {
        dispatch(getPrivateSpace());
        dispatch(getPublicSpace());
      }
      return;
    } catch (e) {
      dispatch({
        type: THREE_BOX_NOT_CONNECT,
        error: 'Can not connect to 3Box'
      });
      return;
    }
  } else {
    dispatch({
      type: ACCOUNT_NOT_FOUND,
      error: 'Can not find your account'
    });
  }
};

export const setPublicSpace = (result) => async (dispatch, getState) => {
  const state = getState();
  const account = state.threebox.account;
  const space = state.threebox.space;

  await space.public.set(account, result).catch((e) => {
    console.log(e);
  });
};

export const setPrivateSpace = (result) => async (dispatch, getState) => {
  const state = getState();
  const account = state.threebox.account;
  const space = state.threebox.space;

  await space.private.set(account, result).catch((e) => {
    console.log(e);
  });
};

export const GET_ALL_PUBLIC_SPACE = 'GET_ALL_PUBLIC_SPACE';
export const getAllPublicSpace = () => async (dispatch, getState) => {
  const state = getState();
  const space = state.threebox.space;
  let leaderboard = await space.public.all().catch((e) => {
    console.log(e);
  });
  dispatch({
    type: GET_ALL_PUBLIC_SPACE,
    leaderboard: leaderboard
  });
};

export const GET_PUBLIC_SPACE = 'GET_PUBLIC_SPACE';
export const getPublicSpace = () => async (dispatch, getState) => {
  const state = getState();
  const account = state.threebox.account;
  const space = state.threebox.space;
  let publicData = await space.public.get(account).catch((e) => {
    console.log(e);
  });

  var startTime, point, lastCheck;
  // If this is your first use
  if (publicData === undefined || !publicData) {
    startTime = new Date();
    var month = startTime.getMonth() + 1;
    var day = startTime.getDate();
    var year = startTime.getFullYear();
    startTime = month + '-' + day + '-' + year;
    lastCheck = startTime;
    point = 0;

    //  save in 3Box
    var data = { point, startTime, lastCheck };
    data = JSON.stringify(data);
    dispatch(setPublicSpace(data));
  } else {
    publicData = JSON.parse(publicData);
    point = publicData.point;
    startTime = publicData.startTime;
    lastCheck = publicData.lastCheck;
  }

  dispatch({
    type: GET_PUBLIC_SPACE,
    startTime,
    point,
    lastCheck
  });
};

export const GET_PRIVATE_SPACE = 'GET_PRIVATE_SPACE';
export const getPrivateSpace = () => async (dispatch, getState) => {
  const state = getState();
  const account = state.threebox.account;
  const space = state.threebox.space;
  let zone = await space.private.get(account).catch((e) => {
    console.log(e);
  });

  if (zone) {
    dispatch({
      type: GET_PRIVATE_SPACE,
      zone: JSON.parse(zone)
    });
  }
};

export const USER_LOCATION = 'USER_LOCATION';
export const setUserLocation = (userLocation) => (dispatch) => {
  dispatch({
    type: USER_LOCATION,
    userLocation
  });
};

export const checkIsOutZone = () => (dispatch, getState) => {
  const state = getState();
  var zone = state.threebox.zone;
  var userLocation = state.threebox.userLocation;
  var point = state.threebox.point;
  var startTime = state.threebox.startTime;
  var lastCheck = state.threebox.lastCheck;

  var date_diff_indays = (date1, date2) => {
    const dt1 = new Date(date1);
    const dt2 = new Date(date2);
    return Math.floor(
      (Date.UTC(dt2.getFullYear(), dt2.getMonth(), dt2.getDate()) -
        Date.UTC(dt1.getFullYear(), dt1.getMonth(), dt1.getDate())) /
        (1000 * 60 * 60 * 24)
    );
  };

  var currentStartTime, data;

  currentStartTime = new Date();
  var month = currentStartTime.getMonth() + 1;
  var day = currentStartTime.getDate();
  var year = currentStartTime.getFullYear();
  currentStartTime = month + '-' + day + '-' + year;

  lastCheck = currentStartTime;

  if (isOutZone(zone, userLocation)) {
    // if go out reset point
    point = 0;
    startTime = currentStartTime;
  } else {
    //if not go out
    if (date_diff_indays(lastCheck, currentStartTime) <= 1) {
      point = date_diff_indays(startTime, currentStartTime);
    } else {
      point = 0;
      startTime = currentStartTime;
    }
  }
  //  save in 3Box
  data = { point, startTime, lastCheck };
  data = JSON.stringify(data);
  dispatch(setPublicSpace(data));

  dispatch({
    type: GET_PUBLIC_SPACE,
    startTime,
    point,
    lastCheck
  });
};
