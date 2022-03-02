import React, { useEffect, useState } from "react";
import "../css/ManageSecretary.css";
import axios from "../axios";
import swal from "sweetalert";

function ManageSecretary() {
    const [accounts, setAccounts] = useState([]);
    const [secAccounts, setSecAccounts] = useState([]);
    const [editName, setEditName] = useState("");
    const [editEmail, setEditEmail] = useState("");

    useEffect(() => {
        axios
            .get("/auth/users/", {
                headers: {
                    Authorization: `Token ${localStorage.getItem("token")}`,
                },
            })
            .then((res) => {
                console.log(res.data);
                setAccounts(res.data);
            });
    }, []);

    useEffect(() => {
        axios
            .get("/auth/user-email-and-password", {
                Headers: {
                    Authorization: `Token ${localStorage.getItem("token")}`,
                },
            })
            .then((res) => {
                console.log(res.data);
                setSecAccounts(res.data);
            });
    }, []);

    const filterAccounts = () => {
        return accounts.filter((account) => {
            return account.is_secretary === true;
        });
    };

    const filterAccounts2 = () => {
        return secAccounts.filter((account) => {
            return account.is_secretary === true;
        });
    };

    const deleteSecretary = (id) => {
        axios
            .delete(`/auth/users/${id}/`, {
                headers: {
                    Authorization: `Token ${localStorage.getItem("token")}`,
                },
            })
            .then((res) => {
                swal("Success", ` Deleted `, "success").then(
                    setTimeout(() => {
                        window.location.reload(false);
                    }, 1000)
                );
            });
    };

    const handleDeleteDetails = (id) => {
        axios
            .delete(`/auth/user-email-and-password/${id}/`, {
                headers: {
                    Authorization: `Token ${localStorage.getItem("token")}`,
                },
            })
            .then((res) => {
                swal("Success", ` Deleted `, "success").then(
                    setTimeout(() => {
                        window.location.reload(false);
                    }, 1000)
                );
            });
    };

    return (
        <div className='container manageSecretary__container'>
            <div className='row manageSecretary__row1 align-items-start'>
                <div className='col-12 manageSecretary__col1'>
                    <ul
                        className='nav nav-pills mb-3'
                        id='pills-tab'
                        role='tablist'>
                        <li className='nav-item' role='presentation'>
                            <button
                                className='nav-link active'
                                id='pills-home-tab'
                                data-bs-toggle='pill'
                                data-bs-target='#pills-home'
                                type='button'
                                role='tab'
                                aria-controls='pills-home'
                                aria-selected='true'>
                                Accounts
                            </button>
                        </li>
                        <li className='nav-item' role='presentation'>
                            <button
                                className='nav-link'
                                id='pills-profile-tab'
                                data-bs-toggle='pill'
                                data-bs-target='#pills-profile'
                                type='button'
                                role='tab'
                                aria-controls='pills-profile'
                                aria-selected='false'>
                                Details
                            </button>
                        </li>
                    </ul>
                    <div className='tab-content' id='pills-tabContent'>
                        <div
                            className='tab-pane fade show active viewPatient__paidTable'
                            id='pills-home'
                            role='tabpanel'
                            aria-labelledby='pills-home-tab'>
                            <table className='table table-striped table-hover table-responsive align-middle treatments__table'>
                                <thead className='text-center'>
                                    <tr>
                                        <th scope='col'>Name</th>
                                        <th scope='col'>Email</th>

                                        <th scope='col'>Last Login</th>
                                        <th scope='col'>Action</th>
                                    </tr>
                                </thead>
                                <tbody className='text-center'>
                                    {filterAccounts().map((account) => (
                                        <tr key={account.id}>
                                            <td>
                                                {account.first_name}{" "}
                                                {account.last_name}
                                            </td>
                                            <td>{account.email}</td>

                                            <td>{account.last_login}</td>
                                            <td>
                                                <button
                                                    onClick={() =>
                                                        deleteSecretary(
                                                            account.id
                                                        )
                                                    }
                                                    type='button'
                                                    className='btn btn-danger'>
                                                    Delete
                                                </button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                        <div
                            className='tab-pane fade'
                            id='pills-profile'
                            role='tabpanel'
                            aria-labelledby='pills-profile-tab'>
                            <table className='table table-striped table-hover table-responsive align-middle treatments__table'>
                                <thead className='text-center'>
                                    <tr>
                                        <th scope='col'>Email</th>

                                        <th scope='col'>Password</th>
                                        <th scope='col'>Action</th>
                                    </tr>
                                </thead>
                                <tbody className=' text-center'>
                                    {filterAccounts2()?.map((filter) => (
                                        <tr key={filter.id}>
                                            <td>{filter.email}</td>
                                            <td>{filter.password}</td>
                                            <td>
                                                <button
                                                    onClick={() =>
                                                        handleDeleteDetails(
                                                            filter.id
                                                        )
                                                    }
                                                    className='btn btn-danger'>
                                                    Delete
                                                </button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ManageSecretary;
