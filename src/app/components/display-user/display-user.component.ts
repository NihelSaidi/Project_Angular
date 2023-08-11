import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-display-user',
  templateUrl: './display-user.component.html',
  styleUrls: ['./display-user.component.css']
})
export class DisplayUserComponent implements OnInit {
  users:any;
  id:any;
  user:any={};
  constructor( private activatedRoute : ActivatedRoute , private userService : UserService) { }

  ngOnInit() {
        // display

    this.id = this.activatedRoute.snapshot.paramMap.get("id");
    console.log(this.id);
    // this.users = JSON.parse(localStorage.getItem("users") || "[]");
    // for (let i = 0; i < this.users.length; i++) {
    //   if (this.users[i].id == this.id) {
    //     this.user = this.users[i]
    //   }
      
    // }
      this.userService.getUser(this.id).subscribe(
        (data)=>{
          console.log(data.user);
          this.user = data.user
        }
      )
  }

}
