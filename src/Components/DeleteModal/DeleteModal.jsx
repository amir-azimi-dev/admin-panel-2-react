import React from 'react'
import { createPortal } from "react-dom"
import "./DeleteModal.scss"

export default function DeleteModal({confirmDeletion, cancelDeletion}) {
  return createPortal(
    <div className="modal-parent visible">
      <div className="delete-modal modal">
        <h3 className='delete-modal__title'>آیا از حذف مطمئن هستید؟</h3>
        <hr />
        <p className='delete-modal__desc'>تغییرات غیر قابل بازگشت هستند، آیا از حذف مطمئن هستید؟</p>
        <div className="delete-modal__buttons">
          <button className='delete-modal__btn delete-modal-btn__reject' onClick={() => cancelDeletion()}>انصراف</button>
          <button className='delete-modal__btn delete-modal-btn__accept' onClick={() => confirmDeletion()}>حذف</button>
        </div>
      </div>
    </div>
    , document.body)
}
