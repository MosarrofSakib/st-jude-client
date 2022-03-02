import React, { useState, useEffect } from "react";
import "../css/ViewPatient.css";
import { useParams } from "react-router-dom";
import axios from "../axios";
import swal from "sweetalert";

function ViewPatient() {
    let { id } = useParams();
    const [patient, setPatient] = useState({});
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [address, setAddress] = useState("");
    const [telephone, setTelephone] = useState("");
    const [age, setAge] = useState("");
    const [occupation, setOccupation] = useState("");
    const [status, setStatus] = useState("");
    const [complaint, setComplaint] = useState("");
    const [dateWalkIn, setDateWalkIn] = useState("");
    const [transactions, setTransactions] = useState([]);
    const [balance, setBalance] = useState("");
    const [paymentInput, setPaymentInput] = useState("");
    const [paymentFromArray, setPaymentFromArray] = useState("");
    const [amount, setAmount] = useState("");
    const [balanceId, setBalanceId] = useState("");
    const [datePaid, setDatePaid] = useState();
    const [searchDate, setSearchDate] = useState("");
    useEffect(() => {
        axios
            .get(`/api/patients/${id}/`, {
                headers: {
                    Authorization: `Token ${localStorage.getItem("token")}`,
                },
            })
            .then((res) => {
                setPatient(res.data);
                setFirstName(res.data.first_name);
                setLastName(res.data.last_name);
                setAddress(res.data.address);
                setTelephone(res.data.telephone);
                setAge(res.data.age);

                setOccupation(res.data.occupation);
                setStatus(res.data.status);
                setComplaint(res.data.complaint);
                setDateWalkIn(res.data.date_walk_in);
            });

        axios
            .get("/api/payments", {
                headers: {
                    Authorization: `Token ${localStorage.getItem("token")}`,
                },
            })
            .then((res) => {
                setTransactions(res.data);
            });
    }, [id]);

    const filterTransaction = () => {
        return transactions.filter((transac) => {
            let name = `${patient.first_name} ${patient.last_name}`;
            let nameFromArray = `${transac.patient.first_name} ${transac.patient.last_name}`;
            return name === nameFromArray;
        });
    };

    const handleEditPayment = (id) => {
        axios
            .get(`/api/payments/${id}/`, {
                headers: {
                    Authorization: `Token ${localStorage.getItem("token")}`,
                },
            })
            .then((res) => {
                console.log(res.data);
                setBalance(res.data.balance);
                setBalanceId(res.data.id);
                setPaymentFromArray(parseInt(res.data.payment));
                setAmount(res.data.amount);
            });
    };

    console.log("Amount: ", amount, "Payment: ", paymentInput);
    const handleUpdateBalance = () => {
        const form = {
            date_paid: datePaid,
            balance: automaticBalance(balance, paymentInput),
            payment: automaticPayment(paymentFromArray, paymentInput),
        };
        axios
            .put(`/api/payments/${balanceId}/`, form, {
                headers: {
                    Authorization: `Token ${localStorage.getItem("token")}`,
                },
            })
            .then((res) => {
                swal("Success", ` Edit Successfull`, "success").then(
                    setTimeout(() => {
                        window.location.reload(false);
                    }, 1000)
                );
            });
    };

    const automaticBalance = (balance, paymentInput) => {
        return balance - paymentInput;
    };

    const automaticPayment = (paymentFromArray, paymentInput) => {
        return paymentFromArray + paymentInput;
    };

    const filterPaid = () => {
        return filterTransaction().filter((paid) => {
            return paid.balance === 0;
        });
    };

    const filterPaidFilter = () => {
        return filterPaid().filter((filter) => {
            return filter.date === searchDate;
        });
    };

    const filterUnpaid = () => {
        return filterTransaction().filter((paid) => {
            return paid.balance !== 0;
        });
    };

    const totalBalance = () => {
        return filterUnpaid().reduce((currentTotal, item) => {
            return item.balance + currentTotal;
        }, 0);
    };

    const handleEditPatient = (e) => {
        e.preventDefault();
        const form = {
            first_name: firstName,
            last_name: lastName,
            address: address,
            telephone: telephone,
            age: age,
            occupation: occupation,
            status: status,
            complaint: complaint,
            date_walk_in: dateWalkIn,
        };

        axios
            .put(`/api/patients/${id}/`, form, {
                headers: {
                    Authorization: `Token ${localStorage.getItem("token")}`,
                },
            })
            .then((res) => {
                swal("Success", ` Edit Successful`, "success").then(
                    setTimeout(() => {
                        window.location.reload(false);
                    }, 1000)
                );
            });
    };

    return (
        <div>
            {/* Update Modal */}
            <div
                className='modal fade'
                id='updatePaymentModal'
                tabIndex='-1'
                aria-hidden='true'>
                <div className='modal-dialog'>
                    <div className='modal-content'>
                        <div className='modal-header'>
                            <h5 className='modal-title'>Update Payment</h5>
                            <button
                                type='button'
                                className='btn-close'
                                data-bs-dismiss='modal'
                                aria-label='Close'></button>
                        </div>
                        <div className='modal-body'>
                            <div className='mb-3'>
                                <label className='form-label'>Date Paid</label>
                                <input
                                    type='date'
                                    className='form-control'
                                    onChange={(e) =>
                                        setDatePaid(e.target.value)
                                    }
                                    value={datePaid}
                                />
                            </div>
                            <div className='mb-3'>
                                <label className='form-label'>Payment</label>
                                <input
                                    type='number'
                                    className='form-control'
                                    onChange={(e) =>
                                        setPaymentInput(
                                            parseInt(e.target.value)
                                        )
                                    }
                                    value={paymentInput}
                                    required
                                />
                            </div>
                            <div className='mb-3'>
                                <label className='form-label'>Balance</label>
                                <input
                                    type='text'
                                    className='form-control'
                                    onChange={(e) => setBalance(e.target.value)}
                                    value={automaticBalance(
                                        balance,
                                        paymentInput
                                    )}
                                    required
                                />
                            </div>

                            <button
                                onClick={handleUpdateBalance}
                                type='button'
                                className='btn btn-primary treatments__submit'>
                                Update
                            </button>
                        </div>
                    </div>
                </div>
            </div>
            <div
                className='modal fade'
                id='addPatientModal'
                tabIndex='-1'
                aria-hidden='true'>
                <div className='modal-dialog'>
                    <div className='modal-content'>
                        <div className='modal-header'>
                            <h5 className='modal-title'>Edit Patient</h5>
                            <button
                                type='button'
                                className='btn-close'
                                data-bs-dismiss='modal'
                                aria-label='Close'></button>
                        </div>
                        <div className='modal-body'>
                            <form className='patients__form was-validated'>
                                <div className='mb-3'>
                                    <label className='form-label'>
                                        First Name
                                    </label>
                                    <input
                                        type='text'
                                        className='form-control'
                                        onChange={(e) =>
                                            setFirstName(e.target.value)
                                        }
                                        value={firstName}
                                        required
                                    />
                                </div>
                                <div className='mb-3'>
                                    <label className='form-label'>
                                        Last Name
                                    </label>
                                    <input
                                        type='text'
                                        className='form-control'
                                        onChange={(e) =>
                                            setLastName(e.target.value)
                                        }
                                        value={lastName}
                                        required
                                    />
                                </div>
                                <div className='mb-3'>
                                    <label className='form-label'>
                                        Address
                                    </label>
                                    <input
                                        type='text'
                                        className='form-control'
                                        onChange={(e) =>
                                            setAddress(e.target.value)
                                        }
                                        value={address}
                                        required
                                    />
                                </div>
                                <div className='mb-3'>
                                    <label className='form-label'>
                                        Telephone
                                    </label>
                                    <input
                                        type='number'
                                        className='form-control'
                                        onChange={(e) =>
                                            setTelephone(e.target.value)
                                        }
                                        value={telephone}
                                        required
                                    />
                                </div>
                                <div className='mb-3'>
                                    <label className='form-label'>Age</label>
                                    <input
                                        type='number'
                                        className='form-control'
                                        onChange={(e) => setAge(e.target.value)}
                                        value={age}
                                        required
                                    />
                                </div>
                                <div className='mb-3'>
                                    <label className='form-label'>
                                        Occupation
                                    </label>
                                    <input
                                        type='text'
                                        className='form-control'
                                        onChange={(e) =>
                                            setOccupation(e.target.value)
                                        }
                                        value={occupation}
                                        required
                                    />
                                </div>
                                <div className='mb-3'>
                                    <label className='form-label'>Status</label>
                                    <input
                                        type='text'
                                        className='form-control'
                                        onChange={(e) =>
                                            setStatus(e.target.value)
                                        }
                                        value={status}
                                        required
                                    />
                                </div>
                                <div className='mb-3'>
                                    <label className='form-label'>
                                        Complaint
                                    </label>
                                    <input
                                        type='text'
                                        className='form-control'
                                        onChange={(e) =>
                                            setComplaint(e.target.value)
                                        }
                                        value={complaint}
                                        required
                                    />
                                </div>
                                <div className='mb-3'>
                                    <label className='form-label'>
                                        Date Walk In
                                    </label>
                                    <input
                                        type='date'
                                        className='form-control'
                                        onChange={(e) =>
                                            setDateWalkIn(e.target.value)
                                        }
                                        value={dateWalkIn}
                                        required
                                    />
                                </div>

                                <button
                                    onClick={handleEditPatient}
                                    type='submit'
                                    className='btn btn-primary patients__submit'
                                    data-bs-dismiss='modal'>
                                    Save
                                </button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>{" "}
            <div className='card patients__card'>
                <div className='card-header'>
                    <h3 className='card-title'>Patient Info</h3>
                    <div className='card-tools'>
                        <ul className='nav nav-pills ml-auto'>
                            <li className='nav-item'>
                                <button
                                    type='button'
                                    data-bs-toggle='modal'
                                    data-bs-target='#addPatientModal'
                                    className='btn btn-success '>
                                    Edit
                                </button>
                            </li>
                        </ul>
                    </div>
                </div>
                {/* /.card-header */}
                <div className='card-body'>
                    <div className='tab-content p-0'>
                        <ul className='list-group viewPatient_listGroup'>
                            <li
                                className='list-group-item active'
                                aria-current='true'>
                                {patient.first_name} {patient.last_name}
                            </li>
                            <li className='list-group-item'>
                                Address: {patient.address}
                            </li>
                            <li className='list-group-item'>
                                Telephone: {patient.telephone}
                            </li>
                            <li className='list-group-item'>
                                Age: {patient.age}
                            </li>
                            <li className='list-group-item'>
                                Occupation: {patient.occupation}
                            </li>
                            <li className='list-group-item'>
                                Status: {patient.status}
                            </li>
                            <li className='list-group-item'>
                                Complaint: {patient.complaint}
                            </li>
                            <li className='list-group-item'>
                                Date Walk In: {patient.date_walk_in}
                            </li>
                        </ul>
                        <br />
                        {/* Payment History */}
                        <div className='col-lg-12 test'>
                            <h1 className='text-center'>Payment History</h1>
                            <ul
                                className='nav nav-pills mb-3 viewPatient__tablist'
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
                                        Paid
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
                                        Balances
                                    </button>
                                </li>
                                <li className='nav-item'>
                                    <input
                                        type='date'
                                        className='form-control'
                                        onChange={(e) =>
                                            setSearchDate(e.target.value)
                                        }
                                        value={searchDate}
                                    />
                                </li>
                            </ul>
                            <div className='tab-content ' id='pills-tabContent'>
                                <div
                                    className='tab-pane fade show active viewPatient__paidTable'
                                    id='pills-home'
                                    role='tabpanel'
                                    aria-labelledby='pills-home-tab'>
                                    <div className='table-responsive'>
                                        <table className='table'>
                                            <thead className='text-center'>
                                                <tr>
                                                    <th scope='col'>Date</th>

                                                    <th scope='col'>
                                                        Description
                                                    </th>
                                                    <th scope='col'>
                                                        Check Number
                                                    </th>
                                                    <th scope='col'>Amount</th>
                                                    <th scope='col'>Payment</th>
                                                    <th scope='col'>Balance</th>
                                                    <th scope='col'>
                                                        Date Paid
                                                    </th>
                                                </tr>
                                            </thead>
                                            <tbody className='text-center'>
                                                {searchDate
                                                    ? filterPaidFilter()?.map(
                                                          (filter) => (
                                                              <tr
                                                                  key={
                                                                      filter.id
                                                                  }>
                                                                  <td>
                                                                      {
                                                                          filter.date
                                                                      }
                                                                  </td>

                                                                  <td>
                                                                      {
                                                                          filter
                                                                              .description
                                                                              .name
                                                                      }
                                                                  </td>
                                                                  <td>
                                                                      {
                                                                          filter.check_number
                                                                      }
                                                                  </td>
                                                                  <td>
                                                                      ₱
                                                                      {
                                                                          filter.amount
                                                                      }
                                                                  </td>
                                                                  <td>
                                                                      ₱
                                                                      {
                                                                          filter.payment
                                                                      }
                                                                  </td>
                                                                  <td>
                                                                      {filter.balance ===
                                                                      0
                                                                          ? "Paid"
                                                                          : `₱ ${filter.balance}`}
                                                                  </td>
                                                                  <td>
                                                                      {
                                                                          filter.date_paid
                                                                      }
                                                                  </td>
                                                              </tr>
                                                          )
                                                      )
                                                    : filterPaid()?.map(
                                                          (filter) => (
                                                              <tr
                                                                  key={
                                                                      filter.id
                                                                  }>
                                                                  <td>
                                                                      {
                                                                          filter.date
                                                                      }
                                                                  </td>

                                                                  <td>
                                                                      {
                                                                          filter
                                                                              .description
                                                                              .name
                                                                      }
                                                                  </td>
                                                                  <td>
                                                                      {
                                                                          filter.check_number
                                                                      }
                                                                  </td>
                                                                  <td>
                                                                      ₱
                                                                      {
                                                                          filter.amount
                                                                      }
                                                                  </td>
                                                                  <td>
                                                                      ₱
                                                                      {
                                                                          filter.payment
                                                                      }
                                                                  </td>
                                                                  <td>
                                                                      {filter.balance ===
                                                                      0
                                                                          ? "Paid"
                                                                          : `₱ ${filter.balance}`}
                                                                  </td>
                                                                  <td>
                                                                      {
                                                                          filter.date_paid
                                                                      }
                                                                  </td>
                                                              </tr>
                                                          )
                                                      )}
                                            </tbody>
                                        </table>
                                    </div>
                                </div>
                                <div
                                    className='tab-pane fade'
                                    id='pills-profile'
                                    role='tabpanel'
                                    aria-labelledby='pills-profile-tab'>
                                    <div className='table-responsive'>
                                        <table className='table'>
                                            <thead className='text-center'>
                                                <tr>
                                                    <th scope='col'>Date</th>

                                                    <th scope='col'>
                                                        Description
                                                    </th>
                                                    <th scope='col'>
                                                        Check Number
                                                    </th>
                                                    <th scope='col'>Amount</th>
                                                    <th scope='col'>Payment</th>
                                                    <th scope='col'>Balance</th>
                                                    <th scope='col'>Action</th>
                                                </tr>
                                            </thead>
                                            <tbody className='text-center'>
                                                {filterUnpaid()?.map(
                                                    (filter) => (
                                                        <tr key={filter.id}>
                                                            <td>
                                                                {filter.date}
                                                            </td>

                                                            <td>
                                                                {
                                                                    filter
                                                                        .description
                                                                        .name
                                                                }
                                                            </td>
                                                            <td>
                                                                {
                                                                    filter.check_number
                                                                }
                                                            </td>
                                                            <td>
                                                                ₱{filter.amount}
                                                            </td>
                                                            <td>
                                                                ₱
                                                                {filter.payment}
                                                            </td>
                                                            <td>
                                                                {filter.balance ===
                                                                0
                                                                    ? "Paid"
                                                                    : `₱ ${filter.balance}`}
                                                            </td>
                                                            <td>
                                                                <button
                                                                    onClick={() =>
                                                                        handleEditPayment(
                                                                            filter.id
                                                                        )
                                                                    }
                                                                    data-bs-toggle='modal'
                                                                    data-bs-target='#updatePaymentModal'
                                                                    type='button'
                                                                    className='btn btn-secondary'>
                                                                    Update
                                                                </button>
                                                            </td>
                                                        </tr>
                                                    )
                                                )}
                                            </tbody>
                                        </table>
                                    </div>
                                    <div className='viewPatient__unpaidFooter'>
                                        <p>
                                            Total Balance:&nbsp; ₱
                                            {totalBalance()}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                {/* /.card-body */}
            </div>
        </div>
    );
}

export default ViewPatient;
