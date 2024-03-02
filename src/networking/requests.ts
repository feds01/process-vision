import { DateTime } from "luxon";
import { z } from "zod";

export type TimeRange = {
    start: DateTime;
    end: DateTime;
};

/** Error shape from the API */
const IntensityErrorResponseSchema = z.object({
    error: z.object({
        message: z.string(),
        code: z.string(),
    }),
});

export type IntensityErrorResponse = z.infer<
    typeof IntensityErrorResponseSchema
>;

const IntensityDataPointSchema = z.object({
    from: z.string(),
    to: z.string(),
    intensity: z.object({
        forecast: z.number(),
        actual: z.number().nullable(),
        index: z.string(),
    }),
});

export type IntensityDataPoint = z.infer<typeof IntensityDataPointSchema>;

/** Data from the API */
const IntensityDataResponseSchema = z.object({
    data: z.array(IntensityDataPointSchema),
});

export type IntensityDataResponse = z.infer<typeof IntensityDataResponseSchema>;

const IntensityResponseSchema = z.union([
    IntensityDataResponseSchema,
    IntensityErrorResponseSchema,
]);

export type IntensityResponse = z.infer<typeof IntensityResponseSchema>;

export const fetchIntensity = async (range: TimeRange): Promise<IntensityResponse> => {
    const response = await fetch(
        `https://api.carbonintensity.org.uk/intensity/${range.start.toUTC()}/${range.end.toUTC()}`,
    );

    const data = await response.json();
    const parsedResponse = IntensityResponseSchema.safeParse(data);

    if (!parsedResponse.success) {
        return { error: { message: "Invalid API response", code: "invalid_response" } };
    }

    return parsedResponse.data;
}
