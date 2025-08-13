# Gemini Flash API

This project provides a simple API wrapper for interacting with the Gemini Flash model. It's designed to be easy to use and integrate into your applications.

## Table of Contents

- [Installation](#installation)
- [Usage](#usage)
- [API Endpoints](#api-endpoints)
- [Configuration](#configuration)

## Installation

To get started, clone this repository and install the dependencies:

```bash
git clone https://github.com/asraf/gemini-flash-api.git
```

And then install the required by running this command:
```
npm install
```

## Usage

You can run the API using TS Node JS:

```bash
npm run dev
```

The API will then be accessible at `http://127.0.0.1:3000`.

## API Endpoints

### `/generate-text` (POST)

This endpoint allows you to send a prompt to the Gemini Flash model and receive a generated response.

**Request Body:**

```json
{
  "prompt": "Your prompt goes here."
}
```

**Response:**

```json
{
  "response": "The generated text from the Gemini Flash model."
}
```

**Example using `curl`:**

```bash
curl -X POST -H "Content-Type: application/json" -d '{"prompt": "Tell me a short story about a brave knight."}' http://127.0.0.1:3000/generate-text
```

## Configuration

The API uses environment variables for configuration, particularly for your Gemini API key.

**`GEMINI_API_KEY`**: Your Gemini API key for accessing the Gemini model.

You can set this in your environment or create a `.env` file in the project root:

```
GEMINI_API_KEY=YOUR_GEMINI_API_KEY_HERE
```