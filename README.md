## Running the Project with Docker

This project is containerized using Docker for streamlined development and deployment. Follow the steps below to set up and run the project:

### Prerequisites

Ensure you have the following installed on your system:

- Docker Engine (version 20.10 or later)
- Docker Compose (version 2.0 or later)

### Setup Instructions

1. Clone the repository and navigate to the project directory.

2. Build and start the Docker containers:

   ```bash
   docker-compose up --build
   ```

3. Access the services:

   - PHP application: [http://localhost:9000](http://localhost:9000)
   - JavaScript application: [http://localhost:3000](http://localhost:3000)

### Environment Variables

- Configure the `.env` file in the root directory with the necessary environment variables. Refer to `.env.example` for guidance.

### Exposed Ports

- PHP service: `9000`
- JavaScript service: `3000`
- Database service: `3306`

### Notes

- Ensure the `db_data` volume is properly configured for persistent database storage.
- Modify the `docker-compose.yml` file if additional customization is required.

For further details, refer to the [Docker_README.md](Docker_README.md) file.