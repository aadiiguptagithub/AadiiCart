import React, { useContext, useEffect, useState } from 'react'
import Hero from '../component/Hero.jsx'
import LatestCollection from '../component/LatestCollection.jsx'
import OurPolicy from '../component/OurPolicy.jsx'
import BestSeller from '../component/BestSeller.jsx'
import NewLetterBox from '../component/NewLetterBox.jsx'
import { ShopContext } from '../contex/ShopContext.jsx'
import { authDataContext } from '../contex/AuthContex.jsx'
import { speakWelcome, getWelcomeMessage } from '../utils/aiWelcome.js'

function Home() {
  const { loading } = useContext(ShopContext)
  const { userData, loading: authLoading } = useContext(authDataContext)
  const [hasWelcomed, setHasWelcomed] = useState(false)

  useEffect(() => {
    if (!loading && !authLoading && !hasWelcomed) {
      const timer = setTimeout(() => {
        const message = getWelcomeMessage(userData)
        speakWelcome(message)
        setHasWelcomed(true)
      }, 2000)
      
      return () => clearTimeout(timer)
    }
  }, [userData, loading, authLoading, hasWelcomed])

  if (loading || authLoading) {
    return (
      <div className="min-h-screen bg-slate-900 flex items-center justify-center">
        <div className="text-slate-100 text-lg">Loading...</div>
      </div>
    )
  }

  return (
    <div className="min-h-screen">
      <Hero />
      <LatestCollection />
      <BestSeller />
      <OurPolicy />
      <NewLetterBox />
    </div>
  )
}

export default Home
