import { useState } from "react";

function App() {
    const [name, setName] = useState("");
    const [greeting, setGreeting] = useState("");

    const handleSubmit = () => {
        fetch("http://localhost:5000/api/greet", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ name: name })
        })
            .then((response) => response.json())
            .then((data) => {
                console.log("Data from backend:", data);
                setGreeting(data.message);
            })
            .catch((error) => {
                console.error("Error:", error);
                setGreeting("Failed to connect to backend.");
            });
    };

    return (
        <div>
            <h1>My React App</h1>
            <input
                type="text"
                placeholder="Enter your name"
                value={name}
                onChange={(e) => setName(e.target.value)}
            />
            <button onClick={handleSubmit}>Send</button>
            <p>{greeting}</p>
        </div>
    );
}

export default App;