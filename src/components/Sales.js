import React, { useEffect, useState } from "react";
import "../css/Sales.css";
import axios from "../axios";

function Sales() {
    const todaysDate = new Date();
    const [payments, setPayments] = useState([]);

    useEffect(() => {
        axios
            .get("/api/payments", {
                headers: {
                    Authorization: `Token ${localStorage.getItem("token")}`,
                },
            })
            .then((res) => {
                console.log("Sales: ", res.data);
                setPayments(res.data);
            });
    }, []);
    const formatDate = () => {
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
    const [selectDate, setSelectDate] = useState(formatDate());

    const filterSales = () => {
        return payments.filter((payment) => {
            return payment.date === selectDate;
        });
    };

    const totalEarn = () => {
        return filterSales().reduce((currentTotal, item) => {
            return item.payment + currentTotal;
        }, 0);
    };

    function numberWithCommas(x) {
        return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    }

    return (
        <div className='card patients__card'>
            <div className='card-header'>
                <h3 className='card-title'>Sales</h3>
                <div className='card-tools'>
                    <ul className='nav nav-pills ml-auto'>
                        <li className='nav-item'>
                            <input
                                type='date'
                                className='form-control'
                                onChange={(e) => setSelectDate(e.target.value)}
                                value={selectDate}
                            />
                        </li>{" "}
                        <li className='nav-item sales__totalEarn'>
                            <p>Total: ₱{numberWithCommas(totalEarn())}</p>
                        </li>
                    </ul>
                </div>
            </div>
            {/* /.card-header */}
            <div className='card-body'>
                <div className='tab-content p-0'>
                    <div className='table-responsive'>
                        <table className='table'>
                            <thead className='text-center'>
                                <tr>
                                    <th scope='col'>Name</th>
                                    <th scope='col'>Description</th>
                                    <th scope='col'>Amount</th>
                                    <th scope='col'>Check Number</th>
                                    <th scope='col'>Payment</th>
                                    <th scope='col'>Status</th>
                                </tr>
                            </thead>
                            <tbody className='text-center'>
                                {filterSales().map((payment) => (
                                    <tr key={payment.id}>
                                        <td>
                                            {payment.patient.first_name}{" "}
                                            {payment.patient.last_name}
                                        </td>
                                        <td>{payment.description.name}</td>
                                        <td>{payment.amount}</td>
                                        <td>{payment.check_number}</td>
                                        <td>{payment.payment}</td>
                                        <td>
                                            {payment.balance === 0
                                                ? "Paid"
                                                : "Unpaid"}
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
            {/* /.card-body */}
        </div>
    );
}

export default Sales;
