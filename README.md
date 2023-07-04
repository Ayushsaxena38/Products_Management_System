
# Products Management System

This is a Products Management System built with Node.js, Express, and MongoDB. It provides a RESTful API for managing products in an inventory.
## Features

- Create a new product entry in the inventory
- Retrieve a list of all products
- Delete a product by ID
- Update the quantity of a product
  
  ## Getting Started

To get started with the Products Management System, you'll need to clone the repository and install the dependencies.

### Installation

Clone the repository:

     git clone https://github.com/Ayushsaxena38/Products_Management_System.git

Change into the project directory:

    cd Products_Management_System

Install the dependencies:

    npm install

Usage
Start the server:

    npx ts-node index.ts


The server should now be running at http://localhost:8000.

API Endpoints:-
  GET /products - Get a list of all products
  POST /products - Create a new product entry
  DELETE /products/:id - Delete a product by ID
  PUT /products/:id?number=<quantity> - Update the quantity of a product
  
License
This project is licensed under the MIT License.
