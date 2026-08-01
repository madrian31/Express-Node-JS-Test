import { useEffect, useState } from "react";

function App() {
    const [users, setUsers] = useState([]);
    const [name, setName] = useState("");
    const [age, setAge] = useState("");

    const [editingUserId, setEditingUserId] = useState(null);

    const startEditingUser = (user) => {
        setEditingUserId(user.id);
        setName(user.name);
        setAge(user.age);
    };

    const saveUser = () => {
        if (editingUserId) {
            updateUser(editingUserId);
            setEditingUserId(null);
        } else {
            createUser();
        }
    };

    // =========================
    // READ - GET
    // =========================

    const getUsers = () => {
        fetch("http://localhost:5000/api/users")
            .then((response) => response.json())
            .then((data) => {
                setUsers(data);
            });
    };

    // Load users when page opens
    useEffect(() => {
        getUsers();
    }, []);

    // =========================
    // CREATE - POST
    // =========================

    const createUser = () => {
        fetch("http://localhost:5000/api/users", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                name: name,
                age: age
            })
        })
            .then((response) => response.json())
            .then((data) => {
                console.log("Created:", data);

                setName("");
                setAge("");

                getUsers();
            });
    };

    // =========================
    // UPDATE - PUT
    // =========================

    const updateUser = (id) => {
        fetch(`http://localhost:5000/api/users/${id}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                name: name,
                age: age
            })
        })
            .then((response) => response.json())
            .then((data) => {
                console.log("Updated:", data);

                setName("");
                setAge("");

                getUsers();
            });
    };

    // =========================
    // DELETE - DELETE
    // =========================

    const deleteUser = (id) => {
        fetch(`http://localhost:5000/api/users/${id}`, {
            method: "DELETE"
        })
            .then((response) => response.json())
            .then((data) => {
                console.log("Deleted:", data);

                getUsers();
            });
    };

    return (
        <div>
            <h1>User CRUD</h1>

            <input
                type="text"
                placeholder="Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
            />

            <input
                type="number"
                placeholder="Age"
                value={age}
                onChange={(e) => setAge(e.target.value)}
            />

            <button onClick={saveUser}>
                {editingUserId ? "Update User" : "Add User"}
            </button>

            <hr />

            <h2>Users</h2>

            {users.map((user) => (
                <div key={user.id}>
                    <p>
                        {user.id}. {user.name} - {user.age} years old
                    </p>

                    <button onClick={() => updateUser(user.id)}>
                        Update
                    </button>

                    <button onClick={() => deleteUser(user.id)}>
                        Delete
                    </button>

                    <button onClick={() => startEditingUser(user)}>
                        Edit
                    </button>
                </div>
            ))}
        </div>
    );
}

export default App;