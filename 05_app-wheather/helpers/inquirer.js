const inquirer = require('inquirer');
require('colors')

const menuOpts = [{
    type: 'list',
    name: 'options',
    message: 'Welcome, What do you want to do?'.green,
    choices: [{
            value: 1,
            name: '1.'.green + ' Search a City',
        }, {
            value: 2,
            name: '2.'.green + ' History'
        },
        {
            value: 3,
            name: '3.'.green + ' Exit'
        }
    ]
}]
const inquirerMenu = async () => {
    console.clear()
    console.log('===================='.cyan)
    console.log('  Select an option'.blue)
    console.log('====================\n'.cyan)

    const {
        options
    } = await inquirer.prompt(menuOpts);
    return options;
}
const stop = async () => {
    const stoper = [{
        tipe: 'input',
        name: 'continue',
        message: `Press ${'ENTER'.blue} to continue `,
    }]
    console.log('\n')
    await inquirer.prompt(stoper);
}
const showMenuToCreateWorks = async () => {
    const menu = [{
        type: 'rawlist',
        name: 'opts',
        choices: [{
            value: '1',
            name: 'Cancel'
        }, {
            value: '2',
            name: 'Create a new task'
        }]
    }]
    const {
        opts
    } = await inquirer.prompt(menu);
    return opts
}
const readInput = async (message) => {

    const question = [{
        type: 'input',
        name: 'desc',
        message,
        validate(value) {
            if (value.length === 0) {
                return 'Please input a value'
            }
            return true;
        }
    }];

    const {
        desc
    } = await inquirer.prompt(question);
    return desc;
}

const lintingPlaces = async (places = []) => {
    const choices = places.map((place, i) => {
        const idx = `${i+1}. `.green;
        return {
            value: place.id,
            name: `${idx} ${place.name}`
        }
    });
    choices.unshift({
        value: '0',
        name: '0. '.green + ' Cancelar'
    })
    const question = [{
        type: 'list',
        name: 'id',
        message: 'Select a place: ',
        choices
    }]
    const {
        id
    } = await inquirer.prompt(question);
    return id;
}

const confirm = async (message) => {
    const question = [{
        type: 'confirm',
        name: 'ok',
        message
    }];
    const {
        ok
    } = await inquirer.prompt(question)
    return ok;
}

const listingToComplete = async (tasks = []) => {
    const choices = tasks.map((task, i) => {
        return {
            value: task.id,
            name: `${i+1} ${task.desc}`,
            checked: (task.completedIn) ? true : false
        }
    });
    const question = [{
        type: 'checkbox',
        name: 'ids',
        message: 'Selecting to complete a work\n',
        choices
    }]
    const {
        ids
    } = await inquirer.prompt(question);
    return ids;
}

module.exports = {
    inquirerMenu,
    stop,
    readInput,
    lintingPlaces,
    confirm,
    listingToComplete,
    showMenuToCreateWorks
}