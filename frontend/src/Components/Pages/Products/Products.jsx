import React from 'react'
import Header from '../../Common/Layout/Header/Header'
import Footer from '../../Common/Layout/Footer/Footer'
import PageTop from '../../Common/PageTop/PageTop'
import ProductsData from './ProductsData/ProductsData'

const Products = () => {
  return (
 <section>
    <Header/>
    <PageTop title={"Products"}/>
    <ProductsData/>
    <Footer/>
 </section>
  )
}

export default Products