import { APIGatewayProxyEventV2, APIGatewayProxyResult } from "aws-lambda";

import { createTodosController } from "@/composition-root";
import { responseHelper } from "@/shared/helpers/response-helper";
import { AppError } from "@/domain/errors/app-error";

const controller = createTodosController();

/**
 * Handles incoming API Gateway HTTP API (v2) requests and routes them to the appropriate controller methods.
 *
 * @summary Main handler function for API Gateway HTTP API requests.
 *
 * @description
 * This function processes incoming requests from API Gateway v2 (HTTP API),
 * determines the HTTP method from event.requestContext.http.method,
 * and delegates the request to the corresponding controller method.
 * It also handles errors and returns appropriate HTTP responses.
 *
 * @param event The incoming API Gateway v2 event.
 * @returns A promise that resolves to an API Gateway proxy result.
 */
export const handler = async (
  event: APIGatewayProxyEventV2
): Promise<APIGatewayProxyResult> => {
  try {
    const method = event.requestContext.http.method;

    if (method === "GET") {
      return controller.getTodos(event);
    }

    if (method === "POST") {
      return controller.createTodo(event);
    }

    return responseHelper(405, {
      message: `Method ${method} not allowed`,
    });
  } catch (error) {
    console.error("Error handling request:", error);

    if (error instanceof AppError) {
      return responseHelper(error.statusCode, {
        message: error.message,
      });
    }

    return responseHelper(500, {
      message: "Internal server error",
    });
  }
};
