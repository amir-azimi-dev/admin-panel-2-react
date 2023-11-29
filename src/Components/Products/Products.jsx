import React, { useState, useEffect } from 'react'


// components
import AddNewProduct from "../AddNewProduct/AddNewProduct"
import ProductsTable from '../ProductsTable/ProductsTable'
import EmptyContentNotif from "../EmptyContentNotif/EmptyContentNotif"

// toastify
import { ToastContainer, toast } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";


export default function Products() {
  const [allProducts, setAllProducts] = useState([])
  const [stateForReloading, setStateForReloading] = useState(true)

  useEffect(() => {
    fetch("http://localhost:3000/api/products")
      .then(res => res.json())
      .then(products => setAllProducts(products))
  }, [stateForReloading])

  return (
    <div className='products'>
      <AddNewProduct allProducts={allProducts} setStateForReloading={setStateForReloading} toast={toast} />
      {allProducts.length ? <ProductsTable allProducts={allProducts} setStateForReloading={setStateForReloading} toast={toast} /> : <EmptyContentNotif message="هیچ محصولی یافت نشد !!!" />}
      <ToastContainer rtl />
    </div>
  )
}
