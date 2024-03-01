import {
  IntensityDataResponse,
  IntensityResponse,
} from "@/networking/requests";
import React, { useEffect } from "react";
import {
  Chart,
  LineController,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
} from "chart.js";
import { DateTime } from "luxon";

Chart.register(
  LineController,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
);

type ChartProps = {
  data: IntensityDataResponse;
};

const ChartRenderer = ({ data }: ChartProps) => {
  const ref = React.useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const ctx = ref.current;

    if (!ctx) {
      return;
    }

    const chart = new Chart(ctx, {
      type: "line",
      data: {
        // TODO: use zod transformer
        labels: data.data.map((point) =>
          DateTime.fromISO(point.from).toLocaleString(DateTime.TIME_SIMPLE),
        ),
        datasets: [
          {
            label: "Forecast",
            data: data.data.map((point) => point.intensity.forecast),
            borderColor: "blue",
            fill: false,
          },
          {
            label: "Actual",
            data: data.data.map((point) => point.intensity.actual),
            borderColor: "green",
            fill: false,
          },
        ],
      },
    });

    return () => chart.destroy();
  }, [data]);

  return (
    <div>
      <canvas ref={ref} width="400" height="400" />
    </div>
  );
};

export default ChartRenderer;
