# Campus Connect - Mini Project

A beginner-friendly project for managing reports and resources with image upload functionality, built using Node.js, Express, MongoDB, and Vanilla JS/HTML/CSS.

## Project Structure
```
mini-project/
├── backend/
│   ├── models/
│   │   ├── Report.js         // Mongoose schema for Reports
│   │   └── Resource.js       // Mongoose schema for Resources
│   ├── routes/
│   │   ├── reports.js        // API routes for adding/fetching reports
│   │   └── resources.js      // API routes for adding/fetching resources
│   ├── uploads/              // Folder where uploaded images are saved
│   ├── package.json          // Backend dependencies
│   └── server.js             // Main Express server file
└── frontend/
    ├── index.html            // Main HTML interface
    ├── style.css             // UI styling
    └── app.js                // Frontend logic (Fetch API)
```

## How to Run the Project

### 1. Start the Backend Server

1. **Prerequisite**: Ensure MongoDB is running locally on your computer (port 27017).
2. Open your terminal and navigate to the `backend` folder:
   ```bash
   cd path/to/mini-project/backend
   ```
3. Install the required npm packages:
   ```bash
   npm install
   ```
4. Start the server:
   ```bash
   node server.js
   ```
   *The server will start running on `http://localhost:5000`.*

### 2. View the Frontend

The frontend uses standard HTML, CSS, and JS (`fetch` API), so you don't need a complex build tool like React or Vite to run it. 

You can simply open the `frontend/index.html` file directly in your web browser, OR you can serve it using an extension like **Live Server** in VS Code.

- Click on **Reports** to view and add campus issues.
- Click on **Resources** to view and add campus resources.
- Submitted forms automatically upload images to the server's `uploads/` folder and dynamically update the grid.

## Requirements Covered
- **MongoDB Collections**: `reports` & `resources`
- **Backend APIs**: Node JS + Express
- **Multer**: Configured for storing images in the `backend/uploads` directory.
- **Frontend**: Clean and modern UI with HTML/CSS and Vanilla JS DOM manipulation.
