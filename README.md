# TEC Serverless Todo API

## Summary

<p align="justify">
A serverless REST API built with AWS Lambda, Node.js, and TypeScript for managing todo items stored in DynamoDB. The application implements a clean layered architecture with clear separation of concerns, following Domain-Driven Design (DDD) principles and the CQRS (Command Query Responsibility Segregation) pattern. It supports GET and POST operations with comprehensive input validation, structured error handling, and type safety throughout the codebase.
</p>

## Deployment Process

<p align="justify">
The deployment process for the Serverless Todo API involves packaging the application code and deploying it to AWS using the AWS CLI. Below are the general steps to deploy the application:
</p>

[Deployment & Flow Preview](/docs/DEPLOYMENT_PROCESS.md)

## Features

- Serverless Architecture with AWS Lambda
- RESTful API with API Gateway HTTP API (v2)
- DynamoDB for Data Persistence
- Domain-Driven Design (DDD) Architecture
- CQRS Pattern Implementation
- Assembler Pattern for Data Transformation
- Dependency Injection via Composition Root
- Input Validation and Error Handling
- TypeScript Type Safety
- Path Aliases for Clean Imports
- Environment-based Configuration

## Technology Stack

- **Runtime:** Node.js with AWS Lambda
- **Language:** TypeScript 5.9.3
- **Cloud Platform:** AWS (Lambda, API Gateway, DynamoDB)
- **AWS SDK:** @aws-sdk/client-dynamodb 3.932.0
- **AWS SDK:** @aws-sdk/lib-dynamodb 3.932.0
- **Build Tools:** TypeScript Compiler, tsc-alias 1.8.16
- **Type Definitions:** @types/aws-lambda 8.10.158, @types/node 24.10.1

## Architecture

The application follows a clean layered architecture approach with strict separation of concerns, organized into distinct layers:

### Domain Layer

The Domain layer contains the core business logic, entities, and interfaces, independent of external frameworks and infrastructure.

**Entities:**

- **Todo:** Core domain entity representing a todo item with properties:
  - `id` - Unique identifier (UUID)
  - `title` - Todo item description
  - `completed` - Completion status (boolean)

**Commands:**

- **CreateTodoCommand:** Command object for creating new todo items
  - Contains: `title` property

**Queries:**

- **GetTodosQuery:** Query object for retrieving all todo items
  - Parameter-less query interface

**Repository Interfaces:**

- **TodoRepository:** Repository contract extending BaseRepository
  - Defines data access operations for Todo entities
  - Inherits: `fetchAll()`, `fetchById()`, `save()`

**Service Interfaces:**

- **ICommandHandler<TCommand, TResult>:** Generic interface for command handlers
- **IQueryHandler<TQuery, TResult>:** Generic interface for query handlers

**Errors:**

- **AppError:** Custom error class with HTTP status code support
  - Default status code: 400
  - Extends built-in Error class

### Application Layer

The Application layer orchestrates business workflows by implementing command and query handlers.

**Command Handlers:**

- **CreateTodoCommandHandler:** Handles todo creation
  - Generates UUID for new todos
  - Initializes todos with `completed: false`
  - Delegates persistence to TodoRepository
  - Returns created Todo entity

**Query Handlers:**

- **GetTodosQueryHandler:** Handles todo retrieval
  - Fetches all todos from TodoRepository
  - Returns array of Todo entities

<p align="justify">
This layer implements the CQRS pattern, separating read operations (queries) from write operations (commands), providing clear boundaries between different types of operations.
</p>

### Infrastructure Layer

The Infrastructure layer handles external concerns such as database communication, configuration, and data transformation.

**Persistence:**

- **DynamodbTodoRepository:** DynamoDB implementation of TodoRepository
  - `fetchAll()`: Uses ScanCommand to retrieve all items
  - `fetchById()`: Uses GetCommand to retrieve by ID
  - `save()`: Uses PutCommand to persist items
  - Maps DynamoDB items to Todo entities

**Configuration:**

- **DynamoDB Client:** Configured DynamoDBDocumentClient

  - Auto-marshalling with `removeUndefinedValues: true`
  - Region-based configuration

- **Environment Configuration:**
  - `AWS_REGION`: AWS region (default: us-east-1)
  - `TABLE_NAME`: DynamoDB table name (default: tec-practicantes-todo)

