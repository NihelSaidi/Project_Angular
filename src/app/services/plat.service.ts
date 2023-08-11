import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class PlatService {

  // SERVER_URL: string = "http://localhost:8080/api/";
  SERVER_URL: string = "http://localhost:3000";

  constructor(private httpClient: HttpClient) { }

  // Get all Plats
  public getPlats(){ 
    return this.httpClient.get<{plats :any}>(this.SERVER_URL + '/api/plats');
  }

  // Get Plat By id
  public getPlat(platId){
    return this.httpClient.get<{plat :any}>(`${this.SERVER_URL + '/api/plats'}/${platId}`); 
  }

  // Create Plat
  public createPlat(plat, img : File){
    let formData = new FormData();

    formData.append('platName',plat.name);
formData.append('price',plat.price);
formData.append('description',plat.description);
formData.append('idChef',plat.idChef);
formData.append('img',img);
    return this.httpClient.post<{message:any}>(`${this.SERVER_URL + '/api/plats'}`, plat)
  }

  // Delete Plat
  public deletePlat(platId){
    return this.httpClient.delete<{message : any}>(`${this.SERVER_URL + '/api/deletePlat'}/${platId}`)
  }

  public updatePlat(plat){
    return this.httpClient.put(`${this.SERVER_URL + 'plats'}/${plat._id}`, plat)
}
  public getMyPlats(chefId){
    return this.httpClient.get<{plats : any}>(`${this.SERVER_URL + '/api/myPlats'}/${chefId}`)  }

  
}
