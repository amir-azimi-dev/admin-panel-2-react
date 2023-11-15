import React from 'react'
import "./Topbar.scss"

// icons
import { AiOutlineBell } from 'react-icons/ai'
import { BsBrightnessHigh } from "react-icons/bs"

export default function Topbar() {
    return (
        <div className='topbar'>
            <div className="topbar__profile">
                <img src='/images/saeedi.jpeg' alt='admin photo' className="topbar__profile-img" />
                <div className="topbar__profile-wrapper">
                    <h2 className="topbar__profile-name">محمد امین سعیدی راد</h2>
                    <h3 className="topbar__profile-role">برنامه نویس فرانت اند</h3>
                </div>
            </div>

            <div className="topbar__wrapper">
                <div className="topbar__search-box">
                    <input className='topbar__search-input' type="text" placeholder='جستجو کنید ...' />
                    <button className="topbar__search-button">جستجو</button>
                </div>

                <button className='topbar__btn'>
                    <AiOutlineBell />
                </button>
                <button className='topbar__btn'>
                    <BsBrightnessHigh />
                </button>
            </div>
        </div>
    )
}