### Interface Layer

The Interface layer handles HTTP requests, responses, and data transformation between external and internal representations.

**Controllers:**

- **TodosController:** REST API controller
  - `getTodos()`: Handles GET requests for all todos
  - `createTodo()`: Handles POST requests for new todos
  - Validates incoming requests
  - Transforms entities to resources using assemblers

**Resources:**

- **TodoResource:** API representation of Todo entity
  - Properties: `id`, `title`, `completed`
- **CreateTodoResource:** API representation for creating todos
  - Properties: `title`

**Assemblers:**

- **TodoResourceFromEntityAssembler:** Transforms Todo entities to TodoResource
- **CreateTodoCommandFromResourceAssembler:** Transforms CreateTodoResource to CreateTodoCommand

**Handler:**

- **Lambda Handler:** Main entry point for API Gateway events
  - Routes GET requests to `getTodos()`
  - Routes POST requests to `createTodo()`
  - Returns 405 for unsupported methods
  - Centralizes error handling
  - Returns structured JSON responses

**Response Utilities:**

- **jsonResponse:** Helper function for API Gateway responses
  - Adds CORS headers
  - Sets content-type to application/json
  - Stringifies response body

<p align="justify">
This layer serves as the boundary between external HTTP requests and internal domain logic, ensuring clean separation and proper data transformation.
</p>

### Composition Root

The Composition Root is responsible for dependency injection and object composition.

**createTodosController():**

- Instantiates DynamodbTodoRepository
- Creates CreateTodoCommandHandler with repository
- Creates GetTodosQueryHandler with repository
- Constructs TodosController with handlers
- Returns fully configured controller

<p align="justify">
Located at the root of src/ to avoid coupling between layers, this pattern follows the Dependency Inversion Principle, keeping the application decoupled from infrastructure details.
</p>

### Shared Layer

The Shared layer contains reusable abstractions and utilities.

**Base Repository:**

- **BaseRepository<T>:** Abstract base class for repositories
  - Defines standard CRUD operations
  - Generic implementation for any entity type
  - Methods: `fetchAll()`, `fetchById()`, `save()`
  - Commented methods for future extension: `delete()`, `update()`

## API Endpoints

### GET /todos

Retrieves all todo items.

**Response:**

```json
{
  "items": [
    {
      "id": "uuid",
      "title": "Todo title",
      "completed": false
    }
  ]
}
```

**Status Codes:**

- `200`: Success
- `500`: Internal server error

### POST /todos

Creates a new todo item.

**Request Body:**

```json
{
  "title": "New todo item"
}
```

**Response:**

```json
{
  "item": {
    "id": "uuid",
    "title": "New todo item",
    "completed": false
  }
}
```

**Validation:**

- `title` must be a non-empty string
- Leading/trailing whitespace is trimmed

**Status Codes:**

- `200`: Success
- `400`: Invalid request body or validation error
- `500`: Internal server error

**Error Response:**

```json
{
  "message": "Error description"
}
```

## Environment Configuration

The application uses environment variables for configuration:

```bash
AWS_REGION=us-east-1
TABLE_NAME=tec-practicantes-todo
```

## Installation

```bash
# Install dependencies
npm install

# Build TypeScript code
npm run build

# Start locally (requires local DynamoDB or AWS credentials)
npm start
```

## Development

### Prerequisites

- Node.js 18.x or higher
- AWS Account with DynamoDB access
- AWS CLI configured (for deployment)

### Build

```bash
npm run build
```

This command:

1. Compiles TypeScript to JavaScript in `dist/` folder
2. Resolves path aliases using tsc-alias

### Project Structure

