
# Recipe Generator

A **Recipe Generator** web application that takes ingredients and cuisine as input and generates a recipe using the Gemini API. This project uses **Node.js** for the backend and **React** for the frontend.

---

## Features

- Input fields for **ingredients** and **cuisine**.
- Generates recipes dynamically using the Gemini API.
- Responsive and polished design with error handling for empty fields.
- Streams recipe generation in real-time for a smooth user experience.

---

## Tech Stack

- **Backend**: Node.js, Express.js
- **Frontend**: React (with plain CSS for styling)
- **API**: Gemini API

---

## Prerequisites

Before starting, ensure you have the following installed:

1. **Node.js** (v16 or higher)
2. **npm** (comes with Node.js)
3. **Git**

---

## Installation and Setup

Follow these instructions to set up and run the project locally:

### 1. Clone the Repository

```bash
git clone https://github.com/your-username/recipe-generator.git
cd recipe-generator
```

### 2. Backend Setup

1. Navigate to the `backend` folder:
   ```bash
   cd backend
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Create a `.env` file in the `backend` directory with the following content:
   ```env
   GEMINI_API_KEY=your_gemini_api_key_here
   ```
   Replace `your_gemini_api_key_here` with your Gemini API key.

4. Start the backend server:
   ```bash
   npm start
   ```

   The backend server will start at `http://localhost:5000`.

---

### 3. Frontend Setup

1. Navigate to the `frontend` folder:
   ```bash
   cd ../frontend
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Start the development server:
   ```bash
   npm run dev
   ```

   The frontend server will start at `http://localhost:3000`.

---

## Usage

1. Open `http://localhost:3000` in your web browser.
2. Enter ingredients (comma-separated) and a cuisine type.
3. Click **Generate Recipe** to see the generated recipe displayed in real-time.

---

## Folder Structure

```
recipe-generator/
├── backend/            # Backend server code (Node.js, Express.js)
│   ├── server.js       # Main server file
│   ├── package.json    # Backend dependencies
│   ├── .env            # Environment variables (not included in version control)
├── frontend/           # Frontend client code (React)
│   ├── src/            # React source code
│   │   ├── components/ # React components
│   │   ├── styles.css  # CSS for the project
│   │   ├── App.jsx     # Main app entry point
│   │   ├── main.jsx    # React entry file
│   ├── public/         # Static files
│   ├── package.json    # Frontend dependencies
├── README.md           # Project documentation
```

---

## Example `.env` File

Here’s an example `.env` file for the backend:

```env
GEMINI_API_KEY=your_gemini_api_key_here
```

Ensure you never expose your API key publicly (e.g., in version control).

---

## Scripts

### Backend Scripts
- `npm start` - Starts the backend server.

### Frontend Scripts
- `npm run dev` - Starts the frontend development server.
- `npm run build` - Builds the React app for production.

---

## API Reference

The project uses the [Gemini API](https://ai.google.dev/gemini-api/docs) for text generation. This API generates recipes based on the prompt provided.

---

## Troubleshooting

### Common Issues

1. **`MODULE_NOT_FOUND` Error**:
   - Ensure all dependencies are installed by running `npm install` in both the `backend` and `frontend` directories.

2. **Frontend or Backend Not Running**:
   - Ensure both servers are started correctly using `npm start` for the backend and `npm run dev` for the frontend.

3. **Gemini API Key Error**:
   - Verify that the `.env` file in the `backend` contains a valid `GEMINI_API_KEY`.

4. **Port Conflict**:
   - If `http://localhost:3000` or `http://localhost:5000` is in use, stop any other processes or change the port in the configuration.

---

## Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository.
2. Create a new branch for your feature:
   ```bash
   git checkout -b feature-name
   ```
3. Commit your changes:
   ```bash
   git commit -m "Add new feature"
   ```
4. Push to your branch:
   ```bash
   git push origin feature-name
   ```
5. Submit a pull request.

---

## License

This project is licensed under the **MIT License**.

---

## Acknowledgements

- [Gemini API Documentation](https://ai.google.dev/gemini-api/docs)
- [React Documentation](https://reactjs.org/docs/getting-started.html)
- [Node.js Documentation](https://nodejs.org/en/docs/)

---
