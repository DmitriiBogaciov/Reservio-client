import React, { ReactNode } from "react"

const ErrorComponent = ({children}: {children: ReactNode}) =>
{

    return (
        <>
            <div className="flex justify-center">
                <div className="text-white p-4 grid grid-cols-1 bg-red-800  m-3 p-4 rounded-md shadow-lg">
                    {children}
                </div>
            </div>
        </>
    )
}

export default ErrorComponent;