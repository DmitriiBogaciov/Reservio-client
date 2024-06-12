import WorkSpaceDataProps from "./data/WorkSpace.dataprops";

interface ReservationFormModalProps
{
    title:string,
    reservationData?:ReservationDataProps,
    workSpacesData?:Array<WorkSpaceDataProps>,
    onReservationSubmit?: (data:ReservationDataProps) => void,
    onReservationCancel?: () => void
}

export type {ReservationFormModalProps}