import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PlatService } from 'src/app/services/plat.service';

@Component({
  selector: 'app-display-plat',
  templateUrl: './display-plat.component.html',
  styleUrls: ['./display-plat.component.css']
})
export class DisplayPlatComponent implements OnInit {
 id:any;
 plats:any;
 plat:any;
 
  constructor(private activatedRoute:ActivatedRoute, private platService:PlatService) { }

  ngOnInit() {
    this.id=this.activatedRoute.snapshot.paramMap.get('id');
    // this.plats=JSON.parse(localStorage.getItem("plats") || "[]");

    // for (let i = 0; i < this.plats.length ; i++) {
    //   if(this.plats[i].id == this.id){
    //     this.plat=this.plats[i];
    //   }
      
    // }
    // console.log(this.plat);
    this.platService.getPlat(this.id).subscribe(
      (data)=>{
      console.log(data.plat);
      this.plat=data.plat;
    }
    )
  }

}