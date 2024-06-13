'use client'
import LoadingComponent from "@/components/Loading.component";
import { LoadingStateProps } from "@/props/LoadingState.props";
import WorkSpaceDataProps from "@/props/data/WorkSpace.dataprops";
import axios from "axios"
import { useRouter } from 'next/navigation';
import { useEffect, useState } from "react";
import { toast } from "react-toastify";

const apiUrl = process.env.NEXT_PUBLIC_RESERVIO_API;

export default function Page({ params }: { params: { id: string } }) {
    const [password, setPassword] = useState("");
    const [loadingState, setLoadingState] = useState<LoadingStateProps>("pending");
    const [activated, setActivated] = useState(false)

    const {push} = useRouter();
    const [workSpace, setWorkSpace] = useState<WorkSpaceDataProps>();

    useEffect(() => {
        const fetchWorkSpace = async () => {
            try {
                const response = await axios.get(`${apiUrl}/workspace/findOne/${params.id}`,
          
                );
                const data = response.data;
                if (data && data.result) {
                    setWorkSpace(data.result);
                    setLoadingState("success");
                }
                else
                {
                    if(data.message)
                        toast.error(data.message, {pauseOnHover:false,autoClose:1500,onClose: () => push("/")});
                    setLoadingState("error");
                }
            } catch (error) {
                console.error(error);
                toast.error("Error fetching work space", {pauseOnHover:false,autoClose:1500,onClose: () => push("/")});
                setLoadingState("error");
            }
        };
        fetchWorkSpace();
    }, [params.id]);


    const handleSubmit = async (event: { preventDefault: () => void; }) => {
        event.preventDefault();
        setLoadingState("pending");
        try {
            const response = await axios.post(`${apiUrl}/reservation/activate`, {
                password: password,
                workspace: params.id
            })
            setActivated(true);
        } catch (error: unknown) {
            let errorMessage = "Unknown error";
            if (axios.isAxiosError(error)) {
                errorMessage = error.response?.data?.message || error.message;
            } else if (error instanceof Error) {
                errorMessage = error.message;
            }
            console.error("There was an error activating the reservation:", error);
        } finally {
            setLoadingState("error");
        }
    };

    return (
        <>
            {
                (loadingState === "pending") ? 
                <LoadingComponent></LoadingComponent>:
                (loadingState === "success") ?
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
                                <button type="submit" className="btn btn-primary">
                                    Activate
                                </button>
                            </div>
                        </>
                    )}
                </form >
            </div >:<></>
            }
        </>
    )
}