```
src/
├── composition-root.ts           # Dependency injection root
├── application/                  # Application layer
│   └── internal/
│       ├── command-services/     # Command handlers
│       │   └── create-todo-command-handler.ts
│       └── query-services/       # Query handlers
│           └── get-todos-query-handler.ts
├── domain/                       # Domain layer
│   ├── errors/                   # Domain errors
│   │   └── app-error.ts
│   ├── model/
│   │   ├── commands/             # Command objects
│   │   │   └── create-todo-command.ts
│   │   ├── entities/             # Domain entities
│   │   │   └── todo.ts
│   │   └── queries/              # Query objects
│   │       ├── get-todo-by-id-query.ts
│   │       └── get-todos-query.ts
│   ├── repositories/             # Repository interfaces
│   │   └── todo-repository.ts
│   └── services/                 # Service interfaces
│       ├── i-command-handler.ts
│       └── i-query-handler.ts
├── infrastructure/               # Infrastructure layer
│   ├── config/                   # Configuration
│   │   ├── dynamodb-client.ts
│   │   └── env.ts
│   └── persistence/
│       └── repositories/         # Repository implementations
│           └── dynamo-todo-repository.ts
├── interfaces/                   # Interface layer
│   └── rest/                     # REST API
│       ├── api-response.ts
│       ├── handler.ts            # Lambda handler
│       ├── todos-controller.ts
│       ├── resources/            # API resources
│       │   ├── create-todo-resource.ts
│       │   └── todo-resource.ts
│       └── transforms/           # Assemblers
│           ├── create-todo-command-from-resource-assembler.ts
│           └── todo-resource-from-entity-assembler.ts
└── shared/                       # Shared utilities
    └── infrastructure/
        └── persistence/
            └── repositories/
                └── base-repository.ts
```

## Architectural Patterns

### CQRS (Command Query Responsibility Segregation)

<p align="justify">
The application separates read operations (queries) from write operations (commands). Command handlers modify state and return entities, while query handlers only read and return data. This pattern provides clear separation of concerns and allows for independent scaling and optimization of read and write operations.
</p>

### Repository Pattern

<p align="justify">
The repository pattern abstracts data access logic, providing a collection-like interface for accessing domain entities. The TodoRepository interface defines the contract, while DynamodbTodoRepository provides the DynamoDB-specific implementation. This allows the domain layer to remain independent of infrastructure concerns.
</p>

### Assembler Pattern

<p align="justify">
Assemblers transform data between different representations (API resources ↔ domain entities ↔ commands). This pattern maintains clean boundaries between layers and protects the domain model from external changes. The application uses bidirectional assemblers for converting between resources and domain objects.
</p>

### Dependency Injection

<p align="justify">
The composition root pattern centralizes dependency creation and injection. All dependencies are wired up in one location (composition-root.ts), making the application testable and maintainable. This follows the Dependency Inversion Principle, where high-level modules don't depend on low-level modules.
</p>

## Type Safety

The application leverages TypeScript's type system throughout:

- Strong typing for all entities, commands, and queries
- Interface-based contracts for repositories and handlers
- Type-safe AWS SDK operations
- Generic base classes for reusability
- Strict compiler options enabled

## Error Handling

Comprehensive error handling is implemented at multiple levels:

**Validation Errors:**

- Missing request body (400)
- Invalid JSON format (400)
- Invalid or empty title field (400)

**Application Errors:**

- Custom AppError class with status codes
- Centralized error handling in Lambda handler

**System Errors:**

- Generic 500 error for unexpected failures
- Error logging to CloudWatch

## CORS Support

All API responses include CORS headers:

```
Access-Control-Allow-Origin: *
```

## Contributors

<p align="justify">
This project is developed and maintained by the NXT LegalTech team. We welcome contributions from developers who are passionate about building high-quality serverless applications. Whether you want to fix bugs, add new features, improve documentation, or suggest enhancements, your contributions are greatly appreciated!
</p>

### How to Contribute

If you'd like to collaborate on this project, please follow these steps:

1. **Fork the repository** - Create your own copy of the project
2. **Create a feature branch** - `git checkout -b feature/YourFeatureName`
3. **Make your changes** - Implement your improvements or fixes
4. **Test thoroughly** - Ensure your changes work correctly
5. **Commit your changes** - `git commit -m 'Add: Brief description of your changes'`
6. **Push to your branch** - `git push origin feature/YourFeatureName`
7. **Open a Pull Request** - Submit your changes for review

<p align="justify">
Before submitting a pull request, please make sure your code follows the project's architectural patterns and TypeScript best practices. We encourage you to open an issue first to discuss significant changes or new features. For questions, suggestions, or collaboration inquiries, feel free to reach out to the development team. We look forward to your contributions!
</p>
