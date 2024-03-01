import { DateTime } from "luxon";
import React, { useEffect } from "react";
import DateTimePicker from "react-datetime-picker";

type TimePickerProps = {
    /** The time that the user has selected. */
    onChange: (time: DateTime) => void;

    /** The value that is currently selected. */
    value: DateTime;
};

const TimePicker = ({ value, onChange }: TimePickerProps) => {
    const [time, setTime] = React.useState<DateTime>(value);

    useEffect(() => {
        setTime(value);
    }, [value]);

    return (
        <DateTimePicker
            onChange={(value) => value && onChange(DateTime.fromJSDate(value))}
            value={time.toJSDate()}
        />
    );
};

export default TimePicker;
