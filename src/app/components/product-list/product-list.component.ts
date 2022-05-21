import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Product } from 'src/app/common/product';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit {

  products: Product[];
  currentCategoryId: number;

  constructor(
    private productService: ProductService,
    private route: ActivatedRoute
    ) {console.log("instance created for category id:"+ route.url); }

  ngOnInit(): void {
    this.route.paramMap.subscribe(() => {
      this.listProducts();
    });
    
  }
  listProducts(){
    //check if id parameter is available
    const hasCategoryId: boolean = this.route.snapshot.paramMap.has('id');
    console.log("has categoryId:"+ hasCategoryId);

    //if id is available convert it into a number

    if(hasCategoryId){
      this.currentCategoryId = Number(this.route.snapshot.paramMap.get('id'));
      console.log(this.currentCategoryId);
    }else{

      //set default value as 1
      this.currentCategoryId=0;
      console.log(this.currentCategoryId);
    }
    this.productService.getProductList(this.currentCategoryId).subscribe(
      data => {
        this.products=data;
      }
    )
  }
}
