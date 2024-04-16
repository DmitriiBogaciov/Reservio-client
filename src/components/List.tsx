
import { useState } from "react";
import { v4 as uuidv4 } from 'uuid';

import IconListCard from "./IconListCard";

//Props
import { IsInstanceOfIconListCard } from "@/props/IconListCard.props";
import { ListProps } from "@/props/List.props";

function List(props: ListProps) {
    const [listProps, setListProps] = useState<ListProps>(props);

    return (
        <div>
            <div className="p-2 border-black border-b-2">
                <h3>{props.title}</h3>
            </div>
            {
                props.items.map((item) => {
                    if(IsInstanceOfIconListCard(item))
                        return (
                            <IconListCard key={uuidv4()} title={item.title} shortText={item.shortText} image={item.image} icons={item.icons} />
                        )
                })
            }

        </div>
    )
}

export default List;