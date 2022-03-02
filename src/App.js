import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
    selectUser,
    selectToken,
    setActiveUser,
    setUserLogoutState,
    setToken,
} from "./features/userSlice";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";
import Login from "./components/Login";
import Signup from "./components/Signup";
import Patients from "./components/Patients";
import Appointments from "./components/Appointments";
import ViewPatient from "./components/ViewPatient";
import GeneratePayment from "./components/GeneratePayment";
import ManageSecretary from "./components/ManageSecretary";
import ProcessPayments from "./components/ProcessPayments";
import Sales from "./components/Sales";
import CreateSecretaryAccount from "./components/CreateSecretaryAccount";
import Header from "./components/Header";
import SideNav from "./components/SideNav";
import ViewPatientContainer from "./components/ViewPatientContainer";
import Home from "./components/Home";
import TreatmentsContainer from "./components/TreatmentsContainer";
import GenerateLetterContainer from "./components/GenerateLetterContainer";
import CreateSecretaryAccountContainer from "./components/CreateSecretaryAccountContainer";
import AppointmentsContainer from "./components/AppointmentsContainer";
import ProcessPaymentsContainer from "./components/ProcessPaymentsContainer";
import SalesContainer from "./components/SalesContainer";
//axios
import axios from "./axios";

function App() {
    const token = useSelector(selectToken);
    const dispatch = useDispatch();

    useEffect(() => {
        let isMounted = true;

        if (localStorage.getItem("token")) {
            if (isMounted) {
                axios
                    .get("/auth/me", {
                        headers: {
                            Authorization: `Token ${localStorage.getItem(
                                "token"
                            )}`,
                        },
                    })
                    .then((response) => {
                        console.log("User is: ", response.data);
                        dispatch(
                            setActiveUser({
                                user: response.data,
                            })
                        );
                    });
            }
        } else {
            return () => {
                isMounted = false;
            };
        }
    }, [dispatch]);

    return (
        <Router>
            <>
                {!token ? (
                    <Routes>
                        <Route path='/' element={<Login />} />
                        <Route path='/login' element={<Login />} />
                        <Route path='/signup' element={<Signup />} />
                    </Routes>
                ) : (
                    <div className='app'>
                        {" "}
                        <Header />
                        <SideNav />
                        <Routes>
                            <Route path='/' element={<Home />} />
                            <Route path='/patients' element={<Home />} />
                            <Route
                                path='/view-patient/:id'
                                element={<ViewPatientContainer />}
                            />
                            <Route
                                path='/treatments'
                                element={<TreatmentsContainer />}
                            />
                            <Route
                                path='/generate-letter'
                                element={<GenerateLetterContainer />}
                            />
                            <Route
                                path='/create-secretary-account'
                                element={<CreateSecretaryAccountContainer />}
                            />
                            <Route
                                path='/appointments'
                                element={<AppointmentsContainer />}
                            />
                            <Route
                                path='/payment'
                                element={<ProcessPaymentsContainer />}
                            />
                            <Route path='/sales' element={<SalesContainer />} />
                        </Routes>
                    </div>
                )}
            </>
        </Router>
    );
}

export default App;
