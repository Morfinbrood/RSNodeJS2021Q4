import { CONFIG_X_ARGS, CONFIG_Y_ARGS } from '../const.js';
import ErrorHandler from '../app/Errors/ErrorHandler.js';
import ConfigError from './Errors/ConfigError.js';

class ConfigParser {

    static parseConfigToNameOfTransforms(configStr) {
        try {
            if (configStr) {
                const arrOfTransforms = configStr.split('-');
                this.chkConfigValid(arrOfTransforms);
                return arrOfTransforms;
            }
            else {
                throw new ConfigError(`Empty config `);
            }
        } catch (error) {
            ErrorHandler.errorHandler(error);
        }
    }

    static chkConfigValid(args) {
        args.forEach(arg => {
            this.chkConfigFormat(arg);
            this.chkX(arg);
            this.chkY(arg);
        });
    }

    static chkConfigFormat(arg) {
        if (arg.length > 2) {
            throw new ConfigError(`The config must match the pattern {XY(-)}n this parameter is not valid ${arg}`);
        }
        return true;
    }

    static chkX(arg) {
        if (!CONFIG_X_ARGS.includes(arg[0])) {
            if (!arg[0]) {
                throw new ConfigError(`Empty config `);
            }
            else {
                throw new ConfigError(`Unknown argument ${arg[0]} First argument must be 'C', 'R' or 'A' `);
            }
        }
        return true;
    }

    static chkY(arg) {
        if (arg[0] === 'A') {
            if (arg.length > 1) {
                throw new ConfigError(`R must be without any number or symbol after ${arg}`);
            }
        } else {
            if (arg.length === 1) {
                throw new ConfigError(`Empty Y argument For Ceasar or ROT-8. Number must be 1 or 0 `);
            }
            if (!CONFIG_Y_ARGS.includes(arg[1])) {
                throw new ConfigError(`Unknown argument ${arg[1]} number must be 1 or 0 `);
            }
        }
        return true;
    }

}

export default ConfigParser;