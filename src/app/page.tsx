'use client'
import axios from "axios"
import { useState } from "react";
const apiUrl = process.env.NEXT_PUBLIC_BABOOX_API;


interface Book {
  title: string;
}


export default function Home() {
  const [book, setBook] = useState<Book | null>(null);

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
    
  )
}
