const Task = require('./task')
require('colors')
/**
 * _list:
 *      { 'uuid-213ded23-423erw23r-32e3ed2: {id: 12, desc: asdasda, compleatedIn: 98749674} }
 */
class Tasks {

    _list = {};

    get listArray() {
        const list = [];
        Object.keys(this._list).forEach(key => {
            const task = this._list[key];
            list.push(task);
        })
        return list
    }
    constructor() {
        this._list = {};
    }

    deleteTasks(id = '') {
        if (this._list[id]) {
            delete this._list[id];
        }
    }
    chargeTasksFromArray(tasks = []) {
        tasks.forEach(task => {
            this._list[task.id] = task;
        });
    }
    createTask(desc = '') {
        const task = new Task(desc)
        this._list[task.id] = task;
    }
    // completeList(temp = []) {
    //     console.log()
    //     temp = this.listArray
    //     const cycle = () => {
    //         let i;
    //         for (i = 0; i < temp.length; i++) {
    //             const idx = `\n${i+1}. `.blue;
    //             const task = `${temp[i].desc}`.white;
    //             const state = (temp[i].completedIn) ?
    //                 'Completed'.green :
    //                 'Pending'.red;
    //             console.log(`${idx}${task} ::${state}`)
    //         }
    //     }
    //     cycle()
    // } my method to solve this problem

    listcompleted() {
        console.log();
        this.listArray.forEach((task, i) => {
            const idx = `${i+1}. `.green;
            const {
                desc,
                completedIn
            } = task;
            (completedIn) ?
            console.log(`${idx}${desc} :: ` + `${'COMPLEATED IN '+completedIn}\n`.green):
                console.log(`${idx}${desc} :: ` + `TASK STILL PENDING\n`.red);
        })
    }

    listCompletePending(completed = true) {
        console.log();
        let counting = 0;
        this.listArray.forEach(tarea => {

            const {
                desc,
                completedIn
            } = tarea;
            const state = (completedIn) ?
                'completed'.green :
                'pending'.red;
            if (completed) {
                if (completedIn) {
                    counting += 1;
                    console.log(`${counting}.`.green + ` ${desc} :: ` + `${'COMPLEATED IN '+completedIn}\n`.green)
                }
            } else {
                if (!completedIn) {
                    counting += 1;
                    console.log(`${(counting+'. ').green}${desc} ::` + `TASK STILL PENDING...`.red + `\n`)
                }
            }
        })
    }
    ToggleTasksToCompleted(ids = '') {
        ids.forEach(id => {
            const task = this._list[id];
            if (!task.completedIn) {
                task.completedIn = new Date().toISOString()
            }
        })
        this.listArray.forEach(task => {
            if (!ids.includes(task.id)) {
                this._list[task.id].completedIn = null;
            }
        })
    }
}

module.exports = Tasks;