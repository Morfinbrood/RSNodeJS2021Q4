import CoomandlineArgError from "../Errors/CoomandlineArgError.js";
import ErrorHandler from "../Errors/ErrorHandler.js";

class ComandlineParser {

    static getParsedArguments() {
        let options = {
            config: undefined,
            input: undefined,
            output: undefined
        };

        try {
            if (process.argv.length === 2) {
                throw new CoomandlineArgError(`Empty command line options`);
            }
            const allCLIArguments = process.argv.slice(2);

            for (let i = 0; i < allCLIArguments.length; i++) {
                const curArgument = allCLIArguments[i];

                switch (curArgument) {
                    case '-c':
                    case '--config':
                        ComandlineParser.chkAndHandleDublicatedOption(options.config, curArgument);
                        options.config = ComandlineParser.getValueOfMode(allCLIArguments, i);
                        break;
                    case '-i':
                    case '--input':
                        ComandlineParser.chkAndHandleDublicatedOption(options.input, curArgument);
                        options.input = ComandlineParser.getValueOfMode(allCLIArguments, i);
                        break;
                    case '-o':
                    case '--output':
                        ComandlineParser.chkAndHandleDublicatedOption(options.output, curArgument);
                        options.output = ComandlineParser.getValueOfMode(allCLIArguments, i);
                        break;
                    default:
                        break;
                }
            }
        } catch (error) {
            ErrorHandler.errorHandler(error);
        }

        return options;
    }

    static getValueOfMode(allArguments, index) {
        if (index + 1 < allArguments.length) {
            return allArguments[index + 1];
        }
        return null;
    }

    static chkAndHandleDublicatedOption(option, curArgument) {
        if (option) {
            throw new CoomandlineArgError(`option ${curArgument} is dublicated`);
        }
    }

}
export default ComandlineParser;