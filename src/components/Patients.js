import React, { useEffect, useState } from "react";
import "../css/Patients.css";
import { useNavigate } from "react-router-dom";
import axios from "../axios";
import swal from "sweetalert";

function Patients() {
    const navigate = useNavigate();
    const [patients, setPatients] = useState([]);
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [address, setAddress] = useState("");
    const [telephone, setTelephone] = useState(0);
    const [age, setAge] = useState(0);
    const [occupation, setOccupation] = useState("");
    const [status, setStatus] = useState("");
    const [complaint, setComplaint] = useState("");
    const [dateWalkIn, setDateWalkIn] = useState("");
    const [searchName, setSearchName] = useState("");

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
    }, []);

    const filterNames = () => {
        return patients.filter((patient) => {
            return patient.first_name === searchName.toLowerCase();
        });
    };
    const handleAddPatient = (e) => {
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

        if (
            firstName === "" ||
            lastName === "" ||
            address === "" ||
            telephone === "" ||
            age === "" ||
            occupation === "" ||
            status === "" ||
            complaint === "" ||
            dateWalkIn === ""
        ) {
            swal("Error", "Fill all the Fields", "warning");
        } else {
            axios
                .post("api/patients/", form, {
                    headers: {
                        Authorization: `Token ${localStorage.getItem("token")}`,
                    },
                })
                .then((res) => {
                    swal("Success", `Patient Added Successful`, "success").then(
                        setTimeout(() => {
                            window.location.reload(false);
                        }, 1300)
                    );
                    setFirstName("");
                    setLastName("");
                    setAddress("");
                    setTelephone("");
                    setAge("");
                    setOccupation("");
                    setStatus("");
                    setComplaint("");
                    setDateWalkIn("");
                });
        }
    };

    const handleDeletePatient = (id, firstName) => {
        axios
            .delete(`/api/patients/${id}/`, {
                headers: {
                    Authorization: `Token ${localStorage.getItem("token")}`,
                },
            })
            .then((res) => {
                swal(
                    "Success",
                    `${firstName} Deleted Successfull`,
                    "success"
                ).then(
                    setTimeout(() => {
                        window.location.reload(false);
                    }, 2000)
                );
            });
    };
    return (
        <div>
            <div
                className='modal fade'
                id='addPatientModal'
                tabIndex='-1'
                aria-hidden='true'>
                <div className='modal-dialog'>
                    <div className='modal-content'>
                        <div className='modal-header'>
                            <h5 className='modal-title'>Add Patient</h5>
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
                                    onClick={handleAddPatient}
                                    type='submit'
                                    className='btn btn-primary patients__submit'
                                    data-bs-dismiss='modal'>
                                    Submit
                                </button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>{" "}
            <div className='card patients__card'>
                <div className='card-header'>
                    <h3 className='card-title'>Patients</h3>
                    <div className='card-tools'>
                        <ul className='nav nav-pills ml-auto'>
                            <li className='nav-item'>
                                <input
                                    type='text'
                                    className='form-control'
                                    placeholder='Search by Name'
                                    onChange={(e) =>
                                        setSearchName(e.target.value)
                                    }
                                    value={searchName}
                                />
                            </li>{" "}
                            &nbsp;
                            <li className='nav-item'>
                                <button
                                    className='btn btn-primary'
                                    data-bs-toggle='modal'
                                    data-bs-target='#addPatientModal'>
                                    Add Patient
                                </button>
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

                                        <th scope='col'>Actions</th>
                                    </tr>
                                </thead>
                                <tbody className='text-center'>
                                    {!searchName ? (
                                        <>
                                            {patients.map((patient) => (
                                                <tr key={patient.id}>
                                                    <td>
                                                        {patient.first_name}{" "}
                                                        {patient.last_name}
                                                    </td>
                                                    <td>
                                                        <button
                                                            onClick={() =>
                                                                navigate(
                                                                    `/view-patient/${patient.id}`
                                                                )
                                                            }
                                                            type='button'
                                                            className='btn btn-success'>
                                                            View
                                                        </button>
                                                        &nbsp;
                                                        <button
                                                            onClick={() =>
                                                                handleDeletePatient(
                                                                    patient.id,
                                                                    patient.first_name
                                                                )
                                                            }
                                                            type='button'
                                                            className='btn btn-danger'>
                                                            Delete
                                                        </button>
                                                    </td>
                                                </tr>
                                            ))}
                                        </>
                                    ) : (
                                        <>
                                            {filterNames().map((patient) => (
                                                <tr key={patient.id}>
                                                    <td>
                                                        {patient.first_name}{" "}
                                                        {patient.last_name}
                                                    </td>
                                                    <td>
                                                        <button
                                                            type='button'
                                                            className='btn btn-success'>
                                                            View Patient
                                                        </button>
                                                        &nbsp;
                                                        <button
                                                            onClick={() =>
                                                                handleDeletePatient(
                                                                    patient.id,
                                                                    patient.first_name
                                                                )
                                                            }
                                                            type='button'
                                                            className='btn btn-danger'>
                                                            Delete Patient
                                                        </button>
                                                    </td>
                                                </tr>
                                            ))}
                                        </>
                                    )}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
                {/* /.card-body */}
            </div>
        </div>
    );
}

export default Patients;
