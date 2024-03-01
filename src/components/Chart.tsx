import { IntensityDataResponse } from "@/networking/requests";
import React, { useEffect } from "react";
import {
    Chart,
    LineController,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Legend,
    Title,
} from "chart.js";
import { DateTime } from "luxon";

Chart.register(
    LineController,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Legend,
    Title,
);

type ChartProps = {
    /** The data to render. */
    data: IntensityDataResponse;

    /** The size of the chart. */
    size?: number;
};

const ChartRenderer = ({ data, size = 600 }: ChartProps) => {
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
                    DateTime.fromISO(point.from).toLocaleString(
                        DateTime.TIME_SIMPLE,
                    ),
                ),
                datasets: [
                    {
                        label: "Forecast",
                        data: data.data.map(
                            (point) => point.intensity.forecast,
                        ),
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
            options: {
                plugins: {
                    title: {
                        display: true,
                        text: "Carbon intensity",
                    },
                    legend: {
                        display: true,
                        position: "top",
                    },
                },
            },
        });

        return () => chart.destroy();
    }, [data]);

    return (
        <div>
            <canvas ref={ref} width={size} height={size} />
        </div>
    );
};

export default ChartRenderer;
