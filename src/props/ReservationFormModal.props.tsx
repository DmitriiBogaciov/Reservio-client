interface ReservationFormModalProps
{
    title:string,
    reservationData?:ReservationDataProps,
    onReservationSubmit?: (data:ReservationDataProps) => void,
    onReservationCancel?: () => void
}