//Home Page

'use client'
import axios from "axios"
import { useState } from "react";

const apiUrl = process.env.NEXT_PUBLIC_BABOOX_API;

//Custom Components
import List from "../components/List";
import TextCard from "@/components/TextCard";

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
  return (
    <div>
      <div className="flex justify-between">
        <div className="mr-10">
          <List props={{ title: "Choose work area where you want to reserve work space:", items: [] }}>
            <IconListCard title="Title" shortText="shofrt tetet text" icons={[FaWifi, Fa0]}></IconListCard>
            <IconListCard title="Title 2" shortText="shofrt tetet text fds fsd fsdvsdv sdf sdf sdf sdvcsd" icons={[FaWifi]}></IconListCard>
          </List>
        </div>
        <div className="max-w-[50%] mt-28 ml-24">
          <TextCard content="Id laborum quis sunt sit incididunt aliqua laboris ut irure eu pariatur deserunt magna voluptate. Excepteur duis deserunt tempor id nostrud incididunt culpa. Quis consectetur nisi aliqua consectetur laboris eiusmod. Ipsum voluptate reprehenderit enim occaecat aliqua aliquip officia velit veniam qui occaecat. Exercitation adipisicing pariatur ad aliquip laboris. Commodo fugiat sit mollit non nostrud fugiat Lorem esse elit cillum irure eiusmod."></TextCard>
        </div>
      </div>

    </div>
  )
}
