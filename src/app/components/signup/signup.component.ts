import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserService } from 'src/app/services/user.service';
import { MustMatch } from '../confirmPwd';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {
  userExist: String;

  signupForm : FormGroup;
  constructor(private formBuilder : FormBuilder , private userService : UserService) { }

  ngOnInit() {
    this.signupForm = this.formBuilder.group({
      firstName : ['',[Validators.minLength(3),Validators.required]],
      lastName : ['',[Validators.minLength(5),Validators.required]],
      email : ['',[Validators.email,Validators.required]],
      password : ['',[Validators.minLength(8),Validators.required]],
      confirmPassword : ['',[Validators.required]],
      tel : ['',[Validators.minLength(8),Validators.required, Validators.maxLength(13)]],
    },
    {
      // Appel de la fonction
      validator : MustMatch("password", "confirmPassword")
    }
    )
  }

  signup(f:any){
    // console.log(f);
    // let users = JSON.parse(localStorage.getItem("users") || "[]");
    // let idUser = JSON.parse(localStorage.getItem("idUser") || "1");
    // f.id = idUser;
    f.role ="client";
    // users.push(f);

    // localStorage.setItem("users", JSON.stringify(users));
    // localStorage.setItem("idUser" , idUser + 1);

    this.userService.createUser(f).subscribe(
      (data)=>{
        console.log(data.message);
        
      }
    )
  }
}
