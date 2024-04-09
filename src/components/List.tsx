import { useEffect, useState } from "react";
import { FaBeer, FaWifi } from "react-icons/fa";
import { Fa9 } from "react-icons/fa6";

import IconListCard from "./IconListCard";

//Props
import { ListProps } from "@/props/List.props";

function List({props,children}:{props:ListProps, children: JSX.Element[] |  JSX.Element}) {
    const [listProps, setListProps] = useState(props);


    console.log(children)
    return (
        <div>
            <h1>{props.title}</h1>
            {
                (children)?
                children
                :<></>
            }

        </div>
    )
}

export default List;