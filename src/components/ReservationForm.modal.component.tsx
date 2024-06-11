import { Modal, ModalBody, ModalHeader, ModalFooter, Button, Form, FormGroup, Label, Input } from "reactstrap";
import { useEffect, useState } from "react";
import DatePicker from "react-datepicker";
import TimePicker from "@/components/TimePicker";

function ReservationFormModal(props: ReservationFormModalProps) {
    const [modalOpen, setModalOpen] = useState(false);
    const [reservationData, setReservationData] = useState<ReservationDataProps>({ name: "", startTime: new Date(), endTime: new Date() });
    const toggleModal = () => {
        setModalOpen(!modalOpen);
    };
    const [startDate, setStartDate] = useState<Date>(new Date());
    const [endDate, setEndDate] = useState<Date>(new Date());
    const [startTime, setStartTime] = useState<Date | null>(null);
    const [deactivatedStartTimes, setDeactivatedStartTimes] = useState<Date | Date[] | null>(null);
    const [endTime, setEndTime] = useState<Date | null>(null);
    const [deactivatedEndTimes, setDeactivatedEndTimes] = useState<(Date | Date[])[]>([]);


    useEffect(() => {
        //deactivating to not allow end date before start date
        if (startTime && endDate?.getDate() == startDate?.getDate()) {
            setDeactivatedEndTimes([[new Date('2024-06-15T00:00'), startTime]]);
        }
        else if (endDate && startDate && endDate?.getDate() < startDate?.getDate()) {
            setDeactivatedEndTimes([[new Date('2024-06-15T00:00'), new Date('2024-06-15T23:30')]]);
        }
        else {
            setDeactivatedEndTimes([]);
        }
    }, [startTime, endDate, startDate]);


    const handleNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (reservationData) {
            setReservationData({ ...reservationData, name: event.target.value });
        }
    };

    const handleWorkSpaceChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (reservationData) {
            setReservationData({ ...reservationData, workspace: event.target.value });
        }
    };

    const handleWorkPlaceChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (reservationData) {
            setReservationData({ ...reservationData, user: event.target.value });
        }
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
        setStartTime(time);
    };

    const handleEndTimeChange = (time: Date | null) => {
        setEndTime(time);
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
                            <Input type="text" name="name" id="name" placeholder="Enter your name" value={reservationData?.name || ""} onChange={handleNameChange} />
                        </FormGroup>
                        <FormGroup>
                            <Label for="name">Work Space</Label>
                            <Input type="text" name="name" id="name" placeholder="Enter your name" value={reservationData?.workspace || ""} onChange={handleWorkSpaceChange} />
                        </FormGroup>
                        <FormGroup>
                            <Label for="name">Work Place</Label>
                            <Input type="text" name="name" id="name" placeholder="Enter your name" value={reservationData?.user || ""} onChange={handleWorkPlaceChange} />
                        </FormGroup>
                        <FormGroup>
                            <div className="grid grid-cols-1 lg:grid-cols-2">
                                <div>
                                    <h3>Starts from:</h3>
                                    <DatePicker
                                        showIcon
                                        selected={startDate}
                                        onChange={handleStartDateChange}
                                    />
                                    <TimePicker
                                        deactivatedTimes={deactivatedStartTimes}
                                        onSelectedTimeHandler={handleStartTimeChange}
                                        minuteInterval={30}
                                    />
                                </div>
                                <div>
                                    <h3>Ends at:</h3>
                                    <DatePicker
                                        showIcon
                                        selected={endDate}
                                        onChange={handleEndDateChange}
                                    />
                                    <TimePicker
                                        minuteInterval={30}
                                        deactivatedTimes={deactivatedEndTimes}
                                        onSelectedTimeHandler={handleEndTimeChange}
                                    />
                                </div>
                            </div>
                        </FormGroup>
                        <FormGroup>
                            <Label for="message">Message</Label>
                            <Input type="textarea" name="message" id="message" placeholder="Enter your message" />
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
                    <Button color="primary" onClick={() => { toggleModal(); console.log(reservationData); (props.onReservationSubmit && reservationData) ? props.onReservationSubmit(reservationData) : null }}>Submit</Button>
                    <Button color="secondary" onClick={toggleModal}>Cancel</Button>
                </ModalFooter>
            </Modal>
        </>
    );
}

    export default ReservationFormModal;

