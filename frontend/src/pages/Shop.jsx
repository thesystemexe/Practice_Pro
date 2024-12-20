import React from 'react'
import Hero from '../components/Hero/Hero'
import Popular from '../components/popular/Popular';
import Offers from '../components/offers/Offers';
import NewCollections from '../components/newCollection/NewCollections';
import NewsLetter from '../components/newsLetter/NewsLetter';

function Shop() {
  return (
    <div>
        <Hero/>
        <Popular/>
        <Offers/>
        <NewCollections/>
        <NewsLetter/>
    </div>
  )
}

export default Shop