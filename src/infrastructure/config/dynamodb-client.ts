import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import { env } from "./env";
import { DynamoDBDocumentClient } from "@aws-sdk/lib-dynamodb";

/**
 * DynamoDB Client
 *
 * @summary
 * This client is configured to interact with the DynamoDB service.
 * It uses the AWS region specified in the environment configuration.
 *
 * @description
 * The DynamoDBClient is instantiated with the region obtained from the env configuration.
 * This allows the application to connect to the appropriate AWS region for DynamoDB operations.
 *
 * @see {@link https://docs.aws.amazon.com/AWSJavaScriptSDK/v3/latest/clients/client-dynamodb/classes/dynamodbclient.html DynamoDBClient}
 */
const rawClient = new DynamoDBClient({
  region: env.region,
});

/**
 * DynamoDB Document Client
 * 
 * @summary
 * This client is a higher-level abstraction over the DynamoDBClient,
 * providing a more convenient way to work with DynamoDB items.
 * 
 * @description
 * The DynamoDBDocumentClient is created from the raw DynamoDBClient.
 * It includes marshall options to remove undefined values from items,
 * ensuring cleaner data storage and retrieval.
 * 
 * @see {@link https://docs.aws.amazon.com/AWSJavaScriptSDK/v3/latest/clients/client-dynamodb/classes/dynamodbdocumentclient.html DynamoDBDocumentClient}
 */
export const dynamodbClient = DynamoDBDocumentClient.from(rawClient, {
    marshallOptions: {
        removeUndefinedValues: true,
    }
});