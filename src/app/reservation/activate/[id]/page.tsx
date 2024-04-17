'use client'
import axios from "axios"
import { useState } from "react";

const apiUrl = process.env.NEXT_PUBLIC_RESERVIO_API;

export default function Page({ params }: { params: { id: string } }) {
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState('');

    const handleSubmit = async (event: { preventDefault: () => void; }) => {
        event.preventDefault();
        setLoading(true);
        setMessage("Wait a second, we are activating your reservation...");

        try {
            const response = await axios.post(`${apiUrl}/reservation/activate`, {
                password: password,
                workspace: params.id
            })
            setMessage('Reservation activated successfully!');
        } catch (error) {
            console.error("There was an error activating the reservation:", error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <label>Please enter password to activate reservation</label>
                <div>
                    <input
                        type="password" // Should be type "password" instead of "text"
                        name="password"
                        className="block flex-1"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                </div>
                <button type="submit" className="btn-primary">
                    Activate Reservation
                </button>
            </form>
            {message && <div>{message}</div>}
        </div>
    )
}

