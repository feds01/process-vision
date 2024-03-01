import React from "react";

type ErrorProps = {
    /** The error that occurred when performing some operation. */
    error: Error | null;
};

const ErrorWrapper = (props: ErrorProps) => {
    return <div>Error</div>;
};

export default ErrorWrapper;
