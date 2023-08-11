import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-plat',
  templateUrl: './plat.component.html',
  styleUrls: ['./plat.component.css']
})
export class PlatComponent implements OnInit {

  // Déclaration de la variable @Input
  @Input() platChild :any;
  
    // Déclaration de la variable @Output
  @Output() newPlats = new EventEmitter<any>();
  constructor() { }

  ngOnInit() {
  }

  deletePlat(id){
    let plats = JSON.parse(localStorage.getItem("plats") || "[]");
    let pos;
    for (let i = 0; i < plats.length; i++) {
      if (plats[i].id == id) {
        pos = i;
      }
      
    }

    plats.splice(pos,1);
    localStorage.setItem("plats", JSON.stringify(plats));
    // Déclenchement de l'évènement du child vers parent
    this.newPlats.emit(plats);
  }

}
