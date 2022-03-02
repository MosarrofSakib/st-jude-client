import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "../css/Signup.css";
import axios from "../axios";
import swal from "sweetalert";

function CreateSecretaryAccount() {
    let navigate = useNavigate();
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [secretary, setSecretary] = useState(true);
    const [error, setError] = useState("");
    const [pattern, setPattern] = useState(
        new RegExp(
            /^(("[\w-\s]+")|([\w-]+(?:\.[\w-]+)*)|("[\w-\s]+")([\w-]+(?:\.[\w-]+)*))(@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$)|(@\[?((25[0-5]\.|2[0-4][0-9]\.|1[0-9]{2}\.|[0-9]{1,2}\.))((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\.){2}(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\]?$)/i
        )
    );

    const Signup = (e) => {
        e.preventDefault();

        if (
            firstName === "" ||
            lastName === "" ||
            email === "" ||
            password === "" ||
            confirmPassword === ""
        ) {
            swal("Error", `Fill All the Fields`, "error").then(
                setTimeout(() => {
                    window.location.reload(false);
                }, 1000)
            );
        } else if (password.length < 8 || confirmPassword < 8) {
            // setError("Fill all the fields");
            swal("Error", `Password must atleast 8 characters`, "error").then(
                setTimeout(() => {
                    window.location.reload(false);
                }, 1000)
            );
        } else if (password !== confirmPassword) {
            // setError("Password does not match");
            swal("Error", `Password does not match`, "error").then(
                setTimeout(() => {
                    window.location.reload(false);
                }, 1000)
            );
        } else if (!pattern.test(email)) {
            // setError("Invalid Email");
            swal("Error", `Invalid Email`, "error").then(
                setTimeout(() => {
                    window.location.reload(false);
                }, 1000)
            );
        } else {
            axios
                .post("/auth/register", {
                    first_name: firstName,
                    last_name: lastName,
                    email: email,
                    password: password,
                    re_password: confirmPassword,
                    is_secretary: secretary,
                })
                .then((res) => {
                    axios
                        .post(
                            `/auth/user-email-and-password/`,
                            {
                                email: email,
                                password: password,
                                is_secretary: true,
                            },
                            {
                                Headers: {
                                    Authorization: `Token ${localStorage.getItem(
                                        "token"
                                    )}`,
                                },
                            }
                        )
                        .then((res) => {
                            console.log(
                                "Adding to UserAccountEmailAndPassword Success"
                            );
                        })
                        .catch((error) =>
                            console.log(
                                "error in adding to useraccount email and password"
                            )
                        );
                    swal("Success", ` Edit Successfull`, "success").then(
                        setTimeout(() => {
                            window.location.reload(false);
                        }, 1000)
                    );

                    navigate("/create-secretary-account");
                })
                .catch((err) => {
                    console.log(err);
                    setError("Email Already Exist");
                });
        }
    };

    return (
        <div className='container '>
            <form className='was-validated createSecretaryAccount__form'>
                <p className='text-center'>{error}</p>
                <h1 className='text-center'>Sign Up</h1>
                <div className='mb-3'>
                    <label className='form-label'>First Name</label>
                    <input
                        type='text'
                        className='form-control'
                        onChange={(e) => setFirstName(e.target.value)}
                        value={firstName}
                        required
                    />
                </div>
                <div className='mb-3'>
                    <label className='form-label'>Last Name</label>
                    <input
                        type='text'
                        className='form-control'
                        onChange={(e) => setLastName(e.target.value)}
                        value={lastName}
                        required
                    />
                </div>
                <div className='mb-3'>
                    <label className='form-label'>Email address</label>
                    <input
                        type='email'
                        className='form-control is-valid'
                        onChange={(e) => setEmail(e.target.value)}
                        value={email}
                        placeholder='Ex. user@gmail.com'
                        pattern='.+@gmail\.com'
                        required
                    />
                    <div id='email-validation' className='invalid-feedback'>
                        Please Check Mail again
                    </div>
                </div>
                <div className='mb-3'>
                    <label className='form-label'>Password</label>
                    <input
                        type='password'
                        className='form-control'
                        onChange={(e) => setPassword(e.target.value)}
                        value={password}
                        required
                    />
                </div>
                <div className='mb-3'>
                    <label className='form-label'>Confirm Password</label>
                    <input
                        type='password'
                        className='form-control'
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        value={confirmPassword}
                        required
                    />
                </div>

                <button
                    onClick={Signup}
                    type='submit'
                    className='btn btn-primary'>
                    Sign Up
                </button>
            </form>
        </div>
    );
}

export default CreateSecretaryAccount;
