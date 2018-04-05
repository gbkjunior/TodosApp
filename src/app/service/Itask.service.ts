import { Observable } from "rxjs/Rx";
import { Task } from "../models/task";
import {Tasks} from '../models/taskClass';

import {environment} from '../../environments/environment';

import {Http, Response} from '@angular/http'
import { Injectable, Inject } from "@angular/core";

import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';

const API_URL = environment.apiUrl;
/**
 * An interface that defines basic CRUD operations to minultate task objects.
 * You should implement this interface in a new service whose sole responsibily is
 * to interact with the mocked "backend". You can interface with the json db using angular's http library.
 *
 * The json db is hosted on port 3000. You can make requests to the task api using:
 *
 * ie: httpClient.get('http://localhost:3000/tasks') to retreive all tasks.
 *
 * To learn more: https://angular.io/tutorial/toh-pt6   https://github.com/typicode/json-server
 */
export interface ITaskService {
    /**
     * Retreives all tasks from the list
     */
    GetAll(): Promise<Task[]> | Observable<Task[]> ;

    /**
     * retreives a task from the list
     * @param id the id of the task to retreive
     */
    Get(id: number): Promise<Task> | Observable<Task>;

    /**
     * Creates a new task
     * @param task the new task to create
     */
    Create(task: Task): Promise<Task> | Observable<Task>;

    /**
     * Removes a task
     * @param id Id of the task you want to remove
     */
    Delete(id: number): Promise<boolean> | Observable<boolean>;

    /**
     * updates a task
     * @param id the id of the task you want to update
     * @param task the updated task
     */
    Update(id: number, task: Task): Promise<Task> | Observable<Task>;
}

@Injectable()
export class ITaskService implements ITaskService {
    constructor(@Inject(Http) private http: Http)
    {

    }
    
   public GetAll():  Observable<Task[]> {
        return this.http
            .get(API_URL + '/tasks')
            .map(response => {
             const todos = response.json();
                return todos.map((todo) => new Tasks(todo));
            })
            .catch(this.handleError);
    }


    Get(id: number): Observable<Task> {
        return this.http
        .get(API_URL + '/tasks/' + id)
        .map(response => {
          return new Tasks(response.json());
        })
        .catch(this.handleError);
    }

    Create(task: Task): Observable<Task> {
        return this.http
        .post(API_URL + '/tasks', task)
        .map(response => {
          return new Tasks(response.json());
        })
        .catch(this.handleError);
    }

    Delete(id: number):  Observable<boolean> {
        return this.http
        .delete(API_URL + '/tasks/' + id)
        .map(response => null)
        .catch(this.handleError);
    }

    Update(id: number, task: Task):  Observable<Task> {
        return this.http
        .put(API_URL + '/tasks/' + id, task)
        .map(response => {
            //console.log(response.json());
          return new Tasks(response.json());
        })
        .catch(this.handleError)
        
    }


    private handleError (error: Response | any) {
        console.error('ApiService::handleError', error);
        return Observable.throw(error);
      }
}

