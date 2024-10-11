
# Daily Task Report

Daily Task Report - Track and Manage Your Productivity


## Author

- [Mohamed Farag](https://github.com/MohamedFarag107)


## Demo Api

- [tasks](http://api.mfarag.me/api/v1/tasks)
- [employees](http://api.mfarag.me/api/v1/employees)


## Features

- Employee Management

    - Create Employee: Allows the creation of a new employee. The endpoint is handled by the createEmployeeController and validated by createEmployeeValidation.
    - Update Employee: Enables updating an existing employee's details. The endpoint is managed by the updateEmployeeController and validated by updateEmployeeValidation.
    - Delete Employee: Facilitates the deletion of an employee by ID. The endpoint is controlled by the deleteEmployeeController and validated by deleteEmployeeValidation.
    - Get One Employee By Id: Retrieves a single employee's details by their ID. The endpoint is managed by the findOneEmployeeController and validated by findOneEmployeeValidation.
    - Get All Employees: Fetches a list of all employees with optional pagination and filtering. The endpoint is handled by the findAllEmployeesController and validated by findAllEmployeesValidation.

- Task Management

    - Create Task: Allows the creation of a new task. The endpoint is handled by the    createTaskController and validated by createTaskValidation.
    - Update Task: Enables updating an existing task's details. The endpoint is managed by the updateTaskController and validated by updateTaskValidation.
    - Delete Task: Facilitates the deletion of a task by ID. The endpoint is controlled by the deleteTaskController and validated by deleteTaskValidation.
    - Get One Task By Id: Retrieves a single task's details by its ID. The endpoint is managed by the findOneTaskController and validated by findOneTaskValidation.
    - Get All Tasks: Fetches a list of all tasks with optional pagination and filtering. The endpoint is handled by the findAllTasksController and validated by findAllTasksValidation.
    - Daily Task Summary: Provides a summary of tasks for each employee on a daily basis. The endpoint is managed by the dailyTaskSummaryController and validated by dailyTaskSummaryValidation.

- Validation

    - Input validation is performed using express-validator to ensure data integrity and correctness.

- Error Handling

    - Centralized error handling with custom error classes like NotfoundError and middleware like globalErrorHandlerMiddleware.

- Environment Configuration

    - Configurable via .env files for different environments (development and production) using dotenv and envalid.

- Database

    - Uses PostgreSQL as the database and TypeORM for object-relational mapping. The database connection is configured in data-source.ts.

- Middleware

    - Includes middleware for error handling, request validation, and logging HTTP requests using morgan.

- Docker Support

    - Easily run PostgreSQL using Docker for a consistent development environment.

- Event Listeners

    - Handles server shutdown gracefully by listening to events like SIGINT.



# How To Get Started

<!-- pre requirement -->

## Pre Requirement

### Install `win-node-env` globally if you are using Windows

```bash
npm install -g win-node-env
```

### Run Docker Container for PostgreSQL or you can use your own PostgreSQL

```bash
docker run --name daily_task -p 5432:5432 -e POSTGRES_PASSWORD=postgres -d postgres
```

### Create `.env.development` for development and `.env.production` for production in the root project folder with the following content:

```bash
PORT=3001
NODE_ENV="development"
DB_HOST= "localhost"
DB_PORT= 5432
DB_USER_NAME= "postgres"
DB_PASSWORD= "postgres"
DB_NAME= "postgres"
CLIENT_ORIGIN= "http://localhost:3000"
```

### Install Dependencies

```bash
yarn
```

### Run Development

```bash
yarn dev
```

### Run Production

```bash
yarn prod
```
