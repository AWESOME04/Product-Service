# Product Service - Multi-Vendor Platform

The **Product Service** is a core microservice of the Multi-Vendor Platform, managing all product-related functionalities. It handles product creation, updates, retrieval, and categorization while integrating seamlessly with other microservices via RabbitMQ for event-driven communication.

## Features

- **Product Management**:
  - Sellers can create, update, and manage product listings.
  - Buyers can browse and search for products by category or keyword.
- **Category-Based Product Retrieval**:
  - Fetch products based on specific categories for better discoverability.
- **Wishlist Management**:
  - Add or remove products to/from a user’s wishlist.
- **Cart Management**:
  - Add products to a cart, update quantities, or remove products.
- **Real-Time Stock Updates**:
  - Ensures stock levels are updated during cart operations.
- **Inter-Service Communication**:
  - Publishes events to notify other services of updates using RabbitMQ.

## Technology Stack

- **Node.js**: Runtime environment for building the service.
- **Express.js**: Web framework for creating RESTful APIs.
- **Sequelize**: ORM for database operations.
- **RabbitMQ**: Message broker for inter-service communication.

## API Endpoints

### Product Operations

1. **Get All Products**
   - **Endpoint**: `GET /`
   - **Description**: Fetches all available products.
   - **Response**:
     ```json
     [
       {
         "id": "123",
         "name": "Product Name",
         "desc": "Description of the product",
         "price": 100.0,
         "stock": 20,
         "type": "electronics",
         "available": true
       },
       ...
     ]
     ```

2. **Get Product By ID**
   - **Endpoint**: `GET /product/:id`
   - **Description**: Retrieves details of a specific product by its ID.
   - **Response**:
     ```json
     {
       "id": "123",
       "name": "Product Name",
       "desc": "Description",
       "price": 100.0,
       "stock": 20,
       "type": "electronics"
     }
     ```

3. **Create Product**
   - **Endpoint**: `POST /product/create`
   - **Description**: Allows sellers to add new products to the platform.
   - **Protected**: Yes, requires seller role.
   - **Request Body**:
     ```json
     {
       "name": "New Product",
       "desc": "Product Description",
       "img": "https://image.url",
       "type": "electronics",
       "stock": 50,
       "price": 100.0,
       "available": true
     }
     ```
   - **Response**:
     ```json
     { "message": "Product created successfully.", "product": { ... } }
     ```

4. **Update Product**
   - **Endpoint**: `PUT /product/:id`
   - **Description**: Updates details of a product. Only the seller who created the product can update it.
   - **Protected**: Yes, requires seller role.
   - **Response**:
     ```json
     { "message": "Product updated successfully.", "product": { ... } }
     ```

5. **Get Products By Category**
   - **Endpoint**: `GET /category/:type`
   - **Description**: Fetches products belonging to a specific category.
   - **Response**:
     ```json
     [
       { "id": "123", "name": "Product A", "type": "electronics" },
       ...
     ]
     ```

6. **Get Products By IDs**
   - **Endpoint**: `POST /ids`
   - **Description**: Fetches details for multiple products by their IDs.
   - **Request Body**:
     ```json
     { "ids": ["123", "456"] }
     ```
   - **Response**:
     ```json
     [
       { "id": "123", "name": "Product A" },
       { "id": "456", "name": "Product B" }
     ]
     ```

### Wishlist Operations

7. **Add To Wishlist**
   - **Endpoint**: `PUT /wishlist`
   - **Description**: Adds a product to the authenticated user’s wishlist.
   - **Protected**: Yes.
   - **Request Body**:
     ```json
     { "_id": "123" }
     ```
   - **Response**:
     ```json
     { "product": { "id": "123", "name": "Product A" } }
     ```

8. **Remove From Wishlist**
   - **Endpoint**: `DELETE /wishlist/:id`
   - **Description**: Removes a product from the user’s wishlist.
   - **Protected**: Yes.
   - **Response**:
     ```json
     { "message": "Product removed from wishlist." }
     ```

## Inter-Service Communication

- **Wishlist and Cart Events**:
  - Events like `ADD_TO_WISHLIST` and `ADD_TO_CART` are published to RabbitMQ for integration with the **Notification Service** and **Order Service**.

## Setup and Installation

### Prerequisites

- **Node.js**: >=16.x
- **npm or yarn**
- **RabbitMQ**: For message queue communication.
- **PostgreSQL**: Database for product data.

### Steps to Run Locally

1. Clone the repository:
   ```bash
   git clone https://github.com/AWESOME04/Product-Service.git
   cd Product-Service
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Set up environment variables:
   - Database credentials.
   - RabbitMQ URL.
4. Run the server:
   ```bash
   node index.js
   ```
   The service will run on `http://localhost:8001`.

## Deployment

- **Hosting**: Deployed on Render.
- **Database**: Hosted on Neon.
- **Message Queue**: CloudAMQP.
