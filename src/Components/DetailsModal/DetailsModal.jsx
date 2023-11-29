import React, { useEffect } from 'react'
import { createPortal } from 'react-dom'
import "./DetailsModal.scss"

export default function DetailsModal({children, hideModal, activeItem }) {

    useEffect(() => {
        const keyDownHandler = event => event.key === "Escape" && hideModal()
        window.addEventListener("keydown", keyDownHandler)
        return () => removeEventListener("keydown", keyDownHandler)

    }, [])

    return createPortal(
        <div className="modal-parent visible">
            <div className="details-modal modal">
                {children}
                <div className="details-modal__buttons">
                    <button className='details-modal__btn' onClick={() => hideModal()}>خروج</button>
                </div>
            </div>
        </div>
        , document.body)
}
