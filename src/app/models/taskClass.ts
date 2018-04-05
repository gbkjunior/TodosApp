import {Task, instantiateTask} from './task';



export class Tasks implements Task {
    id: number  ;
    title: string='';
    description?: string='';
    due?: string ='';
    done: boolean=false;

    constructor(values : Task) {
        Object.assign(this, values);
    }
    
 
}

var task = {} as Task;

var ct = new Tasks(task)

