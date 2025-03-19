# Nginx Configuration Project

This project contains a basic setup for serving a static website using Nginx.

## Project Structure

- **conf/nginx.conf**: Main configuration file for Nginx.
- **conf/sites-available/default.conf**: Server block configuration for the default site.
- **logs/access.log**: Logs all requests processed by the Nginx server.
- **logs/error.log**: Logs any errors encountered by the Nginx server.

## Setup Instructions

1. Install Nginx on your server.
2. Copy the configuration files to the appropriate directories.
3. Enable the site configuration by creating a symbolic link in the `sites-enabled` directory.
4. Restart Nginx to apply the changes.

## Usage

After setting up, you can access your static website through the server's IP address or domain name. Check the logs for any access or error messages.