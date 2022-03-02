import React from "react";
import "../css/SideNav.css";
import { useSelector, useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { selectUser, setUserLogoutState } from "../features/userSlice";

function SideNav() {
    let Navigate = useNavigate();
    const user = useSelector(selectUser);
    const dispatch = useDispatch();
    const handleLogout = () => {
        localStorage.setItem("token", "");
        dispatch(
            setUserLogoutState({
                token: null,
                user: null,
            })
        );
        Navigate("/");
    };

    return (
        <div>
            <aside className='main-sidebar  sidebar-dark-primary elevation-4'>
                {/* Brand Logo */}
                <Link to='/' className='brand-link sidenav__brandLink'>
                    <span className='brand-text font-weight-light'>
                        St Jude Dental Clinic
                    </span>
                </Link>
                {/* Sidebar */}
                <div className='sidebar'>
                    {/* Sidebar user panel (optional) */}
                    <div className='user-panel mt-3 pb-3 mb-3 d-flex'>
                        <div className='info'>
                            <span className='d-block sideNav__span'>
                                {user?.email}
                            </span>
                        </div>
                    </div>
                </div>
                {/* /.sidebar */}
                <nav className='mt-2'>
                    <ul
                        className='nav nav-pills nav-sidebar flex-column '
                        data-widget='treeview'
                        role='menu'
                        data-accordion='false'>
                        {/* Add icons to the links using the .nav-icon class
         with font-awesome or any other icon font library */}
                        <li className='nav-item '>
                            <Link
                                to='/patients'
                                className='nav-link active sidebar-toggle-btn'
                                data-widget='pushmenu'>
                                <i className='fas fa-user-friends'></i> &nbsp;
                                <p>
                                    Patients
                                    {/* <i className='right fas fa-angle-left' /> */}
                                </p>
                            </Link>
                        </li>
                        <li className='nav-item '>
                            <Link
                                to='/appointments'
                                className='nav-link active sidebar-toggle-btn'
                                data-widget='pushmenu'>
                                <i className='fas fa-clipboard-list'></i> &nbsp;
                                <p>
                                    Appointments
                                    {/* <i className='right fas fa-angle-left' /> */}
                                </p>
                            </Link>
                        </li>
                        <li className='nav-item '>
                            <Link
                                to='/treatments'
                                className='nav-link active sidebar-toggle-btn'
                                data-widget='pushmenu'>
                                <i className='fas fa-briefcase-medical'></i>{" "}
                                &nbsp;
                                <p>
                                    Treatments
                                    {/* <i className='right fas fa-angle-left' /> */}
                                </p>
                            </Link>
                        </li>
                        <li className='nav-item '>
                            <Link
                                to='/payment'
                                className='nav-link active sidebar-toggle-btn'
                                data-widget='pushmenu'>
                                <i className='far fa-credit-card'></i> &nbsp;
                                <p>
                                    Process Payments
                                    {/* <i className='right fas fa-angle-left' /> */}
                                </p>
                            </Link>
                        </li>
                        {!user?.is_secretary ? (
                            <li className='nav-item '>
                                <Link
                                    to='/sales'
                                    className='nav-link active sidebar-toggle-btn'
                                    data-widget='pushmenu'>
                                    <i className='fas fa-dollar-sign'></i>{" "}
                                    &nbsp;
                                    <p>
                                        Sales
                                        {/* <i className='right fas fa-angle-left' /> */}
                                    </p>
                                </Link>
                            </li>
                        ) : (
                            ""
                        )}

                        <li className='nav-item '>
                            <Link
                                to='/generate-letter'
                                className='nav-link active sidebar-toggle-btn'
                                data-widget='pushmenu'>
                                <i className='fas fa-print'></i> &nbsp;
                                <p>
                                    Generate Letter
                                    {/* <i className='right fas fa-angle-left' /> */}
                                </p>
                            </Link>
                        </li>
                        {!user?.is_secretary ? (
                            <li className='nav-item '>
                                <Link
                                    to='/create-secretary-account'
                                    className='nav-link active sidebar-toggle-btn'
                                    data-widget='pushmenu'>
                                    <i className='fas fa-user-plus'></i> &nbsp;
                                    <p>
                                        Create Secretary Account
                                        {/* <i className='right fas fa-angle-left' /> */}
                                    </p>
                                </Link>
                            </li>
                        ) : (
                            ""
                        )}
                    </ul>
                </nav>
                <button
                    onClick={handleLogout}
                    className='btn btn-secondary sideNav__logout'>
                    Logout
                </button>
            </aside>
        </div>
    );
}

export default SideNav;
