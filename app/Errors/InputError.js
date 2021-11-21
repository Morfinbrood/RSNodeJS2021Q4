class InputError extends Error {
    constructor(message, eventMsg) {
        super(message);
        this.name = 'FileReadError';
        this.eventMsg = 'InputError';
    }
}

export default InputError;