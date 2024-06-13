

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
        <div className="flex items-center justify-between rounded-3xl bg-grayish p-3 relative">
            <div className="flex-grow">
                <input placeholder={props.placeHolder} type="text" value={searchedTerm} onChange={(e) => setSearchedTerm(e.target.value)} onKeyUp={onEnterKeyPress} className="p-1 rounded-2xl bg-grayish w-full focus:outline-none"></input>
            </div>
            <div className="flex items-center border-l-[2px] border-black">
                <FaXmark onClick={(e)=>{setSearchedTerm(""); props.onSearch("")}}  visibility={(searchedTerm !== "" || searchedTerm)?"visible":"hidden"}  className="mt-auto mb-auto mr-2 cursor-pointer"  />
                <button onClick={(e) => onSearchHandler(e)} className="p-2">
                <FaSearch size={"25"} className="m-auto drop-shadow-lg"></FaSearch>
                </button>
            </div>
        </div>
    )
}

export default SearchBar;