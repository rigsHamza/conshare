Next.js Notes Application - Backend

Welcome to the backend of the Next.js Notes Application! This Node.js-based server is designed to support the functionality of the frontend application, enabling seamless CRUD operations on notes. Below are instructions on how to set up and run the backend server.
Getting Started

To run the Next.js Notes Application backend on your local machine, follow these steps:

git clone https://github.com/bi28wq/abdul_aziz_assignement2.git
cd backend 
npm install
run node index.js

This will start the backend server on the specified port (default is http://localhost:4000).

Technologies Used

    Node.js: A JavaScript runtime for server-side development.

    Express: A minimalist web application framework for Node.js.

    Sql DB

    API Endpoints

    GET /notes: Retrieve all notes.

    GET /notes/:id: Retrieve a specific note by ID.

    POST /notes: Create a new note.

    PUT /notes/:id: Update a specific note by ID.

    DELETE /notes/:id: Delete a specific note by ID.
