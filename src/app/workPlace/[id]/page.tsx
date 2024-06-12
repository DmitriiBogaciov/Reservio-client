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

const apiUrl = process.env.NEXT_PUBLIC_RESERVIO_API;

export default function WorkAreaDetail(params: any) {
  const [workPlace, setWorkPlace] = useState<PlaceDataProps>({} as PlaceDataProps);
  const [workSpaces, setWorkSpaces] = useState<Array<WorkSpaceDataProps>>([]);

  const [loadingState, setLoadingState] = useState<LoadingStateProps>("pending");

  const onReservationSubmitHandler = async (data: ReservationDataProps) => {
    try {

      data.endTime.setMinutes(data.endTime.getMinutes() -1);
      data.endTime.setHours(data.endTime.getHours() +2);
      data.startTime.setHours(data.startTime.getHours() +2);
      
      const response = await fetch(`${apiUrl}/reservation/create`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data)
      });
      const reservation = await response.json();
      console.log(reservation);
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
                placeId:params.params.id
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
            <h1>Detail: {workPlace.name}</h1>
            <h3>Number of reservable spaces: {workSpaces.length}</h3>
            <div className="w-[200px]">
              <FeatureIconsComponent features={workPlace.features}></FeatureIconsComponent>
            </div>
            <p>{workPlace.description}</p>
            <p>Make a reservation:</p>
            <ReservationFormModal title="Reservation" workSpacesData={workSpaces} onReservationSubmit={onReservationSubmitHandler}></ReservationFormModal>
          </>
      }
      {/* <Auth0VerifyMiddleware>
        <Auth0ErrorComponent>
          <div>Sorry. Cannot make reservation if you are not logged in</div>
        </Auth0ErrorComponent>
      </Auth0VerifyMiddleware> */}
    </div>
  );
}
