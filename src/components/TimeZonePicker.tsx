import { DateTime } from "luxon";
import React, { useMemo } from "react";

type TimeZonePickerProps = {
    /**
     * Timezone that is selected by the user in order to
     * shift the time to the correct timezone.
     */
    timezone: string;

    /** Updater callback. */
    onChange: (timezone: string) => void;
};

// https://github.com/moment/luxon/blob/master/docs/zones.md

// https://baseweb.design/components/timezone-picker/

// https://stackoverflow.com/questions/71108750/to-get-time-zone-offset-value-based-on-offset-name-in-luxon

export default function TimeZonePicker({
    timezone,
    onChange,
}: TimeZonePickerProps) {
    const options = useMemo(() => {
        return Intl.supportedValuesOf("timeZone").map((option) => ({
            name: option,
            offset: DateTime.local().setZone(option).toFormat("ZZ"),
        }));
    }, []);

    return (
        <select
            onChange={(event) => onChange(event.target.value)}
            defaultValue={timezone}
            className="border-r-[16px] bg-[transparent] border-r-[transparent] outline outline-[#808080] w-full p-2 text-base"
        >
            {options.map((option) => (
                <option key={option.name} value={option.name}>
                    {option.name} - UTC{option.offset}
                </option>
            ))}
        </select>
    );
}
