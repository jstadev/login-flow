import React, { useState } from 'react';
import AccountList from './components/AccountList';
import AccountSwitcher from './components/AccountSwitcher';
import { connectToPolkadotWallet, signMessage, setCurrentAddress, getConnectedAddress, logoutWallet } from './polkadotAPI';

function App() {
  const [walletType, setWalletType] = useState(null);
  const [accounts, setAccounts] = useState([]);
  const [connectedAccount, setConnectedAccount] = useState(getConnectedAddress());

  const handleWalletConnect = async () => {
    if (!walletType) {
      alert("Please select a wallet type.");
      return;
    }
    try {
      const availableAccounts = await connectToPolkadotWallet(walletType);
      setAccounts(availableAccounts);
    } catch (error) {
      console.error("Error connecting to wallet:", error);
      alert("No accounts found or wallet not installed.");
    }
  };

  const handleAccountSelection = async (account) => {
    const message = 'Connect to Polkadot App';
    const signature = await signMessage(account.address, message);
    if (signature) {
      setCurrentAddress(account.address);
      setConnectedAccount(account);
      alert(`Signed in with account: ${account.meta.name}`);
    } else {
      console.error("Failed to sign the message.");
    }
  };

  const handleWalletLogout = () => {
    logoutWallet();
    setAccounts([]);
    setConnectedAccount(null);
  };

  return (
    <div>
      <h1>Polkadot Wallet Login</h1>

      {/* Wallet Type Selection */}
      <div>
        <label>Select Wallet Type: </label>
        <select onChange={(e) => setWalletType(e.target.value)} defaultValue="">
          <option value="" disabled>Select a wallet</option>
          <option value="polkadot-js">Polkadot.js</option>
          <option value="talisman">Talisman</option>
          <option value="subwallet-js">SubWallet</option>
          <option value="nova">Nova Wallet</option>
        </select>
      </div>

      {/* Connect Button */}
      {!connectedAccount ? (
        <button onClick={handleWalletConnect}>Connect with Selected Wallet</button>
      ) : (
        <button onClick={handleWalletLogout}>Logout</button>
      )}

      {/* Display Available Accounts */}
      {accounts.length > 0 && (
        <AccountList accounts={accounts} onAccountClick={handleAccountSelection} />
      )}

      {/* Display Connected Account */}
      {connectedAccount && (
        <div>
          <h2>Connected Account</h2>
          <p>{connectedAccount.meta.name} - {connectedAccount.address}</p>
          <AccountSwitcher
            accounts={accounts}
            connectedAccount={connectedAccount}
            onSwitch={handleAccountSelection}
          />
        </div>
      )}
    </div>
  );
}

export default App;
