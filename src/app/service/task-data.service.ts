import { Injectable, Inject } from '@angular/core';
import {Tasks} from '../models/taskClass';
import {Http} from '@angular/http';
import {ITaskService} from './Itask.service';
import {Task} from '../models/task';
import {Observable} from 'rxjs/Observable';

var itask =  {} as Task;


@Injectable()
export class TaskDataService {

  prevId : number = 0;

  itaskArray : Tasks[]= [];
  //tasks : Tasks = new Tasks(itask);
  
  constructor(@Inject(ITaskService) private itaskService: ITaskService) { }

  addTodoTaskItem(task : Tasks) :  Observable<Task> {
    /*
    console.log(this.itaskArray);
    if(!task.id)
    {
      task.id=++this.prevId;
    }
    console.log(this);
    
    this.itaskArray.push(task);
    */
    
    //this.tasks.push(task);
    return this.itaskService.Create(task);

    
  }

  getAllTodoTasks() :  Observable<Task[]>  {
    console.log('running service getalltodo');
    console.log(this);
    //console.log(this.tasks.length);
    return this.itaskService.GetAll();
  }

  getTodoTaskById(id: number): Observable<Task> {
    //return this.itaskArray.filter(task => task.id === id).pop();
    return this.itaskService.Get(id);
  }

  updateTodoTaskById(id:number,taskValues: Task) :  Observable<Task> {
    /*
    let todoTask = this.getTodoTaskById(id);
    if(!todoTask)
    {
      return null;
    }
    Object.assign(todoTask,taskValues);
    return todoTask;
    */
   return this.itaskService.Update(id,taskValues);
  }

  checkTodoTaskComplete(task: Tasks) : Observable<Task>{
  /*
    let updatedTodoTask = this.updateTodoTaskById(task.id, {
      done: !task.done
    });

    return updatedTodoTask;
    */
   task.done = !task.done;
   return this.itaskService.Update(task.id,task);
  }

  deleteTodoTaskById(id: number) : Observable<boolean> {
    /*
    this.itaskArray = this.itaskArray.filter(task => task.id !== id);
    console.log('inside delete service' + this);
    return this;
    */
    return this.itaskService.Delete(id);
  }

  
}

console.log(this.itaskArray);
