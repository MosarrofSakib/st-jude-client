import React, { useEffect, useState } from "react";
import "../css/ProcessPayments.css";
import Select from "react-select";
import axios from "../axios";
import swal from "sweetalert";
import { useNavigate } from "react-router-dom";

function ProcessPayments() {
    const todaysDate = new Date();
    let navigate = useNavigate();
    const DateToday = () => {
        let d = new Date(todaysDate);
        let month = "" + (d.getMonth() + 1);
        let day = "" + d.getDate();
        let year = d.getFullYear();

        if (month.length < 2) {
            month = "0" + month;
        }
        if (day.length < 2) {
            day = "0" + day;
        }
        return [year, month, day].join("-");
    };
    const [dateToday, setDateToday] = useState(DateToday());
    const [description, setDescription] = useState("");
    const [treatments, setTreatments] = useState([]);
    const [checkNumber, setCheckNumber] = useState("");
    const [amount, setAmount] = useState(0);
    const [payment, setPayment] = useState(0);
    const [datePaid, setDatePaid] = useState(null);

    const [patients, setPatients] = useState([]);
    const [patient, setPatient] = useState("");

    // options for select
    let patientsOptions = patients.map((patient) => ({
        value: patient.id,
        label: patient.first_name + " " + patient.last_name,
    }));
    let treatmentsOptions = treatments.map((treatment) => ({
        value: treatment.id,
        label: treatment.name,
    }));
    useEffect(() => {
        axios
            .get("/api/patients", {
                headers: {
                    Authorization: `Token ${localStorage.getItem("token")}`,
                },
            })
            .then((res) => {
                setPatients(res.data);
            });

        axios
            .get("/api/treatments", {
                headers: {
                    Authorization: `Token ${localStorage.getItem("token")}`,
                },
            })
            .then((res) => {
                setTreatments(res.data);
            });
    }, []);

    const automaticBalance = (amount, payment) => {
        return amount - payment;
    };

    const handleProcessPayment = (e) => {
        e.preventDefault();
        if (patient === "" || description === "") {
            swal("Error", "Fill all the fields", "warning");
        } else if (
            automaticBalance(amount, payment) === 0 &&
            datePaid === null
        ) {
            swal("Error", "Set Date Paid", "warning");
        } else {
            const form = {
                patient: patient,
                description: description,
                date: dateToday,
                check_number: checkNumber,
                amount: amount,
                payment: payment,
                balance: automaticBalance(amount, payment),
                date_paid: datePaid,
            };

            axios
                .post("/api/payments/", form, {
                    headers: {
                        Authorization: `Token ${localStorage.getItem("token")}`,
                    },
                })
                .then((res) => {
                    swal(
                        "Success",
                        `Process Payment Successful`,
                        "success"
                    ).then(
                        setTimeout(() => {
                            navigate(`/view-patient/${patient}`);
                        }, 1300)
                    );
                });
        }
    };

    const [balance, setBalance] = useState(automaticBalance(amount, payment));
    console.log("Update balance: ", balance);
    return (
        <div className='container processPayments__container'>
            <div className='row processPayments__row1 '>
                <div className='col-12 processPayments__col1'>
                    <form>
                        <div className='mb-3'>
                            <label className='form-label'>Date</label>
                            <input
                                type='date'
                                className='form-control'
                                onChange={(e) => setDateToday(e.target.value)}
                                value={dateToday}
                                required
                            />
                        </div>
                        <div className='mb-3'>
                            <label className='form-label'>Patient</label>
                            <Select
                                label='Select Patients'
                                options={patientsOptions}
                                onChange={(e) => setPatient(e.value)}
                            />
                        </div>
                        <div className='mb-3'>
                            <label className='form-label'>Description</label>
                            <Select
                                options={treatmentsOptions}
                                onChange={(e) => setDescription(e.value)}
                            />
                        </div>
                        <div className='mb-3'>
                            <label className='form-label'>Check Number</label>
                            <input
                                type='text'
                                className='form-control'
                                onChange={(e) => setCheckNumber(e.target.value)}
                                value={checkNumber}
                                required
                            />
                        </div>
                        <div className='mb-3'>
                            <label className='form-label'>Amount</label>
                            <input
                                type='number'
                                className='form-control'
                                onChange={(e) => {
                                    setAmount(e.target.value);
                                }}
                                value={amount}
                                required
                            />
                        </div>
                        <div className='mb-3'>
                            <label className='form-label'>Payment</label>
                            <input
                                type='number'
                                className='form-control'
                                onChange={(e) => {
                                    setPayment(e.target.value);
                                }}
                                value={payment}
                                required
                            />
                        </div>
                        <div className='mb-3'>
                            <label className='form-label'>Balance</label>
                            <input
                                type='number'
                                className='form-control'
                                onChange={(e) => setBalance(e.target.value)}
                                value={automaticBalance(amount, payment)}
                                required
                            />
                        </div>
                        <div className='mb-3'>
                            <label className='form-label'>Date Paid</label>
                            <input
                                type='date'
                                className='form-control'
                                onChange={(e) => setDatePaid(e.target.value)}
                                value={datePaid}
                            />
                        </div>

                        <button
                            onClick={handleProcessPayment}
                            type='submit'
                            className='btn btn-primary'>
                            Process Payment
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default ProcessPayments;
