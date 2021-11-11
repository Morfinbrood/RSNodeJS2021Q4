import ChainTransformer from '../ChainTransformer.js'

class Tests {

    static tests() {
        const inputText = 'This is secret. Message about "_" symbol!';
        let expectedText, res, chainResult;

        console.log('TEST1 ');
        chainResult = new ChainTransformer(inputText);
        // C1-C1-R0-A
        res = chainResult.C1().C1().R0().A().res

        expectedText = `Myxn xn nbdobm. Tbnnfzb ferlm "_" nhteru!`;
        console.log(res === expectedText);

        console.log('TEST2 ');
        chainResult = new ChainTransformer(inputText);
        // C1-C0-A-R1-R0-A-R0-R0-C1-A
        res = chainResult.C1().C0().A().R1().R0().A().R0().R0().C1().A().res

        expectedText = `Vhgw gw wkmxkv. Ckwwoik onauv "_" wqcnad!`;
        console.log(res === expectedText);

        console.log('TEST3 ');
        chainResult = new ChainTransformer(inputText);
        // A-A-A-R1-R0-R0-R0-C1-C1-A
        res = chainResult.A().A().A().R1().R0().R0().R0().C1().C1().A().res
        expectedText = `Hvwg wg gsqfsh. Asggous opcih "_" gmapcz!`;
        console.log(res === expectedText);

        console.log('TEST4 ');
        // C1-R1-C0-C0-A-R0-R1-R1-A-C1
        chainResult = new ChainTransformer(inputText);
        res = chainResult.C1().R1().C0().C0().A().R0().R1().R1().A().C1().res

        expectedText = `Hvwg wg gsqfsh. Asggous opcih "_" gmapcz!`;
        console.log(res === inputText);

    }
}
export default Tests;