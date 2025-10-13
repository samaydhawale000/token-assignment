import React from 'react'
import './globalPage.css'
import pageNotFound from '../assets/pageNotFound.png'

export default function PageNotFound() {
  return (
    <div className='pageNotFound' >
     <img src={pageNotFound} alt="pageNotFound" />
    </div>
  )
}
