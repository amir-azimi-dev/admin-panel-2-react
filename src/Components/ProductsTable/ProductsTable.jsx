import React, { useState } from 'react'
import "./ProductsTable.scss"

// components
import DeleteModal from '../DeleteModal/DeleteModal'
import DetailsModal from '../DetailsModal/DetailsModal'
import EditModal from '../EditModal/EditModal'

// services
import prettifyNumber from '../../../Services/Services'

// icons
import { AiOutlineDollarCircle } from "react-icons/ai"

export default function ProductsTable({ allProducts, setStateForReloading, toast }) {
    const [isShowDeleteModal, setIsShowDeleteModal] = useState(false)
    const [isShowDetailsModal, setIsShowDetailsModal] = useState(false)
    const [isShowEditModal, setIsShowEditModal] = useState(false)
    const [activeProduct, setActiveProduct] = useState(null)

    // edit modal states
    const [productTitle, setProductTitle] = useState("title")
    const [productPrice, setProductPrice] = useState(0)
    const [productCount, setProductCount] = useState(0)
    const [productImgAddress, setProductImgAddress] = useState("address")
    const [productPopularity, setProductPopularity] = useState(0)
    const [productSales, setProductSales] = useState(0)
    const [productColors, setProductColors] = useState(1)


    // details modal
    const onShowDetailsModal = product => {
        setActiveProduct(product)
        setIsShowDetailsModal(true)
    }
    const onCloseDetailsModal = () => setIsShowDetailsModal(false)



    // delete modal
    const onShowDeleteModal = product => {
        setActiveProduct(product)
        setIsShowDeleteModal(true)
    }
    const onConfirmModalDeletion = id => {
        fetch(`http://localhost:3000/api/products/${id}`, {
            method: "DELETE"
        }).then(() => {
            setStateForReloading(prev => !prev)
            setIsShowDeleteModal(false)
            toast.success("محصول با موقیت حذف شد.", {
                position: toast.POSITION.BOTTOM_RIGHT,
                autoClose: 3000,
            });
        })
    }
    const onCancelModalDeletion = () => {
        setIsShowDeleteModal(false)
    }


    // edit modal
    const onShowEditModal = product => {
        setActiveProduct(product)
        setProductTitle(product.title)
        setProductPrice(product.price)
        setProductCount(product.count)
        setProductImgAddress(product.img)
        setProductPopularity(product.popularity)
        setProductSales(product.sale)
        setProductColors(product.colors)
        setIsShowEditModal(true)
    }
    const onCloseEditModal = () => setIsShowEditModal(false)
    const onSubmitEditModal = event => {
        event.preventDefault()

        if (!productTitle || !String(productPrice) || !String(productCount) || !productImgAddress || !String(productPopularity) || !String(productSales) || !String(productColors)) {
            alert("لطفا همه فیلد هارا پر کنید.")
            return
        }

        const editedProductDetails = {
            title: productTitle,
            price: productPrice,
            count: productCount,
            img: productImgAddress,
            popularity: productPopularity,
            sale: productSales,
            colors: productColors,
        }

        fetch(`http://localhost:3000/api/products/${activeProduct.id}`, {
            method: 'PUT',
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(editedProductDetails)
        })
            .then(res => res.json())
            .then(() => {
                toast.success("محصول با موفقیت ویرایش گردید.", {
                    position: toast.POSITION.BOTTOM_RIGHT,
                    autoClose: 3000,
                })
                onCloseEditModal()
                setStateForReloading(prev => !prev)
            })
            .catch(() => toast.error("خطا در ثبت تغییرات"), {
                position: toast.POSITION.BOTTOM_RIGHT,
                autoClose: 3000,
            })
    }

    return (
        <>
            <h1 className='cms-title'>لیست محصولات</h1>
            <div className="cms-table__container">
                <table className='products-table cms-table'>
                    <thead>
                        <tr>
                            <th>عکس محصول</th>
                            <th>نام محصول</th>
                            <th>قیمت</th>
                            <th>موجودی</th>
                            <th>عملیات</th>
                        </tr>
                    </thead>

                    <tbody>
                        {allProducts.map(product => (
                            <tr key={product.id}>
                                <td>
                                    <img className='products-table__img' src={product.img} alt={`تصویر ${product.title}`} />
                                </td>
                                <td>{product.title}</td>
                                <td>{prettifyNumber(product.price)}</td>
                                <td>{prettifyNumber(product.count)}</td>
                                <td>
                                    <button className="cms-table__btn" onClick={() => onShowDetailsModal(product)}>جزئیات</button>
                                    <button className="cms-table__btn" onClick={() => onShowDeleteModal(product)}>حذف</button>
                                    <button className="cms-table__btn" onClick={() => onShowEditModal(product)}>ویرایش</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            {isShowDetailsModal && <DetailsModal hideModal={onCloseDetailsModal}>
                <table className='cms-table'>
                    <thead>
                        <tr>
                            <th>نام</th>
                            <th>قیمت</th>
                            <th>تعداد</th>
                            <th>محبوبیت</th>
                            <th>فروش</th>
                            <th>تعداد رنگ</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>{activeProduct.title}</td>
                            <td>{prettifyNumber(activeProduct.price)}</td>
                            <td>{prettifyNumber(activeProduct.count)}</td>
                            <td>{activeProduct.popularity}</td>
                            <td>{prettifyNumber(activeProduct.sale)}</td>
                            <td>{activeProduct.colors}</td>
                        </tr>
                    </tbody>
                </table>
            </DetailsModal>}
            {isShowDeleteModal && <DeleteModal title="آیا از حذف مطمئن هستید؟" confirmAction={onConfirmModalDeletion} cancelAction={onCancelModalDeletion} activeItem={activeProduct} />}
            {isShowEditModal && <EditModal hideModal={onCloseEditModal} submitChanges={onSubmitEditModal}>
                <div className="edit-product">
                    <div className="edit-product__form-group">
                        <AiOutlineDollarCircle />
                        <input type="text" placeholder='عنوان جدید را وارد کنید' className='edit-product__input' value={productTitle} onChange={e => setProductTitle(e.target.value)} />
                    </div>

                    <div className="edit-product__form-group">
                        <AiOutlineDollarCircle />
                        <input type="number" placeholder='مبلغ جدید را وارد کنید' className='edit-product__input' value={productPrice} onChange={e => setProductPrice(e.target.value)} />
                    </div>

                    <div className="edit-product__form-group">
                        <AiOutlineDollarCircle />
                        <input type="number" placeholder='موجودی جدید را وارد کنید' className='edit-product__input' value={productCount} onChange={e => setProductCount(e.target.value)} />
                    </div>

                    <div className="edit-product__form-group">
                        <AiOutlineDollarCircle />
                        <input type="text" placeholder='آدرس کاور جدید را وارد کنید' className='edit-product__input' value={productImgAddress} onChange={e => setProductImgAddress(e.target.value)} />
                    </div>

                    <div className="edit-product__form-group">
                        <AiOutlineDollarCircle />
                        <input type="number" placeholder='میزان محبوبیت جدید را وارد کنید' className='edit-product__input' value={productPopularity} onChange={e => setProductPopularity(e.target.value)} />
                    </div>

                    <div className="edit-product__form-group">
                        <AiOutlineDollarCircle />
                        <input type="number" placeholder='میزان فروش جدید را وارد کنید' className='edit-product__input' value={productSales} onChange={e => setProductSales(e.target.value)} />
                    </div>

                    <div className="edit-product__form-group">
                        <AiOutlineDollarCircle />
                        <input type="number" placeholder='میزان رنگ‌بندی جدید را وارد کنید' className='edit-product__input' value={productColors} onChange={e => setProductColors(e.target.value)} />
                    </div>
                </div>
            </EditModal>}
        </>
    )
}
