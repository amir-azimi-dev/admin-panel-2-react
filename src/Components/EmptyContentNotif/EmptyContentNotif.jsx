import React from 'react'
import "./EmptyContentNotif.scss"

export default function ErrorBox({ message }) {
    return (
        <div className='empty-content-banner'>
            <h3>{message}</h3>
        </div>
    )
}
