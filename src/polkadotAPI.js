import { web3Enable, web3Accounts, web3FromAddress } from '@polkadot/extension-dapp';

let currentAddress = '';

// Connect to Polkadot Wallet and fetch accounts
export const connectToPolkadotWallet = async (walletType) => {
  await web3Enable('Polkadot Wallet Login App');
  const accounts = await web3Accounts();
  if (accounts.length === 0) {
    throw new Error('No accounts found');
  }

  const filteredAccounts = accounts.filter(account => account.meta.source === walletType);

  return filteredAccounts.map(account => ({
    address: account.address,
    meta: {
      name: account.meta.name || account.address.slice(0, 6),
      source: account.meta.source,
    },
  }));
};

// Sign a message for authentication
export const signMessage = async (address, message) => {
  try {
    const injector = await web3FromAddress(address);
    const signature = await injector.signer.signRaw({
      address,
      data: message,
      type: 'bytes',
    });
    return signature.signature;
  } catch (error) {
    console.error('Error signing message:', error);
    return null;
  }
};

// Set Current Address
export const setCurrentAddress = (address) => { 
  currentAddress = address;
  localStorage.setItem('currentAddress', address);
};

// Get Current Address
export const getConnectedAddress = () => {
  return currentAddress;
};

// Logout Wallet
export const logoutWallet = () => {
  currentAddress = '';
  localStorage.removeItem('currentAddress');
};
