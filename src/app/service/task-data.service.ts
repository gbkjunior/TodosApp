import { Injectable, Inject } from '@angular/core';
import {Tasks} from '../models/taskClass';
import {Http} from '@angular/http';
import {ITaskService} from './Itask.service';
import {Task} from '../models/task';
import {Observable} from 'rxjs/Observable';

var itask =  {} as Task;


@Injectable()
export class TaskDataService {
  
  constructor(@Inject(ITaskService) private itaskService: ITaskService) { }

  addTodoTaskItem(task : Tasks) :  Observable<Task> {
    return this.itaskService.Create(task);   
  }

  getAllTodoTasks() :  Observable<Task[]>  {
    //console.log(this.tasks.length);
    return this.itaskService.GetAll();
  }

  getTodoTaskById(id: number): Observable<Task> {
    //return this.itaskArray.filter(task => task.id === id).pop();
    return this.itaskService.Get(id);
  }

  updateTodoTaskById(id:number,taskValues: Task) :  Observable<Task> {
    
   return this.itaskService.Update(id,taskValues);
  }

  checkTodoTaskComplete(task: Tasks) : Observable<Task>{
   task.done = !task.done;
   return this.itaskService.Update(task.id,task);
  }

  deleteTodoTaskById(id: number) : Observable<boolean> {
    
    return this.itaskService.Delete(id);
  }

  
}


