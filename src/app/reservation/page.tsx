'use client'

import TextCard from "@/components/TextCard";
import ToggleList from "@/components/ToggleList.component";
import { LoadingStateProps } from "@/props/LoadingState.props";
import axios from "axios";
import { useState, useEffect } from "react";
import { toast } from "react-toastify";
import { Button, Modal, ModalFooter } from "reactstrap";

const apiUrl = process.env.NEXT_PUBLIC_RESERVIO_API;

export default function Page() {

  const [reservation, setReservation] = useState<ReservationDataProps>();
  const [loadingState, setLoadingState] = useState<LoadingStateProps>("pending");

  const [activationCode, setActivationCode] = useState<string>("");
  const [email, setEmail] = useState<string>("");



  const getReservationByActivationCode = async () => {
    try {
      const response = await fetch(`${apiUrl}/reservation/findAll`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            filter: {
              user: email,
              password: activationCode
            }
          })
        }
      );
      let data = await response.json();
      if (data && data.result && data.result.length > 0)
        setReservation(data.result[0]);
      else if (data.result.length == 0) {
        toast.error("Sorry. We could not find your reservation.");
      }
      else {
        if (data.message)
          toast.error(data.message);
        else
          toast.error("Ooops. Something went wrong.");
      }
      setLoadingState("success");
      console.log(data);
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
      <h1>Q&A:</h1>
      <div>
        <ToggleList title="How to activate reservation?" list_items={[
          { label: "1. Scan a QR code at a workspace that you reserved.", value: "1" },
          { label: "2. You will be redirected to the activation page of reservation where you enter the activation code that you received in your email or during your reservation registration.", value: "Activate reservation" },
          { label: "3. Click on Activate reservation and enjoy your stay", value: "Activate reservation" }]
        } is_open={false}>
        </ToggleList>
      </div>
      {/* <TextCard>
        <h3>How to activate reservation?</h3>
        <ol className="list-decimal" type="1">
          <li>Scan a QR code on a workspace that you reserved.</li>
          <li>You will be redirected to the activation page of reservation where you enter the activation code that you received in your email or during your reservation registration.</li>
          <li>Click on &quot;Activate reservation&quot; and enjoy your stay.</li>
        </ol>
      </TextCard> */}
      <div className="mt-4">
        <TextCard>
          <h3>Already have a reservatoin?</h3>
          <p>Enter your reservation password and e-mail to display details about your reservation</p>
          <form onSubmit={async (event) => {
            event.preventDefault();
            await getReservationByActivationCode();
          }}>
            <div className="flex justify-center">
              <label className="p-2 ml-2">Email: </label>
              <input className="p-2 text-white rounded-2xl bg-grayish w-[150px] focus:outline-none" value={email} onChange={(event) => setEmail(event.target.value)} type="email" placeholder="Enter your email" />
            </div>
            <div className="flex justify-center mt-4">
              <label className="p-2 ml-2">Reservation code:</label>
              <input className="p-2 text-white rounded-2xl bg-grayish w-[150px] focus:outline-none" value={activationCode} onChange={(event) => setActivationCode(event.target.value)} type="text  " placeholder="Enter your password" />
            </div>
            <div className="flex justify-center  mt-4">
              <button className="bg-grayish p-2 shadow-md rounded-md" type="submit">Submit</button>
            </div>
          </form>
        </TextCard>
        <Modal isOpen={reservation !== undefined} onClose={() => setReservation(undefined)}>
          <div className="p-4">
            <h3>Reservation details</h3>
            <p>Reservation name: <span className="font-bold">{reservation?.name}</span></p>
            <p>Reservation code: <span>{reservation?.password}</span></p>
            <p>Start date:<span className="font-bold">{reservation?.startTime ? new Date(reservation?.startTime).toLocaleString() : "-"}</span> </p>
            <p>End date:<span className="font-bold">{reservation?.endTime ? new Date(reservation?.endTime).toLocaleString() : "-"}</span> </p>
            <p>User: <span className="font-bold">{reservation?.user}</span> </p>
          </div>
          <ModalFooter>
            <Button onClick={() => setReservation(undefined)} color="secondary">Close</Button>
          </ModalFooter>
        </Modal>
      </div>
    </div>
  );
}
