import {Task, instantiateTask} from './task';



export class Tasks  {
    id: number  ;
    title: string='';
    description?: string='';
    due?: string ='';
    done: boolean=false;

    constructor(values : Object = {}) {
        Object.assign(this, values);
    }
    
 
}

var task = {} as Task;

var ct = new Tasks(task)

console.log(ct);