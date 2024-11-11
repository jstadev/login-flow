import React from 'react';

function AccountList({ accounts, onAccountClick }) {
  return (
    <div>
      <h2>Available Accounts</h2>
      <ul>
        {accounts.map((account) => (
          <li key={account.address}>
            <button onClick={() => onAccountClick(account)}>
              {account.meta.name} - {account.address}
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default AccountList;
