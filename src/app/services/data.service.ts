import { Injectable } from '@angular/core';
import {InMemoryDbService} from 'angular-in-memory-web-api'

@Injectable({
  providedIn: 'root'
})
export class DataService implements InMemoryDbService{

  constructor() { }
  createDb(){

   let  users =  [
    {  id:  1,  firstName:  'Takwa', lastName: 'Ait hamou', email : 'takwa@gmail.com', tel: '53566147', role: 'admin' },
    {  id:  2,  firstName:  'Mohamed ', lastName: 'Mohamed', email : 'client@gmail.com', tel: '53566147', role: 'client' },
    {  id:  3,  firstName:  'chef 1 ', lastName: 'chef 1', email : 'chef@gmail.com', tel: '53566147', role: 'chef' },
   
   ];

   return {users};

  }
}

