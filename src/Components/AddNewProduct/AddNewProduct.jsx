import React from 'react'
import "./AddNewProduct.scss"

export default function AddNewProduct() {
    return (
        <div className='add-product'>
            <h2 className='add-product__title'>افزودن محصول جدید</h2>
            <form action="#" className='add-product__form'>
                <div className="add-product__wrapper">
                    <div className="add-product__form-group">
                        <input type="text" placeholder='نام محصول را بنویسید' />
                    </div>
                    <div className="add-product__form-group">
                        <input type="text" placeholder='قیمت محصول را بنویسید' />
                    </div>
                    <div className="add-product__form-group">
                        <input type="text" placeholder='موجودی محصول را بنویسید' />
                    </div>
                    <div className="add-product__form-group">
                        <input type="text" placeholder='آدرس عکس محصول را وارد نمایید' />
                    </div>
                    <div className="add-product__form-group">
                        <input type="text" placeholder='میزان محبوبیت محصول را وارد کنید' />
                    </div>
                    <div className="add-product__form-group">
                        <input type="text" placeholder='میزان فروش محصول را وارد کنید' />
                    </div>
                    <div className="add-product__form-group">
                        <input type="text" placeholder='تعداد رنگ‌بندی محصول را بنویسید' />
                    </div>
                </div>

                <div className='add-product__btn-container'>
                    <button className='add-product__btn'>ثبت محصول</button>
                </div>
            </form>
        </div>
    )
}
