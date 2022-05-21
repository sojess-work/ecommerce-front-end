import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Product } from '../common/product';
import { map } from 'rxjs/operators';
import { ProductCategory } from '../common/product-category';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  private baseUrl="http://localhost:8080/api/products";
  private categoryUrl="http://localhost:8080/api/product-category"

  constructor(private httpClient: HttpClient) { }

  getProductList(theCategoryId: number): Observable<Product[]> {
    
    console.log("product service is called for category id:" +theCategoryId);
    
    const searchUrl= theCategoryId==0?this.baseUrl:`${this.baseUrl}/search/findByCategoryId?id=${theCategoryId}`;
    
      return this.httpClient.get<GetResponseProducts>(searchUrl).pipe(
        map(response => response._embedded.products)
      );
    
  }
  getProductCategories(): Observable<ProductCategory[]> {

    return this.httpClient.get<GetResponseProductCategories>(this.categoryUrl).pipe(
      map(response => response._embedded.productCategory)
    );
  }
}

interface GetResponseProducts {
  _embedded:{
    products:Product[];
  }
}
interface GetResponseProductCategories {
  _embedded:{
    productCategory:ProductCategory[];
  }
}