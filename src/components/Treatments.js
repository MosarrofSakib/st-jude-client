import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "../axios";
import swal from "sweetalert";

function Treatments() {
    const navigate = useNavigate();
    const [name, setName] = useState("");
    const [searchName, setSearchName] = useState("");
    const [treatments, setTreatments] = useState([]);
    const [editName, setEditName] = useState("");
    const [nameId, setNameId] = useState("");

    useEffect(() => {
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

    const handleEditTreatment = () => {
        console.log(nameId);
        console.log(editName);
        axios
            .put(
                `/api/treatments/${nameId}/`,
                { name: editName },
                {
                    headers: {
                        Authorization: `Token ${localStorage.getItem("token")}`,
                    },
                }
            )
            .then((res) => {
                swal("Success", ` Edit Successfull`, "success").then(
                    setTimeout(() => {
                        window.location.reload(false);
                    }, 1000)
                );
            });
    };

    const handleEditName = (id) => {
        axios
            .get(`/api/treatments/${id}/`, {
                headers: {
                    Authorization: `Token ${localStorage.getItem("token")}`,
                },
            })
            .then((res) => {
                console.log(res.data);
                setEditName(res.data.name);
                setNameId(res.data.id);
            });
    };

    const handleAddTreatment = (e) => {
        e.preventDefault();
        if (name === "") {
            swal("Error", "Add Treatment Name", "warning");
        } else {
            const form = {
                name: name.toLowerCase(),
            };

            axios
                .post("/api/treatments/", form, {
                    headers: {
                        Authorization: `Token ${localStorage.getItem("token")}`,
                    },
                })
                .then((res) => {
                    swal(
                        "Success",
                        `Treatment Added Successful`,
                        "success"
                    ).then(
                        setTimeout(() => {
                            window.location.reload(false);
                        }, 1300)
                    );
                });
        }
    };

    const filterNames = () => {
        return treatments.filter((treatment) => {
            return treatment.name === searchName.toLowerCase();
        });
    };

    const handleDeleteTreatment = (id, name) => {
        axios
            .delete(`/api/treatments/${id}/`, {
                headers: {
                    Authorization: `Token ${localStorage.getItem("token")}`,
                },
            })
            .then((res) => {
                swal("Success", `${name} Deleted Successfull`, "success").then(
                    setTimeout(() => {
                        window.location.reload(false);
                    }, 2000)
                );
            });
    };
    return (
        <div className='card patients__card'>
            <div
                className='modal fade'
                id='addPatientModal'
                tabIndex='-1'
                aria-hidden='true'>
                <div className='modal-dialog'>
                    <div className='modal-content'>
                        <div className='modal-header'>
                            <h5 className='modal-title'>Add Treatment</h5>
                            <button
                                type='button'
                                className='btn-close'
                                data-bs-dismiss='modal'
                                aria-label='Close'></button>
                        </div>
                        <div className='modal-body'>
                            <form className='patients__form was-validated'>
                                <div className='mb-3'>
                                    <label className='form-label'>Name</label>
                                    <input
                                        type='text'
                                        className='form-control'
                                        onChange={(e) =>
                                            setName(e.target.value)
                                        }
                                        value={name}
                                        required
                                    />
                                </div>

                                <button
                                    onClick={handleAddTreatment}
                                    type='submit'
                                    className='btn btn-primary treatments__submit'
                                    data-bs-dismiss='modal'>
                                    Submit
                                </button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
            {/* Edit Modal */}
            <div
                className='modal fade'
                id='editTreatmentModal'
                tabIndex='-1'
                aria-hidden='true'>
                <div className='modal-dialog'>
                    <div className='modal-content'>
                        <div className='modal-header'>
                            <h5 className='modal-title'>Edit Treatment</h5>
                            <button
                                type='button'
                                className='btn-close'
                                data-bs-dismiss='modal'
                                aria-label='Close'></button>
                        </div>
                        <div className='modal-body'>
                            <div className='mb-3'>
                                <label className='form-label'>Name</label>
                                <input
                                    type='text'
                                    className='form-control'
                                    onChange={(e) =>
                                        setEditName(e.target.value)
                                    }
                                    value={editName}
                                    required
                                />
                            </div>

                            <button
                                onClick={() =>
                                    handleEditTreatment(
                                        editName.id,
                                        editName.name
                                    )
                                }
                                type='button'
                                className='btn btn-primary treatments__submit'>
                                Edit
                            </button>
                        </div>
                    </div>
                </div>
            </div>
            <div className='card-header'>
                <h3 className='card-title'>Treatments</h3>
                <div className='card-tools'>
                    <ul className='nav nav-pills ml-auto'>
                        <li className='nav-item'>
                            <input
                                type='text'
                                class='form-control'
                                placeholder='Search by Name'
                                onChange={(e) => setSearchName(e.target.value)}
                                value={searchName}
                            />
                        </li>{" "}
                        &nbsp;
                        <li className='nav-item'>
                            <button
                                className='btn btn-primary'
                                data-bs-toggle='modal'
                                data-bs-target='#addPatientModal'>
                                Add Treatment
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
                                    <th scope='col'>Name</th>

                                    <th scope='col'>Actions</th>
                                </tr>
                            </thead>
                            <tbody className='text-center'>
                                {!searchName ? (
                                    <>
                                        {treatments.map((treatment) => (
                                            <tr key={treatment.id}>
                                                <td>{treatment.name}</td>
                                                <td>
                                                    <button
                                                        onClick={() =>
                                                            handleEditName(
                                                                treatment.id
                                                            )
                                                        }
                                                        data-bs-toggle='modal'
                                                        data-bs-target='#editTreatmentModal'
                                                        type='button'
                                                        className='btn btn-success'>
                                                        Edit Treatment
                                                    </button>{" "}
                                                    &nbsp;
                                                    <button
                                                        onClick={() =>
                                                            handleDeleteTreatment(
                                                                treatment.id,
                                                                treatment.first_name
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
                                        {filterNames().map((treatment) => (
                                            <tr key={treatment.id}>
                                                <td>{treatment.name}</td>
                                                <td>
                                                    <button
                                                        type='button'
                                                        className='btn btn-success'>
                                                        View Treatment
                                                    </button>
                                                    &nbsp;
                                                    <button
                                                        onClick={() =>
                                                            handleDeleteTreatment(
                                                                treatment.id,
                                                                treatment.first_name
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
    );
}

export default Treatments;
