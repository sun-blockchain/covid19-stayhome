import Box from '3box';

const getThreeBox = async (address) => {
  const profile = await Box.getProfile(address);
  return profile;
};

export const THREE_BOX_CONNECT = 'THREE_BOX_CONNECT';

export const getAddressFromMetaMask = () => async (dispatch) => {
  if (typeof window.ethereum == 'undefined') {
    alert('Please install metamask');
    return;
  }
  window.ethereum.autoRefreshOnNetworkChange = false;
  const accounts = await window.ethereum.enable();
  if (accounts.length > 0) {
    const account = accounts[0];
    const threeBoxProfile = await getThreeBox(account);

    const box = await Box.openBox(account, window.ethereum);

    const space = await box.openSpace('stay-home');
    console.log(box);

    // Sync 3Box
    await box.syncDone;
    dispatch({
      type: THREE_BOX_CONNECT,
      box,
      space,
      account,
      threeBoxProfile
    });
  } else {
    alert('Account not found');
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
  let myResult = await space.public.get(account).catch((e) => {
    console.log(e);
  });
  dispatch({
    type: GET_PUBLIC_SPACE,
    myResult: myResult
  });
};

export const GET_PRIVATE_SPACE = 'GET_PRIVATE_SPACE';
export const getPrivateSpace = () => async (dispatch, getState) => {
  const state = getState();
  const account = state.threebox.account;
  const space = state.threebox.space;
  let location = await space.private.get(account).catch((e) => {
    console.log(e);
  });
  console.log(JSON.parse(location));

  dispatch({
    type: GET_PRIVATE_SPACE,
    location: JSON.parse(location)
  });
};
