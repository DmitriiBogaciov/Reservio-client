'use client'
import axios from "axios"
import { useState } from "react";

const apiUrl = process.env.NEXT_PUBLIC_RESERVIO_API;

export default function Page({ params }: { params: { id: string } }) {
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState('');
    const [activated, setActivated] = useState(false)

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
            setActivated(true);
        } catch (error: unknown) {
            let errorMessage = "Unknown error";
            if (axios.isAxiosError(error)) {
                errorMessage = error.response?.data?.message || error.message;
            } else if (error instanceof Error) {
                errorMessage = error.message;
            }
            setMessage(`Error:  ${errorMessage}`);
            console.error("There was an error activating the reservation:", error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="flex justify-center content-center">
            <form onSubmit={handleSubmit}>
                {!activated && (
                    <>
                    <div className="flex justify-center">
                        <label>Please enter password to activate reservation</label>
                    </div>
                        <div className="flex justify-center">
                            <input
                                type="text"
                                name="password"
                                className="block flex-2 mt-4"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                            />
                        </div>
                        <div className="flex justify-center mt-2">
                            <button type="submit" className="btn btn-primary" disabled={loading}>
                                Activate
                            </button>
                        </div>
                    </>
                )}
                <div className="flex justify-center mt-4 text-2xl">
                    {message && <div>{message}</div>}
                </div>
            </form >
        </div >

    )
}

