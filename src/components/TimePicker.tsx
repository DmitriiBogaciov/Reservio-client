import { useEffect, useState, useCallback } from "react";

// Custom props
import { TimeProps, TimePickerProps } from "@/props/TimePicker.props";

const TimePicker = (props: TimePickerProps) => {
    const totalMinutesInDay = 24 * 60;

    const setUpTime = (minuteInterval: number) => {
        let newTimes: Array<TimeProps> = [];
        for (let i = 0; i < totalMinutesInDay; i += minuteInterval) {
            let time: TimeProps = { time: new Date(), highlighted: false };
            time.time.setHours(0);
            time.time.setMinutes(i);
            newTimes.push(time);
        }
        return newTimes;
    }

    const [times, setTimes] = useState<Array<TimeProps>>([]);
    const [selectedTime, setSelectedTime] = useState<Date | null>(null);

    const setHighlightedTime = useCallback((startHighlightedTime: Date, endHighlightedTime?: Date) => {
        setTimes(prevTimes =>
            prevTimes.map((time) => {
                let newTime = { ...time }; // Clone the time object to avoid direct mutation
                startHighlightedTime.setDate(time.time.getDate());
                if (endHighlightedTime) {
                    endHighlightedTime.setDate(time.time.getDate());
                    if (time.time.getTime() >= startHighlightedTime.getTime() && time.time.getTime() <= endHighlightedTime.getTime() + props.minuteInterval * 60 * 1000) {
                        newTime.highlighted = true;
                    }
                } else {
                    if (startHighlightedTime.getMinutes() === time.time.getMinutes() && startHighlightedTime.getHours() === time.time.getHours()) {
                        newTime.highlighted = true;
                    }
                }
                return newTime;
            })
        );
    }, []);

    const setDeactivatedTime = useCallback((startDeactivatedTime: Date, endDeactivatedTime?: Date) => {
        setTimes(prevTimes =>
            prevTimes.map((time) => {
                let newTime = { ...time }; // Clone the time object to avoid direct mutation
                startDeactivatedTime.setDate(time.time.getDate());
                if (endDeactivatedTime) {
                    endDeactivatedTime.setDate(time.time.getDate());
                    if (time.time.getTime() >= startDeactivatedTime.getTime() && time.time.getTime() <= endDeactivatedTime.getTime() + props.minuteInterval * 60 * 1000) {
                        newTime.deactivated = true;
                    }
                } else {
                    if (startDeactivatedTime.getMinutes() === time.time.getMinutes() && startDeactivatedTime.getHours() === time.time.getHours()) {
                        newTime.deactivated = true;
                    }
                }
                return newTime;
            })
        );
    }, []);

    useEffect(() => {
        if (props.minuteInterval > 0) {
            const newTimes = setUpTime(props.minuteInterval);
            setTimes(newTimes);
        }
        console.log(props.highlightedTimes)

        if (props.highlightedTimes) {
            for (const highlightedTime of props.highlightedTimes) {
                if (Array.isArray(highlightedTime)) {
                    if (highlightedTime[0] && highlightedTime[1]) {
                        const [startDate, endDate] = highlightedTime;
                        setHighlightedTime(startDate, endDate);
                    }
                } else {
                    setHighlightedTime(highlightedTime);
                }
            }
        }
        if (props.deactivatedTimes) {
            for (const deactivatedTime of props.deactivatedTimes) {
                if (Array.isArray(deactivatedTime)) {
                    if (deactivatedTime[0] && deactivatedTime[1]) {
                        const [startDate, endDate] = deactivatedTime;
                        setDeactivatedTime(startDate, endDate);
                    }
                } else {
                    setDeactivatedTime(deactivatedTime);
                }
            }
        }

        
    }, [props.minuteInterval, props.highlightedTimes, props.deactivatedTimes]);

    useEffect(() => {
        if (selectedTime)
            setTimes(prevTimes =>
                prevTimes.map((t) => ({
                    ...t,
                    selected: t.time.getTime() === selectedTime.getTime()
                }))
            );
    }, [selectedTime]);

    const onClickTimeHandler = (time: TimeProps) => {
        setSelectedTime(time.time);

        setTimes(prevTimes =>
            prevTimes.map((t) => ({
                ...t,
                selected: t.time.getTime() === time.time.getTime()
            }))
        );

        if (props.onSelectedTimeHandler) {
            props.onSelectedTimeHandler(time.time);
        }
    };



    return (
        <div className="max-h-[300px] overflow-y-scroll">
            <h3>Select Reservation Date and Time</h3>

            <div className={"grid grid-cols-2"}>
                {times.map((time, index) => (
                    <div
                        key={index}
                        className={`time-slot p-3 m-2 transition-[250ms] select-none scale-[1.05] ${(selectedTime?.getHours() === time.time.getHours() &&
                            selectedTime?.getMinutes() === time.time.getMinutes())
                            ? 'bg-green-500'
                            : ' bg-slate-300'
                            } ${time.highlighted ? 'bg-red-500' : ''} ${time.deactivated ? 'bg-slate-500 opacity-50' : 'cursor-pointer'
                            }`}
                        onClick={() => (!time.deactivated ? onClickTimeHandler(time) : '')}
                    >
                        <p>{time.time.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</p>
                    </div>
                ))}
            </div>
        </div>
    );
}
export default TimePicker;


