import React from 'react'
import "./EditModal.scss"

export default function EditModal({ children, hideModal, submitChanges }) {

    return (
        <div className="modal-parent visible">
            <div className="edit-modal modal">
                <form action="#" className="edit-modal__form" onSubmit={submitChanges}>
                    <h3 className='edit-modal__title'>اطلاعات جدید را وارد کنید</h3>

                    {children}
                    
                    <div className="edit-modal__buttons-container">
                        <button type='button' className='edit-modal__btn edit-modal__cancel-btn' onClick={hideModal}>انصراف</button>
                        <button type='submit' className='edit-modal__btn edit-modal__submit-btn'>ثبت تغییرات</button>
                    </div>
                </form>
            </div>
        </div>
    )
}
