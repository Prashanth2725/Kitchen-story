import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Category } from 'src/app/models/category';
import { CategoryService } from 'src/app/services/category/category.service';

@Component({
  selector: 'app-filter',
  templateUrl: './filter.component.html',
  styleUrls: ['./filter.component.css']
})
export class FilterComponent implements OnInit {
categories:Category[]=[]
  constructor(private categoryService:CategoryService,private router:Router) { }

  ngOnInit(): void {
    this.collectAllCategory()
  }
  categorySelected(category_id:string)
  {
    console.log(category_id);
    this.router.navigate([''],
    {
      queryParams:{
        'category': category_id
      }
    })
  }
  collectAllCategory()
  {
    this.categoryService.getAllCategories()
    .subscribe({
      next:(categories)=>{
        this.categories=categories;
        console.log(categories)
      },
      error:(response:HttpErrorResponse)=>{
        console.log(response);
      }
    })
  }
}
