import React from 'react'
import "./Sidebar.scss"

// spa
import { Link } from 'react-router-dom';

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
                        <Link to="/" className='sidebar__link'>
                            <AiOutlineHome />
                            صفحه‌ی اصلی
                        </Link>
                    </li>
                    <li className='sidebar__item'>
                        <Link to="/products" className='sidebar__link'>
                            <AiOutlineShoppingCart />
                            محصولات
                        </Link>
                    </li>
                    <li className='sidebar__item'>
                        <Link to="/comments" className='sidebar__link'>
                            <AiOutlineComment />
                            کامنت‌ها
                        </Link>
                    </li>
                    <li className='sidebar__item'>
                        <Link to="/users" className='sidebar__link'>
                            <AiOutlineUser />
                            کاربران
                        </Link>
                    </li>
                    <li className='sidebar__item'>
                        <Link to="/orders" className='sidebar__link'>
                            <IoBagOutline />
                            سفارشات
                        </Link>
                    </li>
                    <li className='sidebar__item'>
                        <Link to="/offs" className='sidebar__link'>
                            <IoTicketOutline />
                            تخفیف‌ها
                        </Link>
                    </li>
                </ul>
            </IconContext.Provider>
        </div>
    )
}
