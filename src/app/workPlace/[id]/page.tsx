'use client'
import { useEffect, useState } from "react";

import "react-datepicker/dist/react-datepicker.css";

import ReservationFormModal from "@/components/ReservationForm.modal.component";
import FeatureIconsComponent from "@/components/FeatureIcons.component";
import LoadingComponent from "@/components/Loading.component";
import ErrorComponent from "@/components/Error.component";

import WorkSpaceDataProps from "@/props/data/WorkSpace.dataprops";
import { LoadingStateProps } from "@/props/LoadingState.props";
import { toast } from "react-toastify";
import { FaBeer, FaHamburger, FaParking, FaWifi } from "react-icons/fa";
import TextCard from "@/components/TextCard";
import { Button, Modal, ModalBody, ModalFooter, ModalHeader } from "reactstrap";
import Link from "next/link";

const apiUrl = process.env.NEXT_PUBLIC_RESERVIO_API;

export default function WorkAreaDetail(params: any) {
  const [workPlace, setWorkPlace] = useState<PlaceDataProps>({} as PlaceDataProps);
  const [workSpaces, setWorkSpaces] = useState<Array<WorkSpaceDataProps>>([]);

  const [loadingState, setLoadingState] = useState<LoadingStateProps>("pending");

  const [reservationPassword, setReservationPassword] = useState<string>("");
  const [isReservationPasswordModalOpen, setIsReservationPasswordModalOpen] = useState<boolean>(false);

  const toggleReservationPasswordModal = () => {
    setIsReservationPasswordModalOpen(!isReservationPasswordModalOpen);
  };

  const onReservationSubmitHandler = async (data: ReservationDataProps) => {
    try {

      data.endTime.setMinutes(data.endTime.getMinutes() - 1);
      data.endTime.setHours(data.endTime.getHours() + 2);
      data.startTime.setHours(data.startTime.getHours() + 2);

      const response = await fetch(`${apiUrl}/reservation/create`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data)
      });
      const reservation = await response.json();
      console.log(reservation);
      if (!reservation || !reservation.result || !reservation.result.password) {
        if (reservation.message)
          toast.error(reservation.message);
        else
          toast.error("Something went wrong.");
        throw Error("Error creating reservation");
      }

      toast.success("Reservation created successfully");
      setReservationPassword(reservation.result.password);
      toggleReservationPasswordModal();
    } catch (error: Error | any) {
      console.log(error);
      throw Error(error);
    }
  }




  useEffect(() => {

    //Getting work place details
    const fetchPlaceDetails = async () => {
      try {
        const response = await fetch(`${apiUrl}/place/findOne/${params.params.id}`);
        const data = await response.json();
        if (data && data.result) {
          setWorkPlace(data.result);
          setLoadingState("success");
        }
        else
          setLoadingState("error");
      } catch (error) {
        setLoadingState("error");
        console.error('Error fetching data:', error);
      }
    };

    //Getting work spaces
    const fetchWorkSpaces = async () => {
      try {
        const response = await fetch(`${apiUrl}/workspace/findAll`,
          {
            method: 'POST',
            body: JSON.stringify({
              filter: {
                placeId: params.params.id
              }
            })
          }
        );
        const data = await response.json();
        if (data && data.result) {
          setWorkSpaces(data.result);
          setLoadingState("success");
        }
        else
          setLoadingState("error");
      } catch (error) {
        setLoadingState("error");
        console.error('Error fetching data:', error);
      }
    };

    fetchWorkSpaces();
    fetchPlaceDetails();
  }, []);

  return (
    <div>
      {(loadingState === "pending") ? <LoadingComponent></LoadingComponent> :
        (loadingState === "error") ?
          <ErrorComponent>
            <>Error getting work place details.</>
          </ErrorComponent> :
          <>
            <TextCard>
              <div className=" ">
                <div className="pb-4 mb-4 border-b-2 border-black">
                  <div className="md:flex block justify-between">
                    <div className="flex  mt-auto mb-auto">
                      <img className="md:max-w-[100px] max-w-[75px] md:h-[100px] h-[75px] rounded-full" src={
                        workPlace.category === "restaurant" ? "/building-restaurant.png" :
                          workPlace.category === "office" ? "/building-office.png" :
                            workPlace.category === "factory" ? "/building-factory.png" :
                              "/building-shop.png"
                      } />
                      <div className="md:m-auto mt-auto mb-auto pl-4">
                        <h1>{workPlace.name}</h1>
                      </div>

                    </div>
                    <ul className="list-disc p-0 md:mt-0 mt-4">
                      {
                        workPlace.features && workPlace.features.map((feature, index) => {
                          switch (feature) {
                            case "wifi":
                              return (
                                <li className="flex">
                                  <FaWifi></FaWifi>.....{feature === "wifi" ? "Place posisses wifi." : ""}
                                </li>
                              )
                            case "drink":
                              return (<li className="flex"> <FaBeer></FaBeer>.....{feature === "drink" ? "Place offers drink." : ""}</li>)
                            case "parking":
                              return (
                                <li className="flex">
                                  <FaParking></FaParking>.....{feature === "parking" ? "Nearby parking." : ""}
                                </li>
                              )
                            case "food":
                              return (
                                <li className="flex">
                                  <FaHamburger></FaHamburger>.....{feature === "food" ? "Place offers food." : ""}
                                </li>
                              )
                          }
                        })
                      }
                    </ul>
                  </div>
                  <div>{workPlace.address}</div>
                </div>


                <div>
                  <p>{workPlace.description}</p>
                  <h3>Number of reservable spaces: {workSpaces.length}</h3>
                </div>
              </div>
            </TextCard>
            <div className="mt-4">
              <TextCard>
                <h3>Want to create reservation for this work place?</h3>
                <p>Click button bellow to create one.</p>
                <div className="flex justify-center">
                  <ReservationFormModal title="Reservation" workSpacesData={workSpaces} onReservationSubmit={onReservationSubmitHandler} maxReservedHours={2}></ReservationFormModal>
                </div>
                {isReservationPasswordModalOpen && <Modal isOpen={isReservationPasswordModalOpen} toggle={toggleReservationPasswordModal}>
                  <ModalHeader>Reservation created</ModalHeader>
                  <ModalBody>
                    <p>
                      Reservation was created. Your reservation password:<span className="font-bold">{reservationPassword}</span>.
                    </p>
                    <p>
                      You can use this password to activate your reservation. More detail on the <Link href="/reservation">help page</Link>.
                    </p>
                  </ModalBody>
                  <ModalFooter>
                    <Button color="primary" onClick={toggleReservationPasswordModal}>Close</Button>
                  </ModalFooter>
                </Modal>}
              </TextCard>
            </div>

          </>
      }
    </div>
  )
}


