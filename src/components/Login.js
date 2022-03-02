import React, { useEffect, useState } from "react";
import "../css/Login.css";
import { Link, useNavigate } from "react-router-dom";
import axios from "../axios";
import { useDispatch } from "react-redux";
import { setToken, setActiveUser } from "../features/userSlice";

function Login() {
    const dispatch = useDispatch();
    let navigate = useNavigate();
    const [accounts, setAccounts] = useState([]);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [pattern, setPattern] = useState(
        new RegExp(
            /^(("[\w-\s]+")|([\w-]+(?:\.[\w-]+)*)|("[\w-\s]+")([\w-]+(?:\.[\w-]+)*))(@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$)|(@\[?((25[0-5]\.|2[0-4][0-9]\.|1[0-9]{2}\.|[0-9]{1,2}\.))((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\.){2}(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\]?$)/i
        )
    );

    useEffect(() => {
        axios.get("/auth/users/").then((res) => {
            console.log(res.data);
            setAccounts(res.data);
        });
    }, []);

    

    const handleLogin = (e) => {
        e.preventDefault();
        if (email === "" || password === "") {
            setError("Fill all the fields");
        } else if (!pattern.test(email)) {
            setError("Invalid Email");
        } else {
            axios
                .post("/api/v1/token/login/", {
                    email: email,
                    password: password,
                })
                .then((res) => {
                    console.log(res.data);
                    dispatch(
                        setToken({
                            token: res.data.auth_token,
                        })
                    );
                    localStorage.setItem("token", res.data.auth_token);

                    axios
                        .get("/auth/me", {
                            headers: {
                                Authorization: `Token ${res.data.auth_token}`,
                            },
                        })
                        .then((response) => {
                            console.log(response.data);
                            localStorage.setItem("user", response.data);
                            dispatch(
                                setActiveUser({
                                    user: response.data,
                                })
                            );
                        });
                    navigate("/");
                })

                .catch((error) => {
                    console.log('error in login: ',error)
                    setError("Invalid Credentials");
                });
        }
    };

    return (
        <div className='container'>
            <form className='was-validated'>
                <p className='text-center'>{error}</p>
                <h1 className='text-center'>Login</h1>

                <div className='mb-3'>
                    <label className='form-label'>Email address</label>
                    <input
                        type='email'
                        className='form-control'
                        onChange={(e) => setEmail(e.target.value)}
                        value={email}
                        required
                    />
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

                <button
                    onClick={handleLogin}
                    type='submit'
                    className='btn btn-primary'>
                    Login
                </button>
                {accounts?.length == 0 ? (
                    <small>
                        Don't have an Account?
                        <span>
                            <Link to='/signup'>signup</Link>
                        </span>
                    </small>
                ) : (
                    ""
                )}
            </form>
        </div>
    );
}

export default Login;
