import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { PlatService } from 'src/app/services/plat.service';

@Component({
  selector: 'app-dashboard-chef',
  templateUrl: './dashboard-chef.component.html',
  styleUrls: ['./dashboard-chef.component.css']
})
export class DashboardChefComponent implements OnInit {
  plats : any;
  connectedUser :any;
  myPlats : any = [];
  constructor(private router : Router, private platService: PlatService) { }

  ngOnInit() {
    // this.plats = JSON.parse(localStorage.getItem('plats') || "[]");
    this.connectedUser =JSON.parse(localStorage.getItem("connectedUser")||"[]");

    this.platService.getMyPlats(this.connectedUser._id).subscribe(
      (data) => {
        console.log(data.plats);
        
        this.myPlats=data.plats;
        
      }
      
    )
    // for (let i = 0; i < this.plats.length; i++) {
    //   if (this.plats[i].idChef == this.connectedUser.id) {
    //     this.myPlats.push(this.plats[i])
    //   }
    // }

    console.log(this.myPlats);
    


  }

  deletePlat(id) {
    // console.log(id);
    // let pos;
    // for (let i = 0; i < this.plats.length; i++) {
    //   if (this.plats[i].id == id) {
    //     pos = i;
    //   }

    // }
    // this.plats.splice(pos, 1);
    // localStorage.setItem("plats",JSON.stringify(this.plats));
    let connectedUser = JSON.parse(localStorage.getItem("connectedUser"));
    this.platService.deletePlat(id).subscribe(
      (data) => {
        console.log(data.message);
        //hedhi bch taja3li ness lkol sauf que eli fasa5to 
        this.platService.getMyPlats(connectedUser._id).subscribe(
          (data) => {
            this.myPlats = data.plats;
          }

        )

      }
    )
  }

  displayPlat(id){
    this.router.navigate([`displayPlat/${id}`]);
  }

  editPlat(id){
    this.router.navigate([`editPlat/${id}`]);
  }
}
