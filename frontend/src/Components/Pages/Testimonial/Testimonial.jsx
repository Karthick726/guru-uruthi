import React from 'react'
import Header from '../../Common/Layout/Header/Header'
import Footer from '../../Common/Layout/Footer/Footer'
import PageTop from '../../Common/PageTop/PageTop'
import TestimonialData from './TestimonialData/TestimonialData'

const Testimonial = () => {
  return (
<section>
    <Header/>
    <PageTop title={"Testimonial"}/>
    <TestimonialData/>
    <Footer/>
</section>
  )
}

export default Testimonial