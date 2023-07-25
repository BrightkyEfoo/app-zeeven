import React, { useContext } from 'react'
import Footer from '../components/Footer';
import Header from './components/Header';
import Stocks from './components/Stocks';

function ProtectedLayout({children}: {children: any}) {

  return (
    <section className={`bg-gradient-to-b from-blue-100 to-pink-50 min-h-screen font-light h-min-screen flex flex-col justify-between`}>
      <Header />
      <div className="container mx-auto">
        <Stocks />
        <main className='lg:grid lg:grid-cols-12 lg:gap-x-5 mt-2 mb-10'>
          <section className='space-y-2 sm:px-2 lg:px-0 lg:col-span-12'>
            {children}
          </section>
        </main>
      </div>
      <Footer />
    </section>
  )
}

export default ProtectedLayout