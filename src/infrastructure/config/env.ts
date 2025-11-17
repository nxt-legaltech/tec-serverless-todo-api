/**
 * Environment configuration
 *
 * @summary
 * Environment configuration for the application
 *
 * @description
 * This module exports an object containing environment variables
 * used for configuring the application, such as AWS region and DynamoDB table name.
 */
export const env = {
  region: process.env.AWS_REGION ?? "us-east-1",
  tableName: process.env.TABLE_NAME ?? "tec-practicantes-todo",
};
