import React from 'react'
import { useEffect } from 'react'
import axios from 'axios'
import { BrowserRouter, Routes, Route } from 'react-router-dom'

import PageNavBar from './common/PageNavBar.js'
import Home from './components/Home.js'
import BookShow from './components/BookShow.js'
import Register from './components/auth/Register.js'
import Login from './components/auth/Login.js'
import WishList from './components/Wishlist.js'
import Account from './components/Account.js'
import NotFound from './common/NotFound.js'
import Reviews from './components/Reviews.js'
import Profile from './components/Profile.js'
import Footer from './components/Footer.js'

// import SubNav from './common/SubNavBar.js'
import SearchResult from './components/SearchResults.js'




const App = () => {


  return (
    <BrowserRouter>
      <PageNavBar />
      
      {/* <SubNavBar /> */}

      <Routes>
        <Route path="/books" element={<Home />} />
        <Route path="/books/:id" element={<BookShow />} />
       
        <Route path="/" element={<Home />} />
        <Route path="/books/search/:term" element={<SearchResult />} />
        <Route path="/register" element={<Register />} />
        <Route path="/account/reviews" element={<Reviews />} />
        <Route path="/account/profile" element={<Profile />} />
         
         
       
        <Route path="/login" element={<Login />} />     
        <Route path="/account" element={<Account />} />
        <Route path="/account/wishlist" element={<WishList />} />
        <Route path="*" element={<NotFound />} /> 

      </Routes>
      <Footer />
    </BrowserRouter>
  )
}

export default App
