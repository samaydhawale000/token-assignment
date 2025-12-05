import React from 'react'
import './globalPage.css'
import TotalPortfolio from '../components/home-components/TotalPortfolio'
import Wishlist from '../components/home-components/Wishlist'

export default function Home() {
  return (
    <div className='homePage' >
      <TotalPortfolio/>
      <Wishlist/>
    </div>
  )
}
