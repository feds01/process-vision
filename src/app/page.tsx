"use client";

import { useQuery } from "@tanstack/react-query";
import { DateTime } from "luxon";
import { useEffect, useState } from "react";

import Chart from "@/components/Chart";
import Error from "@/components/Error";
import Loader from "@/components/Loader";
import { IntensityResponse, TimeRange, fetchIntensity } from "@/networking/requests";
import TimePicker from "@/components/TimePicker";

import "react-datetime-picker/dist/DateTimePicker.css";
import "react-calendar/dist/Calendar.css";

export default function Home() {
  const [isClient, setIsClient] = useState(false);
  // By default, we want to show today's data
  const [timeRange, setTimeRange] = useState<TimeRange>({
    start: DateTime.now().startOf("day"),
    end: DateTime.now().endOf("day"),
  });

  useEffect(() => {
    setIsClient(true);
  }, []);

  const { isPending, error, data } = useQuery<IntensityResponse>({
    queryKey: ["carbon-intensity", timeRange],
    queryFn: () => fetchIntensity(timeRange),
  });

  // We don't want anything to be rendered on the server.
  if (!isClient) {
    return null;
  }

  return (
    <main className="w-max-800 flex flex-col justify-center p-8">
      <div className="m-auto flex flex-col">
        <div className="flex flex-row justify-center space-x-8">
          <TimePicker
            value={timeRange.start}
            onChange={(start) =>
              setTimeRange({ ...timeRange, start })
            }
          />
          <span className="leading-[32px]">to</span>
          <TimePicker
            value={timeRange.end}
            onChange={(end) => setTimeRange({ ...timeRange, end })}
            minDate={timeRange.start}
          />
        </div>
        <div className="flex w-full pt-8 justify-center">
          {isPending ? (
            <Loader />
          ) : error ? (
            <Error error={error} />
          ) : "error" in data ? (
            <Error error={data} />
          ) : (
            <Chart data={data} />
          )}
        </div>
      </div>
    </main>
  );
}
