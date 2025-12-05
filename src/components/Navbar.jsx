import React from 'react'
import './component.css'
import Button from '../commonComponents/Button'
import wallet from '../assets/wallet.svg'


export default function Navbar() {
  return (
    <div className='navbar'>
      <div>
        <img src="/logo.svg" alt="logo" />
        <h3>Token Portfolio</h3>
      </div>
      <Button>
        <img src={wallet} alt=" wallet Icon" />
        Connect Wallet
      </Button>
    </div>
  )
}
