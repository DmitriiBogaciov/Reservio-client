//Home Page

'use client'
import axios from "axios"
import { useState } from "react";

const apiUrl = process.env.NEXT_PUBLIC_BABOOX_API;

//Custom Components
import List from "../components/List";

//Props
interface Book {
  title: string;
}
import { ListProps } from "@/props/List.props";
import { Fa0 } from "react-icons/fa6";
import IconListCard from "@/components/IconListCard";
import { FaWifi } from "react-icons/fa";


export default function Home() {
  //const [book, setBook] = useState<Book | null>(null);

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
  return(
    <div>
      <h2 className="p-2 bg-light-greenish rounded-lg">hello</h2>
      <div className="flex">
        <List props={{items:[]}}>
          <IconListCard title="Title" shortText="shofrt tetet text" icons={[FaWifi]}></IconListCard>
          <IconListCard title="Title 2" shortText="shofrt tetet text fds fsd fsdvsdv sdf sdf sdf sdvcsd" icons={[FaWifi]}></IconListCard>
        </List>
      </div>

    </div>
  )
}
