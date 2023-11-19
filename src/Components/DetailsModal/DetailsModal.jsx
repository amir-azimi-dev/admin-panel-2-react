import React, { useEffect } from 'react'
import { createPortal } from 'react-dom'
import "./DetailsModal.scss"

export default function DetailsModal({ hideModal }) {
    useEffect(() => {
        const keyDownHandler = event => event.key === "Escape" && hideModal()
        window.addEventListener("keydown", keyDownHandler)
        return () => removeEventListener("keydown", keyDownHandler)

    }, [])

    return createPortal(
        <div className="modal-parent visible">
            <div className="details-modal modal">
                <table className='cms-table'>
                    <thead>
                        <tr>
                            <th>نام</th>
                            <th>قیمت</th>
                            <th>محبوبیت</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>لپ‌تاپ</td>
                            <td>1293589</td>
                            <td>94%</td>
                        </tr>
                    </tbody>
                </table>
                <div className="details-modal__buttons">
                    <button className='details-modal__btn' onClick={() => hideModal()}>خروج</button>
                </div>
            </div>
        </div>
        , document.body)
}
