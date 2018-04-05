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
 
  public newTodoTask: Tasks = new Tasks(ins);
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
     
      //console.log('inside ngoninit');
      //console.log(this.todoList);
      
    }  
  
  

  addTodoTask()
  {
    //console.log(this.newTodoTask.due.replace(/(\d{4})\-(\d{2})\-(\d{2}).*/, '$3/$2/$1'));
    this.newTodoTask.due = this.newTodoTask.due.replace(/(\d{4})\-(\d{2})\-(\d{2}).*/, '$2/$3/$1');
    if(this.newTodoTask.title!="" && this.newTodoTask.title.trim()!="" && !parseInt(this.newTodoTask.title)) {
      this.todoTaskService.addTodoTaskItem(this.newTodoTask).subscribe(
        (newTodo) => {
          this.todoList = this.todoList.concat(newTodo)
        }
      );
      
      this.clicked = false;
      alert("Task created successfully");
    }
    else {
      alert("Please enter task title");
    }
    //console.log('running addtodotask');
    
    this.newTodoTask = new Tasks(ins);
    
  }

  checkTodoTaskDone(todoTask) {
    //console.log('inside check todo');
    this.todoTaskService.checkTodoTaskComplete(todoTask).subscribe(
      (updatedTodo) => {
        todoTask = updatedTodo;
      
         
      }
     
    );
    if(todoTask.done == "false") {
      alert("Task not complete")
    }
    else
    if(todoTask.done == "true"){
      alert("task complete");
    }
  }
  

  updateTodoTask(todoTask) {
    this.clickedEdit = true;
    this.clicked = false;
    //console.log('inside update todo' +   todoTask.id);
    this.todoTaskService.getTodoTaskById(todoTask.id).subscribe(
      (getTodo) => {
        this.newTodoTask = getTodo;
        this.newTodoTask.due = this.newTodoTask.due.replace(/(\d{2})\/(\d{2})\/(\d{4}).*/, '$3-$1-$2');
      }
    );
    
  }
  clickAdd()
  {
    this.clicked = true;
    this.newTodoTask = new Tasks(ins);
    this.clickedEdit = false;
  }

  clickCancel()
  {
    this.clicked = false;
    alert('Cancel create Task');
  }

  clickCancelUpdate()
  {
    this.clickedEdit = false;
    this.newTodoTask = new Tasks(ins);
    alert('Cancel Update');
  }

  deleteTodoTask(todoTask)
  {
    console.log('inside delete to do');
    this.todoTaskService.deleteTodoTaskById(todoTask.id).subscribe(
      _ => {
        this.todoList = this.todoList.filter((t) => t.id!==todoTask.id);
        
      }
    );
    alert("Deleted Task Successful");
  }

  get getAllTodos()
  {
    console.log('running get all todos');
    return this.todoTaskService.getAllTodoTasks();
  }
  
  updateTaskById(todoTask)
  {
    //console.log('update to do task' + todoTask.due.replace(/(\d{4})\-(\d{2})\-(\d{2}).*/, '$2/$3/$1'));
    todoTask.due = todoTask.due.replace(/(\d{4})\-(\d{2})\-(\d{2}).*/, '$2/$3/$1');
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
    
    this.clickedEdit = false;
    alert('Task update Successful');
  }

  isNumeric(text : string) {
    return parseInt(text);
  }
}

