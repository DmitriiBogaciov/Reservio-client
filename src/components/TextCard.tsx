//Custom props
import { TextCardProps } from "@/props/TextCard.props";
import { ReactNode } from "react";

const TextCard = ({children}:{children: ReactNode}) => {

    return (
        <div className="shadow-md p-4 rounded-xl bg-light-greenish">
            {children}
        </div>
    )
}

export default TextCard;