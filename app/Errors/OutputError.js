
class OutputError extends Error {
    constructor(message, eventMsg) {
        super(message);
        this.name = 'OutputError';
        this.eventMsg = 'OutputError';
    }
}
export default OutputError;
