import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { PlatService } from 'src/app/services/plat.service';

@Component({
  selector: 'app-add-plat',
  templateUrl: './add-plat.component.html',
  styleUrls: ['./add-plat.component.css']
})
export class AddPlatComponent implements OnInit {
  addPlatForm: FormGroup;
  plat: any = {};
  plats: any;
  title: any;
  title2: any;
  id: any;
  imagePreview: any;

  constructor(private formBuilder: FormBuilder, private activatedRoute: ActivatedRoute, private platService: PlatService) { }

  ngOnInit() {

    this.id = this.activatedRoute.snapshot.paramMap.get("id");

    // this.plats = JSON.parse(localStorage.getItem("plats") || "[]");

    if (this.id) {
      this.title = "edit Plat"
      this.title2 = "edit"
      // for (let i = 0; i < this.plats.length; i++) {
      //   
      //   }
      // }
      this.platService.getPlat(this.id).subscribe(
        (data) => {
          this.plat = data;
          if (this.plats.id == this.id) {
            this.plat = this.plats
          }
        }
      )
    }
    else {
      this.title = "add Plat";
      this.title2 = "add plat";
      this.addPlatForm = this.formBuilder.group({
        platName: [''],
        description: [''],
        price: ['']
      })
    }



  }

  addPlat() {
    if (this.id) {
      // edit
      // for (let i = 0; i < this.plats.length; i++) {
      //  if(this.plats[i].id == this.id){
      //    this.plats[i]= this.plat;
      //  }

      // }
      // localStorage.setItem("plats",JSON.stringify(this.plats));
      this.platService.updatePlat(this.plat).subscribe(
        () => {
          console.log("plat updated")

        }
      )

    } else {

      let connectedUser= JSON.parse(localStorage.getItem("connectedUser"));
      // // this.plats = JSON.parse(localStorage.getItem("plats") || "[]");
      // // let idPlat = JSON.parse(localStorage.getItem("idPlat") || "1");
      // this.plat.id = idPlat;
      this.plat.idChef = connectedUser._id;

      // this.plats.push(this.plat);

      // localStorage.setItem("plats",JSON.stringify(this.plats));
      // localStorage.setItem("idPlat",idPlat + 1);
      // this.platService.createPlat(this.plat).subscribe(
      //   (data) => {
      //     // this.plat.idChef = connectedUser.id;
      //     console.log(data.message)
      //     this.plat=data;
      //   }
      // )

    }

  }

}

