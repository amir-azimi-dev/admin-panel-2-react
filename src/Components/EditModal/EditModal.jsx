import React from 'react'
import "./EditModal.scss"

// icons
import { AiOutlineDollarCircle } from "react-icons/ai"

export default function EditModal({ children, hideModal, submitChanges }) {
    return (
        <div className="modal-parent visible">
            <div className="edit-modal modal">
                <form action="#" className="edit-modal__form" onSubmit={submitChanges}>
                    <h3 className='edit-modal__title'>اطلاعات جدید را وارد کنید</h3>

                    {children}
                    <div className="edit-product">
                        <div className="edit-product__form-group">
                            <AiOutlineDollarCircle />
                            <input type="text" placeholder='عنوان جدید را وارد کنید' className='edit-product__input' />
                        </div>

                        <div className="edit-product__form-group">
                            <AiOutlineDollarCircle />
                            <input type="text" placeholder='عنوان جدید را وارد کنید' className='edit-product__input' />
                        </div>

                        <div className="edit-product__form-group">
                            <AiOutlineDollarCircle />
                            <input type="text" placeholder='عنوان جدید را وارد کنید' className='edit-product__input' />
                        </div>

                        <div className="edit-product__form-group">
                            <AiOutlineDollarCircle />
                            <input type="text" placeholder='عنوان جدید را وارد کنید' className='edit-product__input' />
                        </div>
                    </div>

                    <div className="edit-modal__buttons-container">
                        <button type='button' className='edit-modal__btn edit-modal__cancel-btn' onClick={() => hideModal()}>انصراف</button>
                        <button type='submit' className='edit-modal__btn edit-modal__submit-btn'>ثبت تغییرات</button>
                    </div>
                </form>
            </div>
        </div>
    )
}
