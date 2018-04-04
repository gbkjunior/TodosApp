import { Component, OnInit } from '@angular/core';
import {Tasks} from '../../models/taskClass';

@Component({
  selector: 'app-add-task',
  templateUrl: './add-task.component.html' ,
  styles: ['./add-task.component.css']
})
export class AddTaskComponent implements OnInit {

  newTodoTask : Tasks = new Tasks();
  constructor() { }

  ngOnInit() {
  }

}
