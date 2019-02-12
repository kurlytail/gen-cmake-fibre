import { execSync } from 'child_process';

describe('# integration test', () => {
    beforeEach(() => {
        execSync('rm -rf testoutput');
    });

    it('## should print help options', () => {
        const output = execSync('./scripts/sgen-cmake-fibre.sh -h').toString();
        expect(output).toMatchSnapshot();
    });

    it('## should generate design', () => {
        const output = execSync('./scripts/sgen-cmake-fibre.sh -d src/test/fixture/design.js -o testoutput').toString();
        expect(output).toMatchSnapshot();
    });

    it('## should generate design and run cmake-fibre commands', () => {
        let output = execSync(
            './scripts/sgen-cmake-fibre.sh -d src/test/fixture/design.js -o testoutput --overwrite=merge'
        ).toString();
        expect(output).toMatchSnapshot();
        output = execSync('cmake CMakeLists.txt', { cwd: 'testoutput' }).toString();
        output = execSync('make', { cwd: 'testoutput' }).toString();
    });
});