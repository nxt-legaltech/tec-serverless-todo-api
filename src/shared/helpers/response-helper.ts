import { APIGatewayProxyResult } from "aws-lambda";

/**
 * Response for API Gateway
 * @param statusCode The HTTP status code for the response
 * @param body The body of the response, which will be JSON-stringified
 * @returns An APIGatewayProxyResult object
 */
export const responseHelper = (
  statusCode: number,
  body: unknown
): APIGatewayProxyResult => ({
  /**
   * The HTTP status code for the response
   */
  statusCode,
  /**
   * The headers for the response, including content type and CORS settings
   */
  headers: {
    "Content-Type": "application/json",
    "Access-Control-Allow-Origin": "*",
  },
  body: JSON.stringify(body),
});
