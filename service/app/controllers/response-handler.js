// Defines a function to standardize API responses for successful requests.
export const setResponse = (response, statusCode = 200, message = '', data = {}) => {
    const responseBody = {
        success: true,
        message,
        data,
    };

    // Sets the HTTP status code and sends the JSON response to the client.
    response.status(statusCode).json(responseBody);
};

// Defines a function to standardize API responses for failed requests or errors.
export const setError = (response, statusCode, message, error = null) => {
    // Constructs the JSON object to be sent as the error response body.
    const errorResponse = {
        success: false,
        message,
    };

    if (error) {
        console.error(error.message);
    }

     // Sets the HTTP status code and sends the JSON error response to the client.
    response.status(statusCode).json(errorResponse);
};

