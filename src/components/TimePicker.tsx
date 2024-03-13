import { DateTime } from "luxon";
import React, { useEffect } from "react";
import DateTimePicker from "react-datetime-picker";

type TimePickerProps = {
    /** The time that the user has selected. */
    onChange: (time: DateTime) => void;

    /** The value that is currently selected. */
    value: DateTime;

    /**
     * Timezone that is selected by the user in order to
     * shift the time to the correct timezone.
     */
    timezone: string;

    /** The minimum date that must be selected */
    minDate?: DateTime;
};

const TimePicker = ({
    value,
    timezone,
    minDate,
    onChange,
}: TimePickerProps) => {
    const [time, setTime] = React.useState<DateTime>(value);

    useEffect(() => {
        setTime(value);
    }, [value]);

    return (
        <DateTimePicker
            disableClock
            onChange={(value) =>
                value &&
                onChange(DateTime.fromJSDate(value, { zone: timezone }))
            }
            value={time.toJSDate()}
            {...(minDate && { minDate: minDate.toJSDate() })}
        />
    );
};

export default TimePicker;
