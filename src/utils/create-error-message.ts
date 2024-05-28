/**
 * Create custom error message
 * @param data data to create error message
 * @returns custom error message
 */

export const createErrorMessage = ({
  customMessage,
  error,
}: {
  customMessage: string;
  error: any;
}) => {
  return `${customMessage}
  ${error}`;
};
