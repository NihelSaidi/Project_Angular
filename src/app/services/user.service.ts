import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  // SERVER_URL: string = "http://localhost:8080/api/";
  SERVER_URL: string = "http://localhost:3000";

  constructor(private httpClient: HttpClient) { }

  // Get all users
  public getUsers(){ 
    return this.httpClient.get<{users :any}>(this.SERVER_URL + '/api/users');
  }

  // Get User By id
  public getUser(userId){
    return this.httpClient.get<{user :any}>(`${this.SERVER_URL + '/api/users'}/${userId}`); 
  }

  // Create User
  public createUser(user){
    return this.httpClient.post<{message:any}>(`${this.SERVER_URL + '/api/users'}`, user)
  }

  public login(user){
    return this.httpClient.post<{findedUser:any}>(`${this.SERVER_URL + '/api/login'}`, user)
  }

  // Delete User
  public deleteUser(userId){
    return this.httpClient.delete<{message : any}>(`${this.SERVER_URL + '/api/deleteUser'}/${userId}`)
  }

  public updateUser(user){
    return this.httpClient.put<{message : any}>(`${this.SERVER_URL + '/api/users'}/${user.id}`, user)
}
}
