// app/components/Connect.tsx

import React from 'react';

export function Connect() {
  return (
    <div>
      <w3m-button
        label="Connect Wallet"
        balance="show"
        size="sm"
        loadingLabel="Connecting"
      />
    </div>
  );
}
