# TEC Serverless Todo API – Deployment & Flow Preview

<p align="justify">
This document provides a complete and visually structured overview of the Serverless TODO API, implemented using AWS Lambda (Node.js + TypeScript), API Gateway (HTTP API), and DynamoDB. All sections are organized similarly to a UI preview, but adapted for AWS infrastructure, with screenshots referenced by filename.
</p>

## 1.DynamoDB Table

The application uses a DynamoDB table to store Todo items.

**Configuration**

- **Table Name**: `tec-practicantes-todo`
- **Partition Key**: `id` (String)
- **Capacity Mode**: On-Demand
- **Secondary Indexes**: Not required for this simple application.

**Screenshots**

## 2. Lambda Functions

<p align="justify">
The core logic is implemented inside an AWS Lambda function using TypeScript, clean architecture principles, and dependency injection.
</p>

**Features**

- **GET** `/todos`: Retrieve all Todo items.
- **POST** `/todos`: Create a new Todo item.
- Validation and error handling
- UUID generation with `randomUUID()`
- Error handling using `AppError` class.
- Full use of Domain, Application, and Infrastructure and Interface layers.

**Environment Variables**

- `TABLE_NAME`: Name of the DynamoDB table (`tec-practicantes-todo`)
- `AWS_REGION`: AWS region where the resources are deployed (e.g., `us-east-1`)

**Screenshots**

## 3. API Gateway

<p align="justify">
An <strong>API Gateway (HTTP API)</strong> exposes the Lambda function to the internet through clean REST-like routes.
</p>

**Routes**

- **GET** `/todos`: Invokes the Lambda function to retrieve all Todo items.
- **POST** `/todos`: Invokes the Lambda function to create a new Todo item.

**Integration**
Both routes are integrated with the same Lambda function, which handles the routing logic based on the HTTP method. (`tec-serverless-todo-api`)

**Invoke URL Example**

```
https://your-api-id.execute-api.your-region.amazonaws.com/todos
```

**Screenshots**

## 4. End-to-End Flow (Postman)

### GET /todos

**Request**

```
GET https://your-api-id.execute-api.your-region.amazonaws.com/todos
```

**Response**

```json
200 OK
{
    "items": [
        {
            "id": "913b39a0-b4e2-4c9a-8f52-e063a1d8e499",
            "title": "Something from API Gateway",
            "completed": false
        }
    ]
}
```

### POST /todos

**Request**

```
POST https://your-api-id.execute-api.your-region.amazonaws.com/todos
Content-Type: application/json
{
    "title": "Sample Todo"
}
```

**Response**

```json
200 OK
{
  "item": {
    "id": "uuid-generated",
    "title": "Mi primer TODO desde API Gateway",
    "completed": false
  }
}
```

**Screenshots**

## 5. Screenshot Folder Structure
<p align="justify">
The following is the folder structure where all referenced screenshots are stored for easy access and organization.
</p>

```
docs/
└── screenshots/
    ├── create-table.png
    ├── dynamodb-settings.png
    ├── dynamodb-active.png
    ├── lambda-config.png
    ├── lambda-env-vars.png
    ├── lambda-test-get.png
    ├── lambda-test-post.png
    ├── api-gateway-routes.png
    ├── api-gateway-integration.png
    ├── api-gateway-url.png
    ├── postman-get.png
    ├── postman-post.png
    └── SERVERLESS_API_PREVIEW.txt
```
