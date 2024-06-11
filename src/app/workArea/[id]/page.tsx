'use client'
import { useState } from "react";

import "react-datepicker/dist/react-datepicker.css";
import ToggleList from "@/components/ToggleList.component";
import ReservationFormModal from "@/components/ReservationForm.modal.component";

export default function WorkAreaDetail(params: any) {


  const onReservationSubmitHandler = (data: ReservationDataProps) => {
    console.log(data);
  }
  return (
    <div>
      <h1>Detail: {params.params.id}</h1>
      <h1>Work Area Details</h1>
      <p>Make a reservation:</p>
      <ReservationFormModal title="Reservation" onReservationSubmit={onReservationSubmitHandler}></ReservationFormModal>
    </div>
  );
}
