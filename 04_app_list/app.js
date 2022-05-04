require('colors');

const {
    inquirerMenu,
    stop,
    readInput,
    listingToDelete,
    confirm,
    listingToComplete,
    showMenuToCreateWorks
} = require('./helpers/inquirer');
const {
    saveDB,
    readDB
} = require('./helpers/saveFile');
const Tasks = require('./models/tasks');
// const {
//     showMenu,
//     stop
// } = require('./helpers/messages.js')

const main = async () => {

    let opt = '';
    const tasks = new Tasks()

    const taskDB = readDB();
    if (taskDB) {
        tasks.chargeTasksFromArray(taskDB)

    }
    do {
        opt = await inquirerMenu();

        switch (opt) {
            case '1':
                const opts = await showMenuToCreateWorks();
                switch (opts) {
                    case '1':
                        console.log('Operation aborted'.black)
                        break;
                    case '2':
                        const desc = await readInput('Description: '.blue);
                        tasks.createTask(desc)
                        console.log('Task created'.green)
                        break;
                }
                break;
            case '2':
                tasks.listcompleted(taskDB)
                break;
            case '3':
                tasks.listCompletePending(true)
                break;
            case '4':
                tasks.listCompletePending(false)
                break;
            case '5':
                const ids = await listingToComplete(tasks.listArray)
                tasks.ToggleTasksToCompleted(ids)
                break;
            case '6':
                const id = await listingToDelete(tasks.listArray)
                const ok = await confirm('Are you sure?'.red)
                if (ok) {
                    if (id == '0') {
                        console.log('Operation aborted'.bgBlack.blue)
                    } else {
                        tasks.deleteTasks(id);
                        console.log('Task delete successfully'.red)
                    }
                } else {
                    console.log('Task not deleted'.gray)
                }

                break;
        }
        saveDB(tasks.listArray);

        await stop();
    } while (opt !== '0')
}
main()
// const homework = new Homework('buy food');
// homeworks._list[homework.id] = homework;
// console.log(homeworks)