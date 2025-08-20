import React from 'react'
import Header from '../../Common/Layout/Header/Header'
import Footer from '../../Common/Layout/Footer/Footer'
import PageTop from '../../Common/PageTop/PageTop'
import ProcessSteps from './ProcessStep/ProcessSteps'
import AboutUs from './AboutUs/AboutUs'
import WhyChooseUs from './WhyChooseUs/WhyChooseUs'

const About = () => {
  return (
<section>
  <Header/>
  <PageTop title={"About"}/>
<WhyChooseUs/>
  <AboutUs/>
  <ProcessSteps/>
  <Footer/>
</section>
  )
}

export default About