"use client";

import { useQuery } from "@tanstack/react-query";
import { DateTime } from "luxon";
import { useState } from "react";

import Chart from "@/components/Chart";
import Error from "@/components/Error";
import Loader from "@/components/Loader";
import { IntensityResponse } from "@/networking/requests";

export type TimeRange = {
  start: DateTime;
  end: DateTime;
};

export default function Home() {
  // By default, we want to show today's data
  const [timeRange, setTimeRange] = useState<TimeRange>({
    start: DateTime.now().startOf("day"),
    end: DateTime.now().endOf("day"),
  });

  const { isPending, error, data } = useQuery<IntensityResponse>({
    queryKey: ["carbon-intensity", timeRange],
    queryFn: () =>
      fetch(
        `https://api.carbonintensity.org.uk/intensity/${timeRange.start.toISO()}/${timeRange.end.toISO()}`,
      ).then((res) => res.json()),
  });

  return (
    <main className="">
      <div className="m-auto">
        <h1>Carbon App</h1>
      </div>
      <div className="p-8">
        <h2>Time Range</h2>
        <p>
          {timeRange.start.toLocaleString(DateTime.DATETIME_MED)} -{" "}
          {timeRange.end.toLocaleString(DateTime.DATETIME_MED)}
        </p>
        <div className="pt-8">
          {isPending ? (
            <Loader />
          ) : error || "error" in data ? (
            <Error error={error} />
          ) : (
            <Chart data={data} />
          )}
        </div>
      </div>
    </main>
  );
}
