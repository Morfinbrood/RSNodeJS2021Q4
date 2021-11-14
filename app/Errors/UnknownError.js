class UnknownError extends Error {
    constructor(message, eventMsg) {
        super(message);
        this.name = 'UnknownError';
        this.eventMsg = 'UnknownError';
    }
}

export default UnknownError;