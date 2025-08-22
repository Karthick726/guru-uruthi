import React from 'react'
import Header from '../../Common/Layout/Header/Header'
import Footer from '../../Common/Layout/Footer/Footer'
import PageTop from '../../Common/PageTop/PageTop'
import HealthBenefitsData from './HealthBenefitsData/HealthBenefitsData'

const HealthBenefits = () => {
  return (
  <section>
    <Header/>
    <PageTop title={"Health Benefits"}/>
    <HealthBenefitsData/>
    <Footer/>
  </section>
  )
}

export default HealthBenefits