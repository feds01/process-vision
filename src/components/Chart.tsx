import { IntensityDataResponse } from "@/networking/requests";
import React, { useEffect } from "react";
import {
    Chart,
    LineController,
    CategoryScale,
    LinearScale,
    TimeScale,
    TimeSeriesScale,
    PointElement,
    LineElement,
    Legend,
    Title,
    Tooltip,
} from "chart.js";
import { DateTime } from "luxon";

Chart.register(
    LineController,
    CategoryScale,
    LinearScale,
    TimeScale,
    PointElement,
    LineElement,
    TimeSeriesScale,
    Legend,
    Title,
    Tooltip,
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
                labels: data.data.map((point) =>
                    // NOTE: Ideally, we'd use a time scale here, but it seems awkward to configure in order
                    // to show dates that are human readable when larger time ranges are selected.
                    DateTime.fromISO(point.from, {zone: 'utc'}).toLocaleString({
                        weekday: "short",
                        month: "short",
                        day: "2-digit",
                        hour: "2-digit",
                        minute: "2-digit",
                    }),
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
                scales: {
                    x: {
                        title: {
                            display: true,
                            text: "Time",
                            font: {
                                family: "Roboto, sans-serif",
                            },
                        },
                    },
                    y: {
                        title: {
                            display: true,
                            text: "Carbon intensity",
                            font: {
                                family: "Roboto, sans-serif",
                            },
                        },
                    },
                },
                plugins: {
                    title: {
                        display: true,
                        text: "Carbon intensity",
                        font: {
                            family: "Roboto, sans-serif",
                        },
                    },
                    legend: {
                        display: true,
                        position: "top",
                        labels: {
                            font: {
                                family: "Roboto, sans-serif",
                            },
                        },
                    },
                    tooltip: {
                        callbacks: {
                            label: (context) => {
                                const label = context.dataset.label || "";
                                const value = context.parsed.y || "";
                                return `${label}: ${value} gCO2/kWh`;
                            },
                        },
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
