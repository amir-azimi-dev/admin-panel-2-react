import React, { useState } from 'react'
import "./ProductsTable.scss"

// components
import DeleteModal from '../DeleteModal/DeleteModal'
import DetailsModal from '../DetailsModal/DetailsModal'
import EditModal from '../EditModal/EditModal'


export default function ProductsTable() {
    const [isShowDeleteModal, setIsShowDeleteModal] = useState(false)
    const [isShowDetailsModal, setIsShowDetailsModal] = useState(false)
    const [isShowEditModal, setIsShowEditModal] = useState(false)

    const onConfirmModalDeletion = () => {
        setIsShowDeleteModal(false)
    }

    const onCancelModalDeletion = () => {
        setIsShowDeleteModal(false)
    }


    const onCloseDetailsModal = () => setIsShowDetailsModal(false)


    const onCloseEditModal = () => setIsShowEditModal(false)
    const onSubmitEditModal = event => {
        event.preventDefault()
    }

    
    return (
        <>
        <div className="product-table__container">
            <table className='products-table'>
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
                    <tr>
                        <td>
                            <img className='products-table__img' src="/images/headphone.jpeg" alt="product photo" />
                        </td>
                        <td>هدفون</td>
                        <td>12400</td>
                        <td>27</td>
                        <td>
                            <button className="products-table__btn" onClick={() => setIsShowDetailsModal(true)}>جزئیات</button>
                            <button className="products-table__btn" onClick={() => setIsShowDeleteModal(true)}>حذف</button>
                            <button className="products-table__btn" onClick={() => setIsShowEditModal(true)}>ویرایش</button>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
        {isShowDeleteModal && <DeleteModal confirmDeletion={onConfirmModalDeletion}  cancelDeletion={onCancelModalDeletion} />}
        {isShowDetailsModal && <DetailsModal hideModal={onCloseDetailsModal} />}
        {isShowEditModal && <EditModal hideModal={onCloseEditModal}></EditModal>}
        </>
    )
}
