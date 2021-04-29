import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { Category } from 'src/app/models/category';
import { UserService } from '../user/user.service';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {
  getURL='http://localhost/api/categories'
  categoryUrl = 'http://localhost/api/categories'
  constructor(private http : HttpClient,private userService : UserService) { }
  getAllCategories()
  {
    return this.http.get(this.getURL)
    .pipe(map(result=>
      {
        return <Category[]>result['categories'];
      }))
  }
  saveCategory(data  : {title : string }){
    let headers = new HttpHeaders({
      'authorization' : this.userService.getToken()
    })
    return this.http.post(this.categoryUrl  , data   , {headers})
    .pipe(map((result : {message : string , category : Category})=>{
      return result.category;
    }))
  }
}
