import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "../css/Appointments.css";
import Select from "react-select";
import axios from "../axios";
import swal from "sweetalert";

function Appointments() {
    const navigate = useNavigate();
    const todaysDate = new Date();

    const [appointments, setAppointments] = useState([]);
    const [treatments, setTreatments] = useState([]);
    const [patients, setPatients] = useState([]);
    const [patient, setPatient] = useState("");
    const [dateAppointed, setDateAppointed] = useState("");
    const [description, setDescription] = useState("");
    const [status, setStatus] = useState("");

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
            .get("/api/appointments", {
                headers: {
                    Authorization: `Token ${localStorage.getItem("token")}`,
                },
            })
            .then((res) => {
                setAppointments(res.data);
            });

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
    // filtered appointments
    const filterAppointments = () => {
        return appointments.filter((appointment) => {
            return appointment.date_appointed === searchDate;
        });
    };
    //add treatment
    const handleAddTreatment = (e) => {
        e.preventDefault();

        if (patient === "" || dateAppointed === "" || description === "") {
            swal("Error", "Fill All Fields ", "warning");
        } else {
            const form = {
                date_appointed: dateAppointed,
                patient: patient,
                description: description,
                status: false,
            };

            axios
                .post("/api/appointments/", form, {
                    headers: {
                        Authorization: `Token ${localStorage.getItem("token")}`,
                    },
                })
                .then((res) => {
                    swal(
                        "Success",
                        `Appointment Added Successful`,
                        "success"
                    ).then(
                        setTimeout(() => {
                            window.location.reload(false);
                        }, 1300)
                    );
                });
        }
    };
    //cancel appointment
    const handleCancelAppointment = (id) => {
        axios
            .delete(`/api/appointments/${id}/`, {
                headers: {
                    Authorization: `Token ${localStorage.getItem("token")}`,
                },
            })
            .then((res) => {
                swal("Success", ` Canceled`, "success").then(
                    setTimeout(() => {
                        window.location.reload(false);
                    }, 2000)
                );
            });
    };

    // done button
    const handleDoneButton = (id) => {
        const form = {
            status: true,
        };

        axios
            .put(`/api/appointments/${id}/`, form, {
                headers: {
                    Authorization: `Token ${localStorage.getItem("token")}`,
                },
            })
            .then((res) => {
                swal("Success", ` Done`, "success").then(
                    setTimeout(() => {
                        window.location.reload(false);
                    }, 2000)
                );
            });
    };

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
    // const [searchDate, setSearchDate] = useState(formatDate());
    const [searchDate, setSearchDate] = useState();

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
                            <h5 className='modal-title'>Add Appointment</h5>
                            <button
                                type='button'
                                className='btn-close'
                                data-bs-dismiss='modal'
                                aria-label='Close'></button>
                        </div>
                        <div className='modal-body'>
                            <form className='appointments__form was-validated'>
                                <div className='mb-3'>
                                    <label className='form-label'>
                                        Patient
                                    </label>
                                    <Select
                                        label='Select Patients'
                                        options={patientsOptions}
                                        onChange={(e) => setPatient(e.value)}
                                    />
                                </div>
                                <div className='mb-3'>
                                    <label className='form-label'>Date</label>
                                    <input
                                        type='date'
                                        className='form-control'
                                        onChange={(e) =>
                                            setDateAppointed(e.target.value)
                                        }
                                        value={dateAppointed}
                                        required
                                    />
                                </div>
                                <div className='mb-3'>
                                    <label className='form-label'>
                                        Description
                                    </label>
                                    <Select
                                        options={treatmentsOptions}
                                        onChange={(e) =>
                                            setDescription(e.value)
                                        }
                                    />
                                </div>
                                <button
                                    onClick={handleAddTreatment}
                                    type='submit'
                                    className='btn btn-primary appointments__submit'
                                    data-bs-dismiss='modal'>
                                    Submit
                                </button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
            <div className='card patients__card'>
                <div className='card-header'>
                    <h3 className='card-title'>Appointments</h3>
                    <div className='card-tools'>
                        <ul className='nav nav-pills ml-auto'>
                            <li className='nav-item'>
                                <input
                                    type='date'
                                    class='form-control'
                                    placeholder='Date Appointments'
                                    onChange={(e) =>
                                        setSearchDate(e.target.value)
                                    }
                                    value={searchDate}
                                />
                            </li>{" "}
                            &nbsp;
                            <li className='nav-item'>
                                <button
                                    type='button'
                                    className='btn btn-primary'
                                    data-bs-toggle='modal'
                                    data-bs-target='#addPatientModal'>
                                    Add Appointment
                                </button>
                            </li>
                        </ul>
                    </div>
                </div>
                {/* /.card-header */}
                <div className='card-body'>
                    <div className='tab-content p-0'>
                        <div className='table-responsive'>
                            <table class='table'>
                                <thead className='text-center'>
                                    <tr>
                                        <th scope='col'>Date</th>
                                        <th scope='col'>Name</th>
                                        <th scope='col'>Phone</th>
                                        <th scope='col'>Description</th>
                                        <th scope='col'>Status</th>
                                        <th scope='col'>Action</th>
                                    </tr>
                                </thead>
                                <tbody className='text-center'>
                                    {!searchDate ? (
                                        <>
                                            {appointments?.map(
                                                (appointment) => (
                                                    <tr key={appointment.id}>
                                                        <td>
                                                            {
                                                                appointment.date_appointed
                                                            }
                                                        </td>
                                                        <td>
                                                            {
                                                                appointment
                                                                    .patient
                                                                    .first_name
                                                            }{" "}
                                                            {
                                                                appointment
                                                                    .patient
                                                                    .last_name
                                                            }{" "}
                                                        </td>
                                                        <td>
                                                            {
                                                                appointment
                                                                    .patient
                                                                    .telephone
                                                            }
                                                        </td>
                                                        <td>
                                                            {
                                                                appointment
                                                                    .description
                                                                    .name
                                                            }
                                                        </td>
                                                        <td>
                                                            {appointment.status
                                                                ? "Done"
                                                                : "Pending"}
                                                        </td>
                                                        <td>
                                                            {!appointment.status ? (
                                                                <button
                                                                    onClick={() =>
                                                                        handleDoneButton(
                                                                            appointment.id
                                                                        )
                                                                    }
                                                                    className='btn btn-success appointments__doneButton'>
                                                                    Done
                                                                </button>
                                                            ) : (
                                                                ""
                                                            )}
                                                            &nbsp;
                                                            {!appointment.status ? (
                                                                <button
                                                                    onClick={() =>
                                                                        handleCancelAppointment(
                                                                            appointment.id
                                                                        )
                                                                    }
                                                                    type='button'
                                                                    className='btn btn-danger appointments__doneButton'>
                                                                    Cancel
                                                                </button>
                                                            ) : (
                                                                <button
                                                                    onClick={() =>
                                                                        navigate(
                                                                            `/payment`
                                                                        )
                                                                    }
                                                                    className='btn btn-primary'>
                                                                    Proceed to
                                                                    Payment
                                                                </button>
                                                            )}
                                                        </td>
                                                    </tr>
                                                )
                                            )}
                                        </>
                                    ) : (
                                        <>
                                            {filterAppointments().map(
                                                (appointment) => (
                                                    <tr key={appointment.id}>
                                                        <td>
                                                            {
                                                                appointment.date_appointed
                                                            }
                                                        </td>
                                                        <td>
                                                            {
                                                                appointment
                                                                    .patient
                                                                    .first_name
                                                            }{" "}
                                                            {
                                                                appointment
                                                                    .patient
                                                                    .last_name
                                                            }{" "}
                                                        </td>
                                                        <td>
                                                            {
                                                                appointment
                                                                    .patient
                                                                    .telephone
                                                            }
                                                        </td>
                                                        <td>
                                                            {
                                                                appointment
                                                                    .description
                                                                    .name
                                                            }
                                                        </td>
                                                        <td>
                                                            {appointment.status
                                                                ? "Done"
                                                                : "Pending"}
                                                        </td>
                                                        <td>
                                                            {!appointment.status ? (
                                                                <button
                                                                    onClick={() =>
                                                                        handleDoneButton(
                                                                            appointment.id
                                                                        )
                                                                    }
                                                                    className='btn btn-success appointments__doneButton'>
                                                                    Done
                                                                </button>
                                                            ) : (
                                                                ""
                                                            )}
                                                            &nbsp;
                                                            {!appointment.status ? (
                                                                <button
                                                                    onClick={() =>
                                                                        handleCancelAppointment(
                                                                            appointment.id
                                                                        )
                                                                    }
                                                                    type='button'
                                                                    className='btn btn-danger appointments__doneButton'>
                                                                    Cancel
                                                                </button>
                                                            ) : (
                                                                <button
                                                                    onClick={() =>
                                                                        navigate(
                                                                            `/payment`
                                                                        )
                                                                    }
                                                                    className='btn btn-primary'>
                                                                    Proceed to
                                                                    Payment
                                                                </button>
                                                            )}
                                                        </td>
                                                    </tr>
                                                )
                                            )}
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

export default Appointments;
