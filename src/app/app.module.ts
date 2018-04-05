import { NgModule }      from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { HttpClientModule } from "@angular/common/http";
import {HttpModule} from '@angular/http';
import {environment} from '../environments/environment';
import { HomeComponent } from "./home/home.component";
import { HeaderComponent } from "./header/header.component";
import { TodoTaskComponent } from './home/todo-task/todo-task.component';
import { TaskHeaderComponent } from './header/task-header/task-header.component';
import { TaskDataService } from "./service/task-data.service";
import { ITaskService } from "./service/Itask.service";

import {DatePipe} from '@angular/common';

//import { ITaskServices } from "./service/Itask.service";
const API_URL = environment.apiUrl;

@NgModule({
  imports:      [ BrowserModule,HttpModule, HttpClientModule, FormsModule, ReactiveFormsModule ],
  declarations: [ HomeComponent, HeaderComponent, TodoTaskComponent, TaskHeaderComponent ],
  providers: [TaskDataService, ITaskService],
  bootstrap:    [ HomeComponent ]
})
/**
 * Main module for our application, if creating any new components, be sure to declare them above.
 * If creating any new services, provide them above
 */
export class AppModule { }