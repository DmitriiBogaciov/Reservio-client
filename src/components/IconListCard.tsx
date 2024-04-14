import { useEffect, useState } from "react";

//Props
import { IconListCardProps, IconListCardType } from "@/props/IconListCard.props";
import { FaBeer } from "react-icons/fa";
const IconListCard: IconListCardType = (props: IconListCardProps) => {
    const [listCardProps, setListCardProps] = useState(props)


    return (
        <div className="flex bg-greenish p-2 rounded-r-[50px] rounded-l-[100px] max-w-[350px] mt-4 shadow-md">
            <div className="flex justify-center bg-slate-400 rounded-full min-w-[120px] min-h-[120px]">
                <div className="m-auto">
                    Image
                </div>
            </div>
            <div className="p-2 ml-10 grid grid-cols-1">
                <div className="text-lg">
                    {props.title}
                </div>
                <div>
                    {props.shortText}
                </div>
                <div className="flex justify-evenly mt-2">
                    {
                        props.icons.map((icon, index) => {
                            return (
                                <div key={index + 1} className="relative">
                                    {
                                        icon.call({}, { size: 13,className:"absolute bottom-0" })
                                    }
                                </div>
                            )
                        })
                    }
                </div>
            </div>
        </div>
    )
}

export default IconListCard;