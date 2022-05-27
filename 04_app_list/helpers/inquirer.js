const inquirer = require('inquirer');
require('colors')

const menuOpts = [{
    type: 'list',
    name: 'options',
    message: 'What do you want to do?',
    choices: [{
            value: '1',
            name: '1.'.green + ' Create a work',
        }, {
            value: '2',
            name: '2.'.green + ' List of works'+`( Here you can view work's status )`.blue
        },
        {
            value: '3',
            name: '3.'.green + ' List of completed works'
        },
        {
            value: '4',
            name: '4.'.green + ' List of pending work'
        },
        {
            value: '5',
            name: '5.'.green + ' Completing a work'
        },
        {
            value: '6',
            name: '6.'.green + ' Delete a work'
        },
        {
            value: '0',
            name: '0.'.green + ' Quit of app'
        },
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

const listingToDelete = async (tasks = []) => {
    const choices = tasks.map((task, i) => {
        const idx = `${i+1}. `.green;
        return {
            value: task.id,
            name: `${idx} ${task.desc}`
        }
    });
    choices.unshift({
        value: '0',
        name: '0. '.green + ' Cancelar'
    })
    const question = [{
        type: 'list',
        name: 'id',
        message: 'Borrar',
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
    listingToDelete,
    confirm,
    listingToComplete,
    showMenuToCreateWorks
}