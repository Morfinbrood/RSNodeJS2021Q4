class CoomandlineArgError extends Error {
    constructor(message, eventMsg) {
        super(message);
        this.name = 'CoomandlineArgError';
        this.eventMsg = 'Uncorrect comandline arguments';
    }
}

export default CoomandlineArgError;