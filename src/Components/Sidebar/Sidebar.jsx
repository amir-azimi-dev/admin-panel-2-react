import React from 'react'
import "./Sidebar.scss"

// spa
import { NavLink } from 'react-router-dom';

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

            <IconContext.Provider value={{ size: 24 }}>
                <ul className="sidebar__menu">
                    <NavLink to="/" className={({isActive}) => (isActive ? "sidebar__item sidebar__item--active" : "sidebar__item")}>
                        <span to="/" className='sidebar__link'>
                            <AiOutlineHome />
                            صفحه‌ی اصلی
                        </span>
                    </NavLink>
                    <NavLink to="/products" className={({isActive}) => (isActive ? "sidebar__item sidebar__item--active" : "sidebar__item")}>
                        <span to="/products" className='sidebar__link'>
                            <AiOutlineShoppingCart />
                            محصولات
                        </span>
                    </NavLink>
                    <NavLink to="/comments" className={({isActive}) => (isActive ? "sidebar__item sidebar__item--active" : "sidebar__item")}>
                        <span to="/comments" className='sidebar__link'>
                            <AiOutlineComment />
                            کامنت‌ها
                        </span>
                    </NavLink>
                    <NavLink to="/users" className={({isActive}) => (isActive ? "sidebar__item sidebar__item--active" : "sidebar__item")}>
                        <span to="/users" className='sidebar__link'>
                            <AiOutlineUser />
                            کاربران
                        </span>
                    </NavLink>
                    <NavLink to="/orders" className={({isActive}) => (isActive ? "sidebar__item sidebar__item--active" : "sidebar__item")}>
                        <span to="/orders" className='sidebar__link'>
                            <IoBagOutline />
                            سفارشات
                        </span>
                    </NavLink>
                    <NavLink to="/offs" className={({isActive}) => (isActive ? "sidebar__item sidebar__item--active" : "sidebar__item")}>
                        <span to="/offs" className='sidebar__link'>
                            <IoTicketOutline />
                            تخفیف‌ها
                        </span>
                    </NavLink>
                </ul>
            </IconContext.Provider>
        </div>
    )
}
