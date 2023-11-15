import React from 'react'
import "./Sidebar.scss"

// icons
import { IconContext } from 'react-icons';
import { AiOutlineHome } from "react-icons/ai";
import { AiOutlineShoppingCart } from "react-icons/ai";
import { AiOutlineComment } from "react-icons/ai";
import { AiOutlineUser } from "react-icons/ai";
import { IoBagOutline } from "react-icons/io5";
import { IoTicketOutline } from "react-icons/io5";

export default function Sidebar() {
    return (
        <div className='sidebar'>
            <h1 className="sidebar__title">به داشبورد خود خوش آمدید.</h1>

            <IconContext.Provider value={{size: 24}}>
                <ul className="sidebar__menu">
                    <li className='sidebar__item sidebar__item--active'>
                        <a className='sidebar__link' href="#">
                            <AiOutlineHome />
                            صفحه‌ی اصلی
                        </a>
                    </li>
                    <li className='sidebar__item'>
                        <a className='sidebar__link' href="#">
                            <AiOutlineShoppingCart />
                            محصولات
                        </a>
                    </li>
                    <li className='sidebar__item'>
                        <a className='sidebar__link' href="#">
                            <AiOutlineComment />
                            کامنت‌ها
                        </a>
                    </li>
                    <li className='sidebar__item'>
                        <a className='sidebar__link' href="#">
                            <AiOutlineUser />
                            کاربران
                        </a>
                    </li>
                    <li className='sidebar__item'>
                        <a className='sidebar__link' href="#">
                            <IoBagOutline />
                            سفارشات
                        </a>
                    </li>
                    <li className='sidebar__item'>
                        <a className='sidebar__link' href="#">
                            <IoTicketOutline />
                            تخفیف‌ها
                        </a>
                    </li>
                </ul>
            </IconContext.Provider>
        </div>
    )
}
