import Footer from '@/components/user/Footer'
import Header from '@/components/user/Header'
import ProfileNavbar from '@/components/user/ProfileNavbar'
import React from 'react'
import { Outlet } from 'react-router-dom'

const MainLayout = () => {
  return (
    <div>
          <Header />
          <div className="h-screen w-full">
            <ProfileNavbar />
            <Outlet />
          </div>
          <Footer />
        </div>
  )
}

export default React.memo(MainLayout)
