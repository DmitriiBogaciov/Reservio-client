
import { useState } from "react";
import { v4 as uuidv4 } from 'uuid';

import IconListCard from "./IconListCard";

//Props
import { IsInstanceOfIconListCard } from "@/props/IconListCard.props";
import { ListProps } from "@/props/List.props";

/**
 * List component
 * Renders a list of items, each being rendered by IconListCard component
 * @param {ListProps} props - The component props
 * @returns {JSX.Element} - The rendered component
 */
function List(props: ListProps) {
    // State to hold the component props
    const [listProps, setListProps] = useState<ListProps>(props);

    return (
        <div className="max-h-[450px] overflow-y-auto">
            {/* Render the list title */}
            {(props.title) &&
                <div className="p-2 border-black border-b-2">
                    <h3>{props.title}</h3>
                </div>
            }
            {/* Check if the list is empty */}
            {props.items.length === 0 &&
                <div className="p-2">
                    {props.emptyText}
                </div>
            }
            {/* Map through the items and render IconListCard component for each item */}
            {props.items.map((item) => {
                // Check if the item is an IconListCardProps
                if (IsInstanceOfIconListCard(item)) {
                    // Render the IconListCard component with the item's properties
                    return (
                        <IconListCard
                            key={uuidv4()} // Generate a unique key for each item
                            title={item.title} // Render the item's title
                            shortText={item.shortText} // Render the item's short text
                            image={item.image} // Render the item's image
                            icons={item.icons} // Render the item's icons
                            onClick={item.onClick} // Render the item's onClick function
                        />
                    )
                }
            })}
        </div>
    )
}

export default List;
