import React, { useContext } from 'react'
import { ShopContext } from '../context/ShopContext'
import { useParams } from 'react-router-dom';
import BreadCrum from '../components/breadCrums/BreadCrum';
import ProductDisplay from '../components/productDisplay/ProductDisplay';
import DescriptionBox from '../components/descriptionbox/DescriptionBox';
import RelatedProducts from '../components/relatedProducts/RelatedProducts';

const Product = () => {
  const{all_product}= useContext(ShopContext);
  const {productId} = useParams();
  const product = all_product.find((e)=>{
    return e.id===Number(productId);
  })
  return (
    <div>
      <BreadCrum product={product}/>
      <ProductDisplay product={product}/>
      <DescriptionBox/>
      <RelatedProducts/>
    </div>
  )
}

export default Product