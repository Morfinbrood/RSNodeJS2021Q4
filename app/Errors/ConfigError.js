class ConfigError extends Error {
    constructor(message, eventMsg) {
        super(message);
        this.name = 'ConfigError';
        this.eventMsg = 'Invalid config';
    }
}

export default ConfigError;