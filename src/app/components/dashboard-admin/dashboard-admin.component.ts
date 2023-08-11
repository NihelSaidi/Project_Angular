import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { PlatService } from 'src/app/services/plat.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-dashboard-admin',
  templateUrl: './dashboard-admin.component.html',
  styleUrls: ['./dashboard-admin.component.css']
})
export class DashboardAdminComponent implements OnInit {

  users:any;
  plats:any;
  user:any;
  constructor( private router : Router , private userService : UserService, private platService : PlatService) { }

  ngOnInit() {
    // this.users = JSON.parse(localStorage.getItem("users") || "[]");
    this.userService.getUsers().subscribe(
      (data)=>{
          console.log(data.users);
          this.users = data.users;
      })

    // this.plats = JSON.parse(localStorage.getItem("plats") || "[]");
    this.platService.getPlats().subscribe(
      (data)=>{
        console.log(data.plats);
        this.plats=data.plats;
      }
    )
  }

  deleteUser(id:any){
    // let pos;
    //   for (let i = 0; i < this.users.length; i++) {
    //    if (this.users[i].id == id) {
    //      pos = i;
    //    }
    //   }
    //   this.users.splice(pos,1);
    //   localStorage.setItem("users", JSON.stringify(this.users));
      this.userService.deleteUser(id).subscribe(
        (data)=>{
          console.log(data.message);
          this.userService.getUsers().subscribe(
            (data)=>{
              this.users = data.users
            }
          )
          
        }
      )
  }

  


  displayUser(id:any){
   
        this.router.navigate([`displayUser/${id}`])
     
  }

  searchById(id,key){
    let obj;
    let tab = JSON.parse(localStorage.getItem(key) || "[]");
    for (let i = 0; i < tab.length; i++) {
      if(tab[i].id == id){
        obj = tab[i];
      }
    }
    return obj;
  }


  editUser(id){

    // let user = this.searchById(id,"users");
    // if (user.role == "admin" || user.role == "client") {
    //   this.router.navigate([`editUser/${id}`])
    // } else {
    //   this.router.navigate([`editChef/${id}`])

    // }
    
    this.userService.getUser(id).subscribe(
      (data)=>{
         this.user = data.user;
        if (this.user.role == "admin" || this.user.role == "client") {
            this.router.navigate([`editUser/${id}`])
          } else {
            this.router.navigate([`editChef/${id}`])
      
          }
      }
    )
  }

  getColor(role){
    switch (role) {
      case 'admin':
        return 'blue';
        break;
        case 'client':
          return 'orange';
          break;
          case 'chef':
        return 'green';
        break;
    
      default:
        break;
    }
  }
}
