import { CONFIG_X_ARGS, CONFIG_Y_ARGS } from './const.js';

class ConfigParser {

    static parseConfigToNameOfTransforms(configStr) {
        const arrOfTransforms = configStr.split('-');
        return arrOfTransforms;
    }

    static chkConfigValid(args) {
        args.forEach(arg => {
            console.log(`args.every arg = ${arg}`);
            this.chkConfigFormat(arg);
            this.chkX(arg);
            this.chkY(arg);
        });
        return true;
    }

    static chkConfigFormat(arg) {
        if (arg.length > 2) {
            console.error(`Not correct CONFIG: the config must match the pattern {XY(-)}n this parameter is not valid ${arg}`);
            process.exit(-1);
        }
        return true;
    }

    static chkX(arg) {
        if (!CONFIG_X_ARGS.includes(arg[0])) {
            console.error(`Not correct CONFIG: unknown argument ${arg[0]} First argument must be 'C', 'R' or 'A' `);
            process.exit(-1);
        }
        return true;
    }

    static chkY(arg) {
        if (arg[0] === 'A') {
            if (arg.length > 1) {
                console.error(`Not correct CONFIG: R must be without any number after ${arg}`);
                process.exit(-1);
            }
        } else {
            if (!CONFIG_Y_ARGS.includes(arg[1])) {
                console.error(`Not correct CONFIG: unknown argument ${arg[1]} number must be 1 or 0 `);
                process.exit(-1);
            }
        }
        return true;
    }

}

export default ConfigParser;