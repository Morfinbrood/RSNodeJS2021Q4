class ComandlineParser {

    static getParsedArguments() {
        if (process.argv.length === 0) {
            console.error(`pls enter config`);
            process.exit(-1);
        }

        let options = {
            config: undefined,
            input: undefined,
            output: undefined
        };

        const allCLIArguments = process.argv.slice(2);

        for (let i = 0; i < allCLIArguments.length; i++) {
            const curArgument = allCLIArguments[i];

            switch (curArgument) {
                case '-c':
                case '--config':
                    ComandlineParser.chkAndHandleDublicatedOption(options.config);
                    options.config = ComandlineParser.getValueOfMode(allCLIArguments, i);
                    break;
                case '-i':
                case '--input':
                    ComandlineParser.chkAndHandleDublicatedOption(options.input);
                    options.input = ComandlineParser.getValueOfMode(allCLIArguments, i);
                    break;
                case '-o':
                case '--output':
                    ComandlineParser.chkAndHandleDublicatedOption(options.output);
                    options.output = ComandlineParser.getValueOfMode(allCLIArguments, i);
                    break;
                default:
                    break;
            }
        }

        return options;
    }

    static getValueOfMode(allArguments, index) {
        if (index + 1 < allArguments.length) {
            return allArguments[index + 1];
        }
        return null;
    }

    static chkAndHandleDublicatedOption(option) {
        if (option) {
            console.error(`option ${curArgument} is dublicated Programm finisher`);
            process.exit(-1);
        }
    }

}
export default ComandlineParser;