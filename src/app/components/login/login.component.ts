import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  // Déclaration des variables globales
  title: String;
  image :String;

  user : any = {};
  loginForm : FormGroup;
  notExist : Boolean = false ;
  findedUser :any;
  constructor( private formBuilder : FormBuilder, private router : Router , private userService : UserService) { }

  ngOnInit() {

    this.title = "Login";
    this.image = "assets/img/logo.png";

    this.loginForm = this.formBuilder.group({
      email : [''],
      password : [''],
    })
  }

  // Déclaration d'une fonction
  // login(){
  //   console.log(this.user);

  //   let users = JSON.parse(localStorage.getItem("users") || "[]");
  //   let findedUser;
  //   for (let i = 0; i < users.length; i++) {
  //         if (users[i].email == this.user.email && users[i].password == this.user.password ) {
  //           findedUser = users[i];
  //         }  
  //   }

  //   if (findedUser) {
  //     localStorage.setItem("connectedUser", JSON.stringify(findedUser));
  //     switch (findedUser.role) {
  //       case "admin":
  //         this.router.navigate(['dashboardAdmin']);
  //         break;
  //       case "chef":
  //         this.router.navigate(['dashboardChef']);

  //       break;
  //       case "client":
  //         this.router.navigate(['']);

  //       break;
      
  //       default:
  //         break;
  //     }
      
  //   } else {
  //     this.notExist = true;
  //   }

    
  // }

  login(){
    this.userService.login(this.user).subscribe(
      (data)=>{
        console.log(data.findedUser);
        this.findedUser = data.findedUser;
           localStorage.setItem("connectedUser",JSON.stringify(this.findedUser));

           switch (this.findedUser.role) {
                  case "client":
                    this.router.navigate(['']);
                    break;
                  
                    case "admin":
                    this.router.navigate(['dashboardAdmin']);
                    break;
          
                    case "chef":
                      this.router.navigate(['dashboardChef']);
                      break;
                
                  default:
                    console.log("error");
                    break;
                }
        })
  }

}
