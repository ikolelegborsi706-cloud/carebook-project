import React from 'react'
import {Link, NavLink, Outlet} from "react-router-dom"
import { CiHome } from "react-icons/ci";
import { FaSearch } from "react-icons/fa";
import { CiCalendar } from "react-icons/ci";
import { BsFileEarmarkTextFill } from "react-icons/bs";
import { MdOutlinePayment } from "react-icons/md";
import { FaRegClock } from "react-icons/fa";
import { GiMoneyStack } from "react-icons/gi";
import { FaStethoscope } from "react-icons/fa";
import { FaUndo } from "react-icons/fa";
import { FaChartLine } from "react-icons/fa";
import { IoClose } from "react-icons/io5";
import { useState } from 'react';
import { MdOutlineMenu } from "react-icons/md";
import { MdLogout } from 'react-icons/md';
import logoOnDark from "../../../assets/logo/logo-on-dark.svg";
import logo from "../../../assets/logo/logo.svg";
 import { FiUsers } from "react-icons/fi";
 import { useAuth } from '../../../context/AuthContext';



const ASIDEMENU = {
    patient: {
        heading: "My health",
        items: [
            {to: "/patient", label: "Overview", icon: CiHome},
            {to: "/doctors", label: "Find a doctor", icon: FaSearch},
            {to: "/patient/appointments", label: "My appointment", icon: CiCalendar},
            {to: "/patient/notes", label: "Visit notes", icon: BsFileEarmarkTextFill},
            {to: "/patient/payments", label: "payments", icon: MdOutlinePayment},
        ]
    },
    doctor: {
      heading: "Doctor workspace",
      items: [
             {to: "/doctor", label: "Overview", icon: CiHome},
            {to: "/doctors/schedule", label: "Schedule", icon: CiCalendar},
            {to: "/patient/profile", label: "Profile & availability", icon: FaRegClock},
            {to: "/patient/notes", label: "Visit notes", icon: BsFileEarmarkTextFill},
            {to: "/patient/earnings", label: "Earnings", icon: GiMoneyStack},
      ] 
    },
    admin: {
        heading: "Admin",
        items: [
         {to: "/admin", label: "Overview", icon: CiHome},
            {to: "/admin/doctors", label: "doctor approvals", icon: FaStethoscope, notificationBadge: "pendingDortors"},
            {to: "/admin/users", label: "Users", icon: FiUsers},
            {to: "/admin/payments", label: "Payments & refunds", icon: FaUndo, notificationBadge: "refundsNeeded"},
            {to: "/admin/appointments", label: "Appointments", icon: CiCalendar},
            {to: "/admin/revenue", label: "Revenue", icon: FaChartLine},
        ]
    }
}

const ROLE_LABEL = {
    patient: "Patient",
    doctor: "Doctor",
    admin: "Administrator"
}

function DashboardLayout({role}) {
    const {user, logout} = useAuth();
    const [open, setOpen] = useState(false);
    const menu = ASIDEMENU[role];


    return (
    <div className="dash">
        <header className="dash-topbar">
            <Link to={"/"} className="dash-logo">
            <img src={logo} alt="Carebook logo" />
            </Link>
            <button className="dash-menu-btn">
             {open ? <IoClose /> : <MdOutlineMenu />}
            </button>
        </header>
        <aside id='dash-sider' className={`dash-side ${open ? 'open' : ''}`}>
         <Link to={"/"} className='dash-logo'>
         <img src={logoOnDark} alt="Carebook logo" />
         </Link>
         <p className="dash-side-heading">{menu.heading}</p>
         <nav className="dash-nav">
           {
            menu.items.map((item) => {
                const MenuIcon = item.icon;
                return (
                    <NavLink to={item.to} key={item.to}>
                     {MenuIcon && <MenuIcon size={18} />}
                     <span>{item.label}</span>
                    </NavLink>
                )
            })
           }
         </nav>
         <button className="dash-logout" onClick={logout}>
            <MdLogout />
            <span className="sr-only">Log out</span>
         </button>

        </aside>
        <main className="dash-main">
            <Outlet />
        </main>
    </div>
  )
}

export default DashboardLayout