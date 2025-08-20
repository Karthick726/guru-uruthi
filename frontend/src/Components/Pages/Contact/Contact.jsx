import React from 'react'
import Header from '../../Common/Layout/Header/Header'
import Footer from '../../Common/Layout/Footer/Footer'
import PageTop from '../../Common/PageTop/PageTop'
import ContactRef from './ContactRef/ContactRef'
import ContactMap from './ContactMap/ContactMap'

const Contact = () => {
  return (
<section>
    <Header/>
    <PageTop title={"Contact Us"}/>
    <ContactRef/>
    <ContactMap/>
    <Footer/>
</section>
  )
}

export default Contact