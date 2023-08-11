import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-add-admin',
  templateUrl: './add-admin.component.html',
  styleUrls: ['./add-admin.component.css']
})
export class AddAdminComponent implements OnInit {
  addAdminForm : FormGroup;
  user :any = {};
  id :any;
  users :any;
  title :any;
  constructor( private formBuilder : FormBuilder, private activatedRoute : ActivatedRoute , private userService : UserService) { }

  ngOnInit() {

    this.id = this.activatedRoute.snapshot.paramMap.get("id");
    console.log(this.id);

    // this.users = JSON.parse(localStorage.getItem("users") || "[]");
    if (this.id) {
      this.title = "Edit User";
      // edit
      // for (let i = 0; i < this.users.length; i++) {
      //   if (this.users[i].id == this.id) {
      //     this.user = this.users[i]
      //   }
        
      // }
      this.userService.getUser(this.id).subscribe(
        (data)=>{
          this.user = data.user;
        }
      )
      
    } else {
      // add
      this.title = "Add Admin ";

      this.addAdminForm = this.formBuilder.group({
        firstName : [''],
        lastName : [''],
        email : [''],
        password : [''],
        tel : [''],
      })
    }
  



   
  }

  addAdmin(){

    if (this.id) {
      // edit
      // for (let i = 0; i < this.users.length; i++) {
      //   if (this.users[i].id == this.id) {
      //     this.users[i] = this.user;
      //   }
        
      // }
      // localStorage.setItem("users", JSON.stringify(this.users));
      this.userService.updateUser(this.user).subscribe(
        ()=>{
          console.log("user updated");
          
        }
      )

    } else {
      // add
    // console.log(this.user);

    // let idUser = JSON.parse(localStorage.getItem("idUser") || "1");
    // this.user.id = idUser;
    this.user.role ="admin";
    // this.users.push(this.user);

    // localStorage.setItem("users", JSON.stringify(this.users));
    // localStorage.setItem("idUser" , idUser + 1);
        this.userService.createUser(this.user).subscribe(
          (data)=>{
            console.log(data.message);
            
          }
        )
    }
    
  }

}
