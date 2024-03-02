import { IntensityErrorResponse } from "@/networking/requests";
import React from "react";

type ErrorProps = {
    /** The error that occurred when performing some operation. */
    error: Error | IntensityErrorResponse | null;
};

const ErrorWrapper = ({ error }: ErrorProps) => {
    return (
        <div>
            <p>Couldn&apos;t load data</p>
            {error && error instanceof Error ? (
                <p>{error.message}</p>
            ) : (
                <p>{error?.error.message}</p>
            )}
        </div>
    );
};

export default ErrorWrapper;
