"use client";

import { useQuery } from "@tanstack/react-query";
import { DateTime } from "luxon";
import { useEffect, useState } from "react";

import Chart from "@/components/Chart";
import Error from "@/components/Error";
import Loader from "@/components/Loader";
import {
    IntensityResponse,
    TimeRange,
    fetchIntensity,
} from "@/networking/requests";
import TimePicker from "@/components/TimePicker";

import "react-datetime-picker/dist/DateTimePicker.css";
import "react-calendar/dist/Calendar.css";
import TimeZonePicker from "@/components/TimeZonePicker";

export default function Home() {
    const [isClient, setIsClient] = useState(false);
    const [timezone, setTimeZone] = useState<string>(
        Intl.DateTimeFormat().resolvedOptions().timeZone,
    );
    // By default, we want to show today's data
    const [timeRange, setTimeRange] = useState<TimeRange>({
        start: DateTime.now().startOf("day").setZone(timezone),
        end: DateTime.now().endOf("day").setZone(timezone),
    });

    useEffect(() => {
        setIsClient(true);
    }, []);

    // We want to update this only when the timezone changes.
    useEffect(() => {
        setTimeRange({
            start: timeRange.start.setZone(timezone),
            end: timeRange.end.setZone(timezone),
        });
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [timezone]);

    const { isPending, error, data } = useQuery<IntensityResponse>({
        queryKey: ["carbon-intensity", timeRange],
        queryFn: () => fetchIntensity(timeRange),
    });

    // We don't want anything to be rendered on the server.
    if (!isClient) {
        return null;
    }

    return (
        <main className="m-auto flex max-w-[800px] flex-col justify-center p-8">
            <div className="m-auto max-w-[500px]">
                <div className="flex w-full max-w-[500px] flex-col pb-4">
                    <TimeZonePicker
                        timezone={timezone}
                        onChange={setTimeZone}
                    />
                </div>
                <div className="m-auto flex flex-col">
                    <div className="flex flex-row justify-center space-x-8">
                        <TimePicker
                            value={timeRange.start}
                            timezone={timezone}
                            onChange={(start) =>
                                setTimeRange({ ...timeRange, start })
                            }
                        />
                        <span className="leading-[32px]">to</span>
                        <TimePicker
                            value={timeRange.end}
                            timezone={timezone}
                            onChange={(end) =>
                                setTimeRange({ ...timeRange, end })
                            }
                            minDate={timeRange.start}
                        />
                    </div>
                </div>
            </div>
            <div className="flex w-full justify-center pt-8">
                {isPending ? (
                    <Loader />
                ) : error ? (
                    <Error error={error} />
                ) : "error" in data ? (
                    <Error error={data} />
                ) : (
                    <Chart data={data} timezone={timezone} />
                )}
            </div>
        </main>
    );
}
