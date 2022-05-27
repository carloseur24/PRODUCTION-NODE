require('colors');

const showMenu = () => {
    return new Promise(resolve => {
        console.clear()
        console.log('===================='.cyan)
        console.log('  Select an option'.blue)
        console.log('====================\n'.cyan)

        console.log(`${'1.'.cyan} ${'Create a work'.blue}`);
        console.log(`${'2.'.cyan} ${'List a work'.blue}`);
        console.log(`${'3.'.cyan} ${'List a complete work'.blue}`);
        console.log(`${'4.'.cyan} ${'List a pending work'.blue}`);
        console.log(`${'5.'.cyan} ${'Completing a work'.blue}`);
        console.log(`${'6.'.cyan} ${'Delete a work'.blue}`);
        console.log(`${'7.'.cyan} ${'Quit'.blue}\n`);

        const readline = require('readline').createInterface({
            input: process.stdin,
            output: process.stdout
        })

        readline.question('Select an option: '.green, (opt) => {
            readline.close();
            resolve(opt);
        })
    })
}
const stop = () => {
    return new Promise(resolve => {
        const readline = require('readline').createInterface({
            input: process.stdin,
            output: process.stdout
        })

        readline.question(`\nPress ${'ENTER'.blue} to continue\n`, (opt) => {
            readline.close();
            resolve();
        })
    })
}


module.exports = {
    showMenu,
    stop
}