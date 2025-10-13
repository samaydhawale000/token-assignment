import React from 'react'
import './globalPage.css'
import HomeBanner from '../components/home/HomeBanner'
import CardWrapper from '../components/home/CardWrapper'

export default function Home() {
  return (
    <div >
      <HomeBanner/>
      <CardWrapper/>
    </div>
  )
}
