import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";

function UpdateUser() {

    const { id } = useParams();
    const navigate = useNavigate();

    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [age, setAge] = useState("");

    // GET USER DATA
    useEffect(() => {

        axios.get("http://localhost:3001/getUsers")
            .then(result => {

                const user = result.data.find(user => user._id === id);

                if (user) {
                    setName(user.name);
                    setEmail(user.email);
                    setAge(user.age);
                }

            })
            .catch(err => {
                console.log("Error:", err);
            });

    }, [id]);


    // UPDATE USER
    const handleUpdate = (e) => {

        e.preventDefault();

        axios.put(`http://localhost:3001/updateUser/${id}`, {
            name: name,
            email: email,
            age: age
        })
            .then(result => {

                console.log("Updated:", result.data);

                navigate("/");

            })
            .catch(err => {

                console.log("Update error:", err);

            });
    };


    return (
        <div className="d-flex vh-100 bg-primary justify-content-center align-items-center">

            <div className="w-50 bg-white rounded p-3">

                <form onSubmit={handleUpdate}>

                    <h2>Update User</h2>

                    <div className="mb-2">
                        <label>Name</label>

                        <input
                            type="text"
                            placeholder="Enter Name"
                            className="form-control"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                        />
                    </div>


                    <div className="mb-2">
                        <label>Email</label>

                        <input
                            type="email"
                            placeholder="Enter Email"
                            className="form-control"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </div>


                    <div className="mb-2">
                        <label>Age</label>

                        <input
                            type="number"
                            placeholder="Enter Age"
                            className="form-control"
                            value={age}
                            onChange={(e) => setAge(e.target.value)}
                        />
                    </div>


                    <button
                        type="submit"
                        className="btn btn-success"
                    >
                        Update
                    </button>

                </form>

            </div>

        </div>
    );
}

export default UpdateUser;