class ErrorHandler {
    static errorHandler(error) {
        process.stderr.write(`${error.eventMsg}: ${error.message}`);
        process.exit(-1);
    }
}

export default ErrorHandler;