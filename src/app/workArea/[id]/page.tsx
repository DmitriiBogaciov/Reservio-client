'use client'
import { useEffect, useState } from "react";

import "react-datepicker/dist/react-datepicker.css";
import ToggleList from "@/components/ToggleList.component";

import ReservationFormModal from "@/components/ReservationForm.modal.component";
import { Auth0VerifyMiddleware, Auth0ErrorComponent } from "@/components/middleware/auth0verify.middleware.component";

const apiUrl = process.env.NEXT_PUBLIC_RESERVIO_API;

export default function WorkAreaDetail(params: any) {


  const onReservationSubmitHandler = async (data: ReservationDataProps) => {
    try {
      const responseToken = await fetch('/api/shows');
      let token = null;
      if (responseToken.ok) {
        const data = await responseToken.json();
        token = data.accessToken;
      } else {
        throw Error('Error of fetching token');
      }

      const response = await fetch(`${apiUrl}/reservation/create`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify(data)
      });
      const reservation = await response.json();
      console.log(reservation);
    } catch (error:Error | any) {
      console.log(error);
      throw Error(error);
    }
  }


  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`${apiUrl}/reservation/findAll`);
        const data = await response.json();
        console.log(data);
      } catch (error) {
        console.log('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  

  return (
    <div>
      <h1>Detail: {params.params.id}</h1>
      <h1>Work Area Details</h1>
      <p>Make a reservation:</p>
      <Auth0VerifyMiddleware>
        <ReservationFormModal title="Reservation" onReservationSubmit={onReservationSubmitHandler}></ReservationFormModal>
        <Auth0ErrorComponent>
          <div>Sorry. Cannot make reservation if you are not logged in</div>
        </Auth0ErrorComponent>
      </Auth0VerifyMiddleware>
    </div>
  );
}
