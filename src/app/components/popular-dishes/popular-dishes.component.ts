import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-popular-dishes',
  templateUrl: './popular-dishes.component.html',
  styleUrls: ['./popular-dishes.component.css']
})
export class PopularDishesComponent implements OnInit {
  plats :any;
  constructor() { }

  ngOnInit() {
    this.plats = JSON.parse(localStorage.getItem("plats") || "[]");
  }

  update(e){
    this.plats = e;
  }

}
