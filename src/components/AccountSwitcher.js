import React from 'react';

function AccountSwitcher({ accounts, connectedAccount, onSwitch }) {
  return (
    <div>
      <h3>Switch Account</h3>
      <ul>
        {accounts
          .filter((account) => account.address !== connectedAccount.address)
          .map((account) => (
            <li key={account.address}>
              <button onClick={() => onSwitch(account)}>
                Switch to {account.meta.name} - {account.address}
              </button>
            </li>
          ))}
      </ul>
    </div>
  );
}

export default AccountSwitcher;
