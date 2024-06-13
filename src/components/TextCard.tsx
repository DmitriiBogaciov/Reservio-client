//Custom props
import { TextCardProps } from "@/props/TextCard.props";
import { ReactNode } from "react";

const TextCard = ({children}:{children: ReactNode}) => {

    return (
        <div className="shadow-md md:p-4 p-2 rounded-xl bg-light-greenish">
            {children}
        </div>
    )
}

export default TextCard;