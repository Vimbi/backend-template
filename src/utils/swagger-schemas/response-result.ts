import {
  ReferenceObject,
  SchemaObject,
} from '@nestjs/swagger/dist/interfaces/open-api-spec.interface';

/**
 * Create api property response
 * @param properties api object properties
 * @returns api object schema
 */

export const responseResult = (
  properties: Record<string, SchemaObject | ReferenceObject> = {},
) => ({
  schema: {
    type: 'object',
    properties: {
      result: { type: 'boolean' },
      ...properties,
    },
  },
});
