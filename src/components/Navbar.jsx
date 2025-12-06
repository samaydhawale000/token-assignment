import React from 'react';
import './component.css';
import Button from '../commonComponents/Button'; 
import walletIcon from '../assets/wallet.svg';
import { ConnectButton } from '@rainbow-me/rainbowkit';
import { useAccount } from 'wagmi'; 


export default function Navbar() {
  const { isConnected, address } = useAccount();

  const formatAddress = (addr) => {
    if (!addr) return '';
    return `${addr.substring(0, 6)}...${addr.substring(addr.length - 4)}`;
  };
  
  return (
    <div className='navbar'>
      <div>
        <img src="/logo.svg" alt="logo" />
        <h3>Token Portfolio</h3>
      </div>
      <ConnectButton.Custom>
        {({
          account,
          chain,
          openAccountModal,
          openChainModal,
          openConnectModal,
          mounted,
        }) => {
          const ready = mounted;
          const connected = ready && account && chain;
        
          if (!connected) {
            return (
              <Button onClick={openConnectModal} type="button">
                <img src={walletIcon} alt="wallet Icon" />
                Connect Wallet
              </Button>
            );
          }

          return (
            <Button onClick={openAccountModal} type="button">
              {formatAddress(account.address)} 
            </Button>
          );
        }}
      </ConnectButton.Custom>
      
    </div>
  );
}