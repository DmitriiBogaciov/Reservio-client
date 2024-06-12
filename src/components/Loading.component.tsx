import React from "react"
import DotLoader from "react-spinners/MoonLoader"

const LoadingComponent = ({ text }: { text?: string }) => {
    return (
        <>
            <div className="p-5 flex justify-center">
                <div className="grid grid-cols-1">
                    <DotLoader
                        loading={true}
                        size={100}
                        color={"black"}
                        className="m-auto"
                    ></DotLoader>
                    <p className="font-bold">
                        {text}
                    </p>
                </div>
            </div>
        </>
    )
}

export default LoadingComponent;
