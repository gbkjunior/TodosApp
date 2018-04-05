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
  clickedEdit : boolean=false;

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
    if(this.newTodoTask.title!="" && this.newTodoTask.title.trim()!="") {
      this.todoTaskService.addTodoTaskItem(this.newTodoTask).subscribe(
        (newTodo) => {
          this.todoList = this.todoList.concat(newTodo)
        }
      );
      this.clicked = false;
    }
    else {
      alert("Please enter task title");
    }
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
    this.clickedEdit = true;
    console.log('inside update todo' +   todoTask.id);
    this.todoTaskService.getTodoTaskById(todoTask.id).subscribe(
      (getTodo) => {
        this.newTodoTask = getTodo;

      }
    );
  }
  clickAdd()
  {
    this.clicked = true;
  }

  clickCancel()
  {
    this.clicked = false;
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
  
  updateTaskById(todoTask)
  {
    this.todoTaskService.getTodoTaskById(todoTask.id).subscribe(
      (getTodo) => {
       var index = this.todoList.findIndex(
         x => x.id == getTodo.id
       )
       this.todoList[index].title = getTodo.title;
       this.todoList[index].description = getTodo.description;
       this.todoList[index].due = getTodo.due;
       console.log(this.todoList[index]);
      }
    );
    console.log('update to do task' + todoTask.id);
    this.todoTaskService.updateTodoTaskById(todoTask.id, todoTask).subscribe(
      (updateTodo) => {
        this.newTodoTask = updateTodo;
        var index = this.todoList.findIndex(
          x => x.id == updateTodo.id
        )
        this.todoList[index].title = updateTodo.title;
        this.todoList[index].description = updateTodo.description;
        this.todoList[index].due = updateTodo.due;
           
      }
    );
    this.getAllTodos;
    this.clickedEdit = false;
  }
}

