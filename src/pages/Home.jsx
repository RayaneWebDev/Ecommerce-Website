import React from 'react'
import CategoryList from '../components/CategoryList'
import BannerProduct from '../components/BannerProduct'
import HorizontalCardProduct from '../components/HorizontalCardProduct'
import VerticalCardProduct from '../components/VerticalCardProduct'

const Home = () => {
  return (
    <div>
      <CategoryList/>
      <BannerProduct/>
      <HorizontalCardProduct category={"airpodes"} heading={"Top's Airpods"}/>
      <HorizontalCardProduct category={"earphones"} heading={"Popular's Eearphones"}/>


      <VerticalCardProduct category={"mobiles"} heading={"Mobiles"}/>
      <VerticalCardProduct category={"Mouse"} heading={"Mouses"}/>
      <VerticalCardProduct category={"televisions"} heading={"TV"}/>
      <VerticalCardProduct category={"camera"} heading={"Camera & Photography"}/>
      <VerticalCardProduct category={"earphones"} heading={"Wired Earphones"}/>
      <VerticalCardProduct category={"refrigerator"} heading={"Refrigerator"}/>
      <VerticalCardProduct category={"trimmers"} heading={"Trimmers"}/>





      

    </div>
    
  )
}

export default Home