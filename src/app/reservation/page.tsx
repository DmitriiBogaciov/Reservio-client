'use client'

import axios from "axios";
import { useState, useEffect } from "react";

const apiUrl = process.env.NEXT_PUBLIC_RESERVIO_API;

export default function Page() {
  const [reservations, setReservations] = useState<Array<ReservationDataProps>>([]);

  useEffect(() => {
    const fetchData = async () => {
      const response = await axios.get(
        `${apiUrl}/reservation/findAll`
      );
      setReservations(response.data);
    };
    fetchData();
  }, []);

  return (
    <div>
      <h1>Reservation Overview</h1>
      <ul>

      </ul>
    </div>
  );
}
