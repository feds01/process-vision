import { DateTime } from "luxon";
import React, { useEffect } from "react";
import DateTimePicker from "react-datetime-picker";

type TimePickerProps = {
    /** The time that the user has selected. */
    onChange: (time: DateTime) => void;

    /** The value that is currently selected. */
    value: DateTime;

    /** The minimum date that must be selected */
    minDate?: DateTime;
};

const TimePicker = ({ value, minDate, onChange }: TimePickerProps) => {
    const [time, setTime] = React.useState<DateTime>(value);

    useEffect(() => {
        setTime(value);
    }, [value]);

    return (
        <DateTimePicker
            disableClock
            onChange={(value) => value && onChange(DateTime.fromJSDate(value))}
            value={time.toJSDate()}
            {...(minDate && { minDate: minDate.toJSDate() })}
        />
    );
};

export default TimePicker;
