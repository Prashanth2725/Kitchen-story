import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { UserService } from '../user/user.service';
import { Product } from 'src/app/models/products';
@Injectable({
  providedIn: 'root'
})
export class ProductService {
  productUrl = 'http://localhost/api/products'
 getAllProductUrl='http://localhost/api/products'
  constructor(private http:HttpClient,private userService:UserService) { }

  getAllProducts(params)
  {
    let query=new URLSearchParams()
    if(params['category']){
      query.append('category',params['category'])

    }
    console.log(query.toString());
    
    return this.http.get(`${this.getAllProductUrl}?${query.toString()}`,
      {
        headers:{
          'authorization':this.userService.getToken()
        }
      })
      .pipe(
        map((result:{count:number,products:Product[]})=>{
          return result.products
        })
      )
  }
  getProductById(id:string)
  {
    return this.http.get(`${this.getAllProductUrl}/${id}` ,
      {
        headers:{
          'authorization':this.userService.getToken()
        }
      })
      .pipe(
        map((result)=>{
          return <Product>result
        })
      )
  }
  saveProduct(data : FormData) {
    let headers=new HttpHeaders({
      'authorization': this.userService.getToken()
    })
    return this.http.post(this.productUrl, data,{ headers})
      .pipe(
        map((result : {message : string , product : Product}) => {
          return <Product>result.product
        })
      )

  }
  
  updateProduct(data , id) {
    
    return this.http.patch(this.productUrl + '/' + id,data)
  }
}
