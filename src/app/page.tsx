//Home Page

'use client'
import axios from "axios"
import { useState } from "react";

const apiUrl = process.env.NEXT_PUBLIC_BABOOX_API;


import { Fa0 } from "react-icons/fa6";
import { FaBeer, FaWifi } from "react-icons/fa";

//Custom Components
import List from "../components/List";
import TextCard from "@/components/TextCard";
import SearchBar from "@/components/SearchBar";

//Props
import { IconListCardProps } from "@/props/IconListCard.props";


export default function Home() {
  const [workAreaCards,setWorkAreaCards] = useState<Array<IconListCardProps>>(
    [
      {icons:[Fa0],shortText:"Short Text",title:"Title"},
      {icons:[FaWifi],shortText:"Short Text. Short Text. Short Text. Short TextShort Text extShort ,extShort ",title:"This is next Title"},
      {icons:[FaBeer],shortText:"Short Text. Short Text. Short Text",title:"3rd Title"},
      {icons:[FaBeer,FaWifi,Fa0],shortText:"Short Text",title:"4th Title"}

    ]
  );
  const [searchedWorkAreaCards,setSearchedWorkAreaCards] = useState<Array<IconListCardProps>>(workAreaCards);

  const fetchToken = async () => {
    try {
      const response = await fetch('api/shows');
      if (response.ok) {
        const data = await response.json();
        return data.accessToken;
      } else {
        console.log('Error of fetching token');
        return null;
      }
    } catch (error) {
      console.error('Error', error);
    }
  };

  const searchBarHandler = (searchedTerm:string) => {
    setSearchedWorkAreaCards(workAreaCards.filter((item) => {
      if (item.title.toUpperCase().includes(searchedTerm.toUpperCase()))
           return item;
          
  }));
  };

  return (
    <div>
      <div className="flex mb-4">
        <SearchBar onSearch={searchBarHandler}></SearchBar>
      </div>
      <div className="flex justify-between">
        <div className="mr-10">
          <List title={"Choose work area where you want to reserve work space:"} items={searchedWorkAreaCards} />
        </div>
        <div className="max-w-[50%] mt-28 ml-24">
          <TextCard content="Id laborum quis sunt sit incididunt aliqua laboris ut irure eu pariatur deserunt magna voluptate. Excepteur duis deserunt tempor id nostrud incididunt culpa. Quis consectetur nisi aliqua consectetur laboris eiusmod. Ipsum voluptate reprehenderit enim occaecat aliqua aliquip officia velit veniam qui occaecat. Exercitation adipisicing pariatur ad aliquip laboris. Commodo fugiat sit mollit non nostrud fugiat Lorem esse elit cillum irure eiusmod."></TextCard>
        </div>
      </div>

    </div>
  )
}
