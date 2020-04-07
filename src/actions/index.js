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
