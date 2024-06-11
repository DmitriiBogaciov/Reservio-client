interface TimeProps {

    time: Date,
    highlighted?: boolean,
    deactivated?: boolean
}

interface TimePickerProps {
    minuteInterval: number,
    onSelectedTimeHandler?: (time: Date,e?:React.MouseEvent<HTMLElement>) => void,
    //We can highlight specific time or all times in a interval 
    highlightedTimes?: Array<Date | Array<Date>>
    deactivatedTimes?: Array<Date | Array<Date>>
}

export type {TimeProps, TimePickerProps}