import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

function CreateUser() {

    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [age, setAge] = useState("");

    const navigate = useNavigate();

    const Submit = (e) => {

        e.preventDefault();

        console.log("Sending:", {
            name: name,
            email: email,
            age: age
        });

        axios.post("http://localhost:3001/createUser", {
            name: name,
            email: email,
            age: age
        })
        .then(result => {

            console.log("Success:", result.data);

            navigate("/");

        })
        .catch(err => {

            console.log("Error:", err);

        });

    };

    return (
        <div className="d-flex vh-100 bg-primary justify-content-center align-items-center">

            <div className="w-50 bg-white rounded p-3">

                <form onSubmit={Submit}>

                    <h2>Add User</h2>

                    <div className="mb-2">

                        <label htmlFor="name">Name</label>

                        <input
                            type="text"
                            id="name"
                            placeholder="Enter Name"
                            className="form-control"
                            onChange={(e) => setName(e.target.value)}
                            required
                        />

                    </div>


                    <div className="mb-2">

                        <label htmlFor="email">Email</label>

                        <input
                            type="email"
                            id="email"
                            placeholder="Enter Email"
                            className="form-control"
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />

                    </div>


                    <div className="mb-2">

                        <label htmlFor="age">Age</label>

                        <input
                            type="number"
                            id="age"
                            placeholder="Enter Age"
                            className="form-control"
                            onChange={(e) => setAge(e.target.value)}
                            required
                        />

                    </div>


                    <button type="submit" className="btn btn-success">
                        Submit
                    </button>

                    <Link to="/" className="btn btn-secondary ms-2">
                        Back
                    </Link>

                </form>

            </div>

        </div>
    );
}

export default CreateUser;