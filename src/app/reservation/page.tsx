'use client'

import { LoadingStateProps } from "@/props/LoadingState.props";
import axios from "axios";
import { useState, useEffect } from "react";

const apiUrl = process.env.NEXT_PUBLIC_RESERVIO_API;

export default function Page() {
  
  const [reservations, setReservations] = useState<Array<ReservationDataProps>>([]);
  const [loadingState, setLoadingState] = useState<LoadingStateProps>("pending");

  const [activationCode, setActivationCode] = useState<string>("");
  const [email, setEmail] = useState<string>("");



  const getReservationByActivationCode = async () => {
    try {
      const response = await fetch(`${apiUrl}/reservation/findAll`,
        {
          method: 'POST',
          body: JSON.stringify({
            filter: {
              password:activationCode
              }
          })
        }
      );
     console.log(response);
    } catch (error: unknown) {
      let errorMessage = "Unknown error";
      if (axios.isAxiosError(error)) {
        errorMessage = error.response?.data?.message || error.message;
      } else if (error instanceof Error) {
        errorMessage = error.message;
      }
      console.error("There was an error displaying the reservation:", error);
    }
  };

  useEffect(() => {
   // getReservation();
  }, []);

  return (
    <div>
      <h1>Display reservation</h1>
      <ul>
        <p>Got reservation code? Enter it below to display your reservation</p>
        <input value={activationCode} onChange={(e) => setActivationCode(e.target.value)}></input>
        <p>Want to display all you reservation? Enter you email address that you used to create your reservation</p>
        <input value={email} onChange={(e) => setEmail(e.target.value)}></input>
        <button
          onClick={() => {
            getReservationByActivationCode();
          }}
        >
          Display reservation
        </button>
      </ul>
    </div>
  );
}
