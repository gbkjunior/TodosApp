import {Response} from '@angular/http';
import { Component, OnInit, Inject } from '@angular/core';
import { TaskDataService } from '../../service/task-data.service';
import {Tasks} from '../../models/taskClass';

import {Task, instantiateTask} from '../../models/task';


var ins = {} as Task;

@Component({
  selector: 'app-todo-task',
  templateUrl: './todo-task.component.html',
  styleUrls: ['./todo-task.component.css'],
  providers: [TaskDataService]
})



export class TodoTaskComponent implements OnInit  {
 
  public newTodoTask: Tasks = new Tasks();
  todoList : Tasks[];
  clicked: boolean=false;

  constructor(@Inject(TaskDataService) private todoTaskService : TaskDataService) { }

 
    public ngOnInit() {

      //At component initialization the 
      this.todoTaskService.getAllTodoTasks().subscribe(
       (todoList) => {
         this.todoList = todoList;
       }
      );
     
      console.log('inside ngoninit');
      console.log(this.todoList);
      
    }  
  
  

  addTodoTask()
  {
    console.log(this.newTodoTask);
    this.todoTaskService.addTodoTaskItem(this.newTodoTask).subscribe(
      (newTodo) => {
        this.todoList = this.todoList.concat(newTodo)
      }
    );
    console.log('running addtodotask');
    this.newTodoTask = new Tasks();
  }

  checkTodoTaskDone(todoTask) {
    console.log('inside check todo');
    this.todoTaskService.checkTodoTaskComplete(todoTask).subscribe(
      (updatedTodo) => {
        todoTask = updatedTodo;
      }
    );
  }

  updateTodoTask(todoTask) {

  }
  clickAdd()
  {
    this.clicked = true;
  }

  deleteTodoTask(todoTask)
  {
    console.log('inside delete to do');
    this.todoTaskService.deleteTodoTaskById(todoTask.id).subscribe(
      _ => {
        this.todoList = this.todoList.filter((t) => t.id!==todoTask.id);
      }
    );
  }

  get getAllTodos()
  {
    console.log('running get all todos');
    return this.todoTaskService.getAllTodoTasks();
  }
  

}

console.log(this.newTodoTask);
console.log(ins);
console.log(this.getAllTodos);