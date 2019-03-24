import { execSync } from 'child_process';

describe('# integration test', () => {
    beforeEach(() => {
        execSync('rm -rf testoutput');
    });

    it('## should print help options', () => {
        let output = execSync('npm run build').toString();
        output = execSync('sgen -g `pwd`/dist/cmake-fibre.min.js -h').toString();
        expect(output).toMatchSnapshot();
    });

    it('## should generate design and run cmake-fibre commands', () => {
        let output = execSync('npm run build').toString();
        output = execSync(
            'sgen -g `pwd`/dist/cmake-fibre.min.js -d src/test/fixture/design.json -o testoutput'
        ).toString();
        output = output.replace(/info: Loaded generator .*cmake-fibre.min.js.*/, '');
        expect(output).toMatchSnapshot();
        output = execSync('cmake CMakeLists.txt', { cwd: 'testoutput' }).toString();
        output = execSync('make', { cwd: 'testoutput' }).toString();
    });
});
