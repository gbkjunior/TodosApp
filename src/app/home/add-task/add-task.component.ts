import { Component, OnInit } from '@angular/core';
import {Tasks} from '../../models/taskClass';
import {Task} from '../../models/task';


var ins = {} as Task;

@Component({
  selector: 'app-add-task',
  templateUrl: './add-task.component.html' ,
  styles: ['./add-task.component.css']
})
export class AddTaskComponent implements OnInit {

  newTodoTask : Tasks = new Tasks(ins);
  constructor() { }

  ngOnInit() {
  }

}
