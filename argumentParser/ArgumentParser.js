class ArgumentParser {

    static getParsedArguments() {
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
                    ArgumentParser.chkAndHandleDublicatedOption(options.config);
                    options.config = ArgumentParser.getValueOfMode(allCLIArguments, i);
                    break;
                case '-i':
                case '--input':
                    ArgumentParser.chkAndHandleDublicatedOption(options.input);
                    options.input = ArgumentParser.getValueOfMode(allCLIArguments, i);
                    break;
                case '-o':
                case '--output':
                    ArgumentParser.chkAndHandleDublicatedOption(options.output);
                    options.output = ArgumentParser.getValueOfMode(allCLIArguments, i);
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
export default ArgumentParser;