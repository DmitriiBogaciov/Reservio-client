

//Custom props
import { SearchBarProps } from "@/props/SearchBar.props";
import { useState } from "react";
import { FaSearch } from "react-icons/fa";

const SearchBar = (props: SearchBarProps) => {
    const [searchedTerm, setSearchedTerm] = useState("");
    const [allItems, setAllItems] = useState(["test", "pes", "kun"]);
    const [searchedItems, setSearchedItems] = useState([""]);

    const onSearchHandler = (e: any) => {
        setSearchedItems(allItems.filter((item) => {
            if (item.includes(searchedTerm))
                {
                    console.log(item)
                    return item;
                }
        }))
        console.log(searchedItems)
    }

    return (
        <div className="shadow-md rounded-3xl bg-grayish flex p-3 relative">
            <input type="text" value={searchedTerm} onChange={(e) => setSearchedTerm(e.currentTarget.value)} className="p-1 rounded-2xl bg-grayish w-[100%] focus:outline-none"></input>
            <button onClick={(e) => onSearchHandler(e)}>
                <FaSearch size={"25"} className="m-auto drop-shadow-lg"></FaSearch>
            </button>
        </div>
    )
}

export default SearchBar;