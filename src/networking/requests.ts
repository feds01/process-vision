import { z } from "zod";

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
    actual: z.number(),
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
