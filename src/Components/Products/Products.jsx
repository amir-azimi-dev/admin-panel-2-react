import React from 'react'


// components
import EmptyContentNotif from "../EmptyContentNotif/EmptyContentNotif"
import AddNewProduct from "../AddNewProduct/AddNewProduct"
import ProductsTable from '../ProductsTable/ProductsTable'


export default function Products() {
  return (
    <div className='products'>
      <AddNewProduct />
      {/* <EmptyContentNotif message="هیچ محصولی یافت نشد !!!" /> */}
      <ProductsTable />
    </div>
  )
}
