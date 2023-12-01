import React from 'react'
import { createPortal } from "react-dom"
import "./DeleteModal.scss"

export default function DeleteModal({ confirmAction, cancelAction, activeItem, title, doNotShowDeletionDescription }) {
  return createPortal(
    <div className="modal-parent visible">
      <div className="delete-modal modal">
        <h3 className='delete-modal__title'>{title}</h3>

        {!doNotShowDeletionDescription && (
          <>
            <hr className='mb-5' />
            {Boolean(activeItem.title) && <p className='delete-modal__name'>نام محصول: {activeItem.title}</p>}
            <p className='delete-modal__desc'>تغییرات غیر قابل بازگشت هستند، آیا از حذف مطمئن هستید؟</p>
          </>
        )}

        <div className="delete-modal__buttons mt-5">
          <button className='delete-modal__btn delete-modal-btn__reject' onClick={() => cancelAction()}>انصراف</button>
          <button className='delete-modal__btn delete-modal-btn__accept' onClick={() => confirmAction(activeItem.id)}>{doNotShowDeletionDescription ? "تایید" : "حذف"}</button>
        </div>
      </div>
    </div>
    , document.body)
}
