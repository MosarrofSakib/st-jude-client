import React, { useState } from "react";
import "../css/GeneratePayment.css";
import print from "print-js";
import printJS from "print-js";

function GeneratePayment() {
    const todaysDate = new Date();
    const [name, setName] = useState("");
    const [age, setAge] = useState("");
    const [resident, setResident] = useState("");
    const [dateTreated, setDateTreated] = useState("");
    const [diagnosis, setDiagnosis] = useState("");
    const [procedures, setProcedures] = useState("");

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
    const generateForm = () => {
        printJS({
            printable: "form__container",
            type: "html",
            targetStyles: ["*"],
        });
    };

    const handleData = () => {};

    return (
        <div className='container generatePayment__container'>
            <button
                type='button'
                onClick={generateForm}
                className='btn btn-primary generatePayment__generateButton'>
                Generate
            </button>
            <button
                type='button'
                data-bs-toggle='modal'
                data-bs-target='#addPatientModal'
                className='btn btn-secondary generatePayment__inputButton'>
                Input Details
            </button>
            <div id='form__container'>
                <h3 class='text-center bold-text'>ST JUDE DENTAL CLINIC</h3>
                <p class='text-center'>Malvar St Tacurong City</p>
                <p class='text-center'>Sultan Kudarat</p>
                <p class='text-center'>Tel #: 064-200-3686</p>
                <h3 class='text-center bold-text'>Dental Certificate</h3>
                <div class='dentalForm__container'>
                    <div class='dateRight'>
                        Date:&nbsp; <span>{formatDate()}</span>
                    </div>
                    <div class='toWhom bold-text'>To whom It My Concern:</div>
                    <div class='body'>
                        &nbsp;&nbsp;&nbsp; This is to certify that &nbsp;
                        {name} ,&nbsp; {age} year old, resident of {resident}
                        was <br />
                        &nbsp;&nbsp;&nbsp; examined/treated in this clinic on
                        &nbsp; {dateTreated}
                    </div>
                    <div class='findings'>
                        <p className='bold-text'>FINDINGS/DIAGNOSIS:</p>
                        <p>{diagnosis}</p>
                    </div>
                    <div class='treatment'>
                        <p className='bold-text'>TREATMENT/PROCEDURES DONE:</p>
                        <p>{procedures}</p>
                    </div>
                    <br />
                    <br />
                    <div class='dentist_container'>
                        <h6 className='bold-text'>
                            MA. JOSELA LAVALLE-DEFENSOR, D.M.D
                        </h6>

                        <p class='dentist '>Dentis</p>
                    </div>
                    <br />
                    <div class='license__contaienr'>
                        <p>License No. 0035946</p>
                        <p>PTR No. ______</p>
                    </div>
                    <br />
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
                            <h5 className='modal-title'>Enter Input Data</h5>
                            <button
                                type='button'
                                className='btn-close'
                                data-bs-dismiss='modal'
                                aria-label='Close'></button>
                        </div>
                        <div className='modal-body'>
                            {/* <form className='treatments__form was-validated'> */}
                            <div className='mb-3'>
                                <label className='form-label'>Name</label>
                                <input
                                    type='text'
                                    className='form-control'
                                    onChange={(e) => setName(e.target.value)}
                                    value={name}
                                    required
                                />
                            </div>
                            <div className='mb-3'>
                                <label className='form-label'>Age</label>
                                <input
                                    type='text'
                                    className='form-control'
                                    onChange={(e) => setAge(e.target.value)}
                                    value={age}
                                    required
                                />
                            </div>
                            <div className='mb-3'>
                                <label className='form-label'>
                                    Resident of
                                </label>
                                <input
                                    type='text'
                                    className='form-control'
                                    onChange={(e) =>
                                        setResident(e.target.value)
                                    }
                                    value={resident}
                                    required
                                />
                            </div>
                            <div className='mb-3'>
                                <label className='form-label'>
                                    Date Treated
                                </label>
                                <input
                                    type='date'
                                    className='form-control'
                                    onChange={(e) =>
                                        setDateTreated(e.target.value)
                                    }
                                    value={dateTreated}
                                    required
                                />
                            </div>
                            <div className='mb-3'>
                                <label className='form-label'>
                                    Findings/Diagnosis
                                </label>
                                <textarea
                                    className='form-control'
                                    onChange={(e) =>
                                        setDiagnosis(e.target.value)
                                    }
                                    value={diagnosis}></textarea>
                            </div>
                            <div className='mb-3'>
                                <label className='form-label'>
                                    Treatment/Procedures Done
                                </label>
                                <textarea
                                    className='form-control'
                                    onChange={(e) =>
                                        setProcedures(e.target.value)
                                    }
                                    value={procedures}></textarea>
                            </div>

                            <button
                                // onClick={handleAddTreatment}
                                type='submit'
                                className='btn btn-primary treatments__submit'
                                data-bs-dismiss='modal'>
                                Save
                            </button>
                            {/* </form> */}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default GeneratePayment;
