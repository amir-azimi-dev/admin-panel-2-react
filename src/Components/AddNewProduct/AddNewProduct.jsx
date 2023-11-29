import React, { useRef, useState } from 'react'
import "./AddNewProduct.scss"


export default function AddNewProduct({ setStateForReloading, toast }) {
    const [productName, setProductName] = useState("")
    const [productPrice, setProductPrice] = useState("")
    const [productCount, setProductCount] = useState("")
    const [productImgAddress, setProductImgAddress] = useState("")
    const [productPopularity, setProductPopularity] = useState("")
    const [productSales, setProductSales] = useState("")
    const [productColors, setProductColors] = useState("")

    const emptyInputs = () => {
        setProductName("")
        setProductPrice("")
        setProductCount("")
        setProductImgAddress("")
        setProductPopularity("")
        setProductSales("")
        setProductColors("")
    }

    const onProductFormSubmit = event => {
        event.preventDefault()
        if (!productName || !String(productPrice) || !String(productCount) || !productImgAddress || !String(productPopularity) || !String(productSales) || !String(productColors)) {
            alert("لطفا همه فیلد هارا پر کنید.")
            return
        }

        const body = {
            title: productName,
            price: productPrice,
            count: productCount,
            img: productImgAddress,
            popularity: productPopularity,
            sale: productSales,
            colors: productColors,
        }

        fetch("http://localhost:3000/api/products/", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(body)
        }).then(() => {
            setStateForReloading(prev => !prev)

            emptyInputs()

            toast.success("محصول با موقیت اضافه شد.", {
                position: toast.POSITION.BOTTOM_RIGHT,
                autoClose: 3000,
            });
        })
    }

    return (
        <div className='add-product'>
            <h2 className='add-product__title'>افزودن محصول جدید</h2>
            <form action="" className='add-product__form' onSubmit={onProductFormSubmit}>
                <div className="add-product__wrapper">
                    <div className="add-product__form-group">
                        <input name='title' type="text" placeholder='نام محصول را بنویسید' value={productName} onChange={e => setProductName(e.target.value)} />
                    </div>
                    <div className="add-product__form-group">
                        <input name='price' type="number" placeholder='قیمت محصول را بنویسید' value={productPrice} onChange={e => setProductPrice(e.target.value)} />
                    </div>
                    <div className="add-product__form-group">
                        <input name='count' type="number" placeholder='موجودی محصول را بنویسید' value={productCount} onChange={e => setProductCount(e.target.value)} />
                    </div>
                    <div className="add-product__form-group">
                        <input name='img' type="text" placeholder='آدرس عکس محصول را وارد نمایید' value={productImgAddress} onChange={e => setProductImgAddress(e.target.value)} />
                    </div>
                    <div className="add-product__form-group">
                        <input name='popularity' type="number" placeholder='میزان محبوبیت محصول را وارد کنید' value={productPopularity} onChange={e => setProductPopularity(e.target.value)} />
                    </div>
                    <div className="add-product__form-group">
                        <input name='sale' type="number" placeholder='میزان فروش محصول را وارد کنید' value={productSales} onChange={e => setProductSales(e.target.value)} />
                    </div>
                    <div className="add-product__form-group">
                        <input name='colors' type="number" placeholder='تعداد رنگ‌بندی محصول را بنویسید' value={productColors} onChange={e => setProductColors(e.target.value)} />
                    </div>
                </div>

                <div className='add-product__btn-container'>
                    <button className='add-product__btn'>ثبت محصول</button>
                </div>
            </form>
        </div>
    )
}
