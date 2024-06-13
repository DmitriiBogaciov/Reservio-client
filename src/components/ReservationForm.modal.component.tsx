import { Modal, ModalBody, ModalHeader, ModalFooter, Button, Form, FormGroup, Label, Input } from "reactstrap";
import { useEffect, useState } from "react";
import DatePicker from "react-datepicker";
import TimePicker from "@/components/TimePicker";


import { LoadingStateProps } from "@/props/LoadingState.props";
import { ReservationFormModalProps } from "@/props/ReservationFormModal.props";
import { toast } from "react-toastify";


const apiUrl = process.env.NEXT_PUBLIC_RESERVIO_API;

function ReservationFormModal(props: ReservationFormModalProps) {
    const [modalOpen, setModalOpen] = useState(false);
    const [workSpaceReservations, setWorkSpaceReservations] = useState<Array<ReservationDataProps>>([]);
    const [reservationData, setReservationData] = useState<ReservationDataProps>({ name: "", startTime: new Date(), endTime: new Date(), active:false });



    const [startDate, setStartDate] = useState<Date | undefined>(new Date());
    const [endDate, setEndDate] = useState<Date | undefined>(new Date());
    const [startTime, setStartTime] = useState<Date>();
    const [deactivatedStartTimes, setDeactivatedStartTimes] = useState<Array<Date | Date[]>>([]);
    const [endTime, setEndTime] = useState<Date>();
    const [deactivatedEndTimes, setDeactivatedEndTimes] = useState<(Date | Date[])[]>([]);

    const [loadingState, setLoadingState] = useState<LoadingStateProps>("pending");


    useEffect(() => {
        let newDeactivatedEndTimes = [];
        setDeactivatedEndTimes([]);
        setDeactivatedStartTimes([]);
        if (startTime && endTime && startTime.getTime() < endTime.getTime())
            setEndTime(undefined);

        let now = new Date();

        //Disabling past dates
        if (startDate && startDate.getDate() < now.getDate()) {
            newDeactivatedEndTimes.push([new Date('2024-06-15T00:00'), new Date('2024-06-15T23:30')]);
            //setDeactivatedStartTimes([[new Date('2024-06-15T00:00'), new Date('2024-06-15T23:30')]]);
        }

        if (endDate && endDate.getDate() < now.getDate()) {
            newDeactivatedEndTimes.push([new Date('2024-06-15T00:00'), new Date('2024-06-15T23:30')]);
            //setDeactivatedEndTimes([[new Date('2024-06-15T00:00'), new Date('2024-06-15T23:30')]]);
        }

        if (startDate && startDate.getDate() == now.getDate())
            setDeactivatedStartTimes([[new Date('2024-06-15T00:00'), now]]);

        if (endDate && endDate.getDate() == now.getDate()) {
            newDeactivatedEndTimes.push([new Date('2024-06-15T00:00'), now]);
            //setDeactivatedEndTimes([[new Date('2024-06-15T00:00'), now]]);
        }


        //deactivating to not allow end date before start date
        if (startTime && endDate?.getDate() == startDate?.getDate()) {
            newDeactivatedEndTimes.push([new Date('2024-06-15T00:00'), startTime]);
            //setDeactivatedEndTimes([[new Date('2024-06-15T00:00'), startTime]]);
        }
        else if (endDate && startDate && endDate?.getDate() < startDate?.getDate()) {
            setEndTime(undefined);
            newDeactivatedEndTimes.push([new Date('2024-06-15T00:00'), new Date('2024-06-15T23:30')]);
            //setDeactivatedEndTimes([[new Date('2024-06-15T00:00'), new Date('2024-06-15T23:30')]]);
        }
        else {
            setDeactivatedEndTimes([]);
        }

        //Setting date's time
        if (startTime && startDate) {
            startDate.setHours(startTime.getHours());
            startDate.setMinutes(startTime.getMinutes());
        }
        if (endTime && endDate) {
            endDate.setHours(endTime.getHours());
            endDate.setMinutes(endTime.getMinutes());
        }

        //Making sure that end date can be selected max maxReservedHours after start date
        if (startTime && props.maxReservedHours) {
            let endTimeLimit = new Date(startTime.getTime() + (props.maxReservedHours + 1) * 60 * 60 * 1000);
            if (endTimeLimit) {
                console.log(endTimeLimit)
                setDeactivatedEndTimes([[endTimeLimit, new Date('2024-06-15T23:30')]]);
            }
        }

        //Adding reserved work spaces as deactivated
        if (workSpaceReservations && workSpaceReservations.length > 0) {

            let newDeactivatedStartTimes: Array<Date | Date[]> = workSpaceReservations.map((reservation: ReservationDataProps) => {
                let reservationStartTime = new Date(reservation.startTime);
                let reservationEndTime = new Date(reservation.endTime);

                if (startDate && reservationStartTime.getDate() == startDate.getDate()) {

                    //Due to time zone difference, we need to decrease the time by two hours
                    reservationStartTime.setHours(reservationStartTime.getHours() - 2);
                    reservationEndTime.setHours(reservationEndTime.getHours() - 3);

                    return [new Date(reservationStartTime), new Date(reservationEndTime)]
                }
                return [];
            });


            let newDeactivatedEndTimes: Array<Date | Date[]> = workSpaceReservations.map((reservation: ReservationDataProps) => {
                let reservationStartTime = new Date(reservation.startTime);
                let reservationEndTime = new Date(reservation.endTime);

                if (endDate && reservationEndTime.getDate() == endDate.getDate()) {
                    //Due to time zone difference, we need to decrease the time by two hours
                    reservationStartTime.setHours(reservationStartTime.getHours() - 1);
                    reservationEndTime.setHours(reservationEndTime.getHours() - 2);

                    return [new Date(reservationStartTime), new Date(reservationEndTime)]
                }
                return [];
            });

            //Adding deactivated times
            setDeactivatedStartTimes((prev) => prev ? [...prev, ...newDeactivatedStartTimes] : newDeactivatedStartTimes);
            setDeactivatedEndTimes((prev) => prev ? [...prev, ...newDeactivatedEndTimes] : newDeactivatedEndTimes);
        }
        setDeactivatedEndTimes((prev) => prev ? [...prev, ...newDeactivatedEndTimes] : newDeactivatedEndTimes);
    }, [startTime, endDate, startDate, workSpaceReservations]);


    const toggleModal = () => {
        setModalOpen(!modalOpen);
    };

    const fetchReservationsDetails = async (workSpaceId: string) => {
        try {
            const response = await fetch(`${apiUrl}/reservation/findAll`,
                {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',  
                    },
                    body: JSON.stringify({
                        filter: {
                            placeId: workSpaceId
                        }
                    })
                }
            );
            const data = await response.json();
            if (data && data.result) {
                console.log(data.result);
                setWorkSpaceReservations(data.result);
                setLoadingState("success");
            }
            else
                setLoadingState("error");
        } catch (error) {
            setLoadingState("error");
            console.error('Error fetching data:', error);
        }
    };





    const handleNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (reservationData) {
            setReservationData({ ...reservationData, name: event.target.value });
        }
    };

    const handleUserChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (reservationData) {
            setReservationData({ ...reservationData, user: event.target.value });
        }
    };

    const handleWorkSpaceChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (reservationData) {
            setReservationData({ ...reservationData, workspace: event.target.value });
        }
        //Fetching reservations for the selected workspace
        fetchReservationsDetails(event.target.value);
    };



    const handleStartDateChange = (date: Date | [Date, Date]) => {
        if (date instanceof Array) {
            setStartDate(date[0]);
        } else {
            setStartDate(date);
        }
    };

    const handleEndDateChange = (date: Date | [Date, Date]) => {
        if (date instanceof Array) {
            setEndDate(date[0]);
        } else {
            setEndDate(date);
        }
    };

    const handleStartTimeChange = (time: Date | null) => {
        console.log(time)
        if (time) {
            setStartTime(time);
        }
    };

    const handleEndTimeChange = (time: Date | null) => {
        console.log(time, endTime)
        if (time) {
            setEndTime(time);

        }
        if (startTime && time && time.getHours() > startTime.getHours() && time.getMinutes() > startTime.getMinutes()) {
            setEndTime(time);
        }

    };

    const validateForm = () => {
        let result = true;
        if (reservationData.name == '' || !reservationData.name) {
            toast.error("Name is required");
            result = false;
        }

        if (reservationData.user == '' || !reservationData.user) {
            toast.error("User is required");
            result = false;
        }

        if (reservationData.workspace == '' || !reservationData.workspace) {
            toast.error("Workspace is required");
            result = false;
        }

        if (!startTime || !endTime) {
            toast.error("Specify start and end time.");
            result = false;
        }

        if (!startDate || !endDate) {
            toast.error("Start and End date are required");
            result = false;
        }
        if (startDate && endDate && startDate.getTime() >= endDate.getTime()) {
            toast.error("Start date must be before end date");
            result = false;
        }
        if (startTime && endTime && startTime.getTime() >= endTime.getTime() ) {
            toast.error("Start time must be before end time");
            result = false;
        }
        return result;
    };

    useEffect(() => {
        if (startTime && endDate && startDate && endTime) {
            startDate.setHours(startTime.getHours());
            startDate.setMinutes(startTime.getMinutes());
            endDate.setHours(endTime.getHours());
            endDate.setMinutes(endTime.getMinutes());
            if (reservationData) {
                setReservationData({ ...reservationData, startTime: startDate, endTime: endDate });
            }
        }
    }, [startTime, endTime, startDate, endDate]);

    return (
        <>

            <button className="btn btn-primary" onClick={toggleModal}>
                Make a reservation
            </button>
            <Modal isOpen={modalOpen} toggle={toggleModal}>
                <ModalHeader toggle={toggleModal}>{props.title}</ModalHeader>
                <ModalBody>
                    <Form>
                        <FormGroup>
                            <Label for="name">Name</Label>
                            <Input type="text" name="name" id="name" placeholder="Name of your reservation" value={reservationData?.name || ""} onChange={handleNameChange} />
                        </FormGroup>
                        <FormGroup>
                            <Label for="name">E-mail</Label>
                            <Input type="text" name="user" id="name" placeholder="Enter your e-mail" value={reservationData?.user || ""} onChange={handleUserChange} />
                        </FormGroup>

                        <FormGroup>
                            <Label for="workSpace">Work Space</Label>
                            <Input type="select" name="workSpace" id="workSpace" onChange={handleWorkSpaceChange}>
                                <option value="" disabled selected hidden>Select work space</option>
                                {props.workSpacesData?.map((workSpace) => (
                                    <option key={workSpace._id} value={workSpace._id}>{workSpace.name}</option>
                                ))}
                            </Input>
                        </FormGroup>
                        <FormGroup>
                            {
                                (reservationData.workspace) ?
                                    <div className="grid grid-cols-1 lg:grid-cols-2">
                                        <div>
                                            <h3>Starts from:</h3>
                                            <DatePicker
                                                showIcon
                                                selected={startDate}
                                                onChange={(date) => (date) ? handleStartDateChange(date) : null}
                                                minDate={new Date()}
                                                className="border-2 border-black rounded-lg mb-2 shadow-sm"
                                            />
                                            <TimePicker
                                                deactivatedTimes={deactivatedStartTimes}
                                                selectedTime={startTime}
                                                onChange={handleStartTimeChange}
                                                minuteInterval={60}
                                            />
                                        </div>
                                        <div>
                                            <h3>Ends at:</h3>
                                            <DatePicker
                                                showIcon
                                                selected={endDate}
                                                onChange={(date) => (date) ? handleEndDateChange(date) : null}
                                                minDate={new Date()}
                                                className="border-2 border-black rounded-lg mb-2 shadow-sm"
                                            />
                                            <TimePicker
                                                minuteInterval={60}
                                                deactivatedTimes={deactivatedEndTimes}
                                                selectedTime={endTime}
                                                onChange={handleEndTimeChange}
                                            />
                                        </div>
                                    </div> :
                                    <p className="text-center font-bold">Select work space before choosing date and time.</p>
                            }

                        </FormGroup>
                    </Form>
                    <div>
                        <p>Selected reservation:</p>
                        <div className="grid grid-cols-3">
                            <div className="flex justify-center">
                                {
                                    (startDate && startTime) && <p className="mt-auto mb-auto text-center align-middle">From: <span className="font-bold">{startDate.toLocaleDateString()} {startTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span></p>
                                }
                            </div>
                            <div className="text-center text-4xl">
                                &rarr;
                            </div>
                            <div className="flex justify-center">
                                {
                                    (endDate && endTime) && <p className="mt-auto mb-auto text-center align-middle ">To: <span className="font-bold">{endDate.toLocaleDateString()} {endTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span></p>
                                }
                            </div>
                        </div>
                    </div>
                </ModalBody>
                <ModalFooter>
                    <Button color="primary" onClick={() => {
                        if (validateForm()) {
                            toggleModal();
                            (props.onReservationSubmit && reservationData) ? props.onReservationSubmit(reservationData) : null
                            setReservationData({ endTime: new Date(), startTime: new Date(), name: "", user: "", workspace: "", active: false });
                            setStartDate(undefined);
                            setEndDate(undefined);
                            setStartTime(undefined);
                            setEndTime(undefined);
                        }
                    }}>Submit</Button>
                    <Button color="secondary" onClick={() => {
                        toggleModal(); setReservationData({ endTime: new Date(), startTime: new Date(), name: "", user: "", workspace: "", active: false }); setStartDate(undefined);
                        setEndDate(undefined);
                        setStartTime(undefined);
                        setEndTime(undefined);
                    }}>Cancel</Button>
                </ModalFooter>
            </Modal>
        </>
    );
}

export default ReservationFormModal;

