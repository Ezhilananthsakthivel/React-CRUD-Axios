import React, { useEffect, useState } from "react";

const url = " https://www.mecallapi.com/api/users"

const formInitial = {
    fname: "",
    lname: "",
    username: "",
    password: "",
    email: "",
    avatar: "",
};

function Users() {
    const [loading, setLoading] = useState(true)
    const [users, setUsers] = useState([])
    const [user, setUser] = useState(formInitial)

    const handleChange = ({ target: { name, value } }) => {
        setUser({ ...user, [name]: value })
    }

    const handleSubmit = (evt) => {
        evt.preventDefault();
        { user.id ? updateUsers() : createUser() }
    }

    //get users
    const getUsers = async () => {

        try {
            const response = await (await fetch(url)).json()
            setLoading(false)
            setUsers(response)
        }
        catch {
            console.error("error")
        }


    }

    //craete user
    const createUser = async () => {
        try {
            let response = await fetch("https://www.mecallapi.com/api/users/create", {
                method: "POST",
                body: JSON.stringify(user),
                headers: { "Content-Type": "application/json" },
            });
            if (!response.ok) {
                throw new Error("Request failed");
            }
            getUsers();
            setUser(formInitial)
        } catch (err) {
            console.error(err.message);
        }

    }

    //update users
    const updateUsers = async () => {
        try {
            let response = await fetch("https://www.mecallapi.com/api/users/update", {
                method: "PUT",
                body: JSON.stringify(user),
                headers: { "Content-Type": "application/json" },
            });
            if (!response.ok) {
                throw new Error("Request failed");
            }
            getUsers();
            setUser(formInitial)
        } catch (err) {
            console.error(err.message);
        }

    }



    //delete users
    const deleteUsers = async ({ fname, lname, id }) => {
        if (
            window.confirm(`Are you sure want to delete user - ${fname} ${lname} ?`)
        ) {
            try {
                let response = await fetch("https://www.mecallapi.com/api/users/delete",
                    {
                        method: "DELETE",
                        body: JSON.stringify({ id }),
                        headers: { "Content-Type": "application/json" },
                    }
                );
                if (!response.ok) {
                    throw new Error("Request failed");
                }
                alert("User Deleted Successfully!");
                getUsers();
            } catch (err) {
                console.error(err.message);
            }
        }

    }



    useEffect(() => {

        getUsers()
    })


    return (
        <div className="container-fulid">
            <div className="row">
                <input type="text" className="form-control" />
                <h1>Users</h1>
                <div className="col-7">
                    <div className="card">
                        <div className="card-body">
                            <table className="table">
                                <thead>
                                    <tr>
                                        <th>#</th>
                                        <th>avatar</th>
                                        <th>firstname</th>
                                        <th>lastname</th>
                                        <th>email</th>
                                        <th>actions</th>

                                    </tr>
                                </thead>
                                <tbody>
                                    {loading && (<button className="btn btn-primary" type="button" disabled>
                                        <span className="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
                                        Loading...
                                    </button>)}

                                    {users.map((u) => {
                                        return (
                                            <tr key={u.id}>
                                                <td>{u.id}</td>
                                                <td><img src={u.avatar} width="50px" className="avatar" /></td>
                                                <td>{u.fname}</td>
                                                <td>{u.lname}</td>
                                                <td>{u.username}</td>
                                                <td>
                                                    <button onClick={() => setUser({ ...u, email: u.username })}>edit</button>
                                                    <button onClick={() => deleteUsers(u)}>delete</button>
                                                </td>
                                            </tr>
                                        )
                                    })}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
                <div className="col-5">
                    <div className="card">
                        <div className="card-body">
                            <form onSubmit={handleSubmit}>
                                <div className="form-group"><label htmlFor="fname">firstname:</label>
                                    <input name="fname" type="text" className="form-control" value={user.fname} onChange={handleChange} />
                                </div>
                                <div className="form-group"><label htmlFor="lname">lastname:</label>
                                    <input name="lname" type="text" className="form-control" value={user.lname} onChange={handleChange} />
                                </div>
                                <div className="form-group"><label htmlFor="username">username:</label>
                                    <input name="username" type="text" className="form-control" value={user.username} onChange={handleChange} />
                                </div>
                                <div className="form-group"><label htmlFor="email">email:</label>
                                    <input name="email" type="text" className="form-control" value={user.email} onChange={handleChange} />
                                </div>
                                <div className="form-group"><label htmlFor="avatar">avatar:</label>
                                    <input name="avatar" type="text" className="form-control" value={user.avatar} onChange={handleChange} />
                                </div><br />
                                <div>
                                    <button className="btn btn-success">
                                        {user.id ? "update" : "create"}</button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )

}

export default Users;



