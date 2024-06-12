

//Custom props
import { SearchBarProps } from "@/props/SearchBar.props";
import { useState } from "react";
import { FaSearch } from "react-icons/fa";
import { FaCross, FaCrosshairs, FaXmark } from "react-icons/fa6";

const SearchBar = (props: SearchBarProps) => {
    const [searchedTerm, setSearchedTerm] = useState("");

    const onSearchHandler = (e: any) => {
        props.onSearch(searchedTerm);
    }

    const onEnterKeyPress = (e: any) => {
        if (e.key === 'Enter') {
            props.onSearch(searchedTerm);
        }
    }

    return (
        <div className="shadow-md rounded-3xl bg-grayish flex p-3 relative">
            <div className="flex border-black border-r-2">
                <input type="text" value={searchedTerm} onChange={(e) => setSearchedTerm(e.target.value)} onKeyUp={onEnterKeyPress} className="p-1 rounded-2xl bg-grayish w-[100%] focus:outline-none"></input>
                <FaXmark onClick={(e)=>{setSearchedTerm(""); props.onSearch("")}}  visibility={(searchedTerm !== "" || searchedTerm)?"visible":"hidden"}  className="mt-auto mb-auto mr-4 cursor-pointer"  />
            </div>
            <button onClick={(e) => onSearchHandler(e)} className="p-2">
                <FaSearch size={"25"} className="m-auto drop-shadow-lg"></FaSearch>
            </button>
        </div>
    )
}

export default SearchBar;