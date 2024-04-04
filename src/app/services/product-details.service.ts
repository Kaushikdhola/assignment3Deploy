import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environment.stage';

/* @author - snehitroda */

@Injectable({
  providedIn: 'root',
})
export class ProductDetailsService {
  private apiUrl = `${environment.apiUrl}/products`;

  //private apiUrlStubbed = 'http://localhost:8080/';


  constructor(private http: HttpClient) { }

  getProduct(productId: string): Observable<any> {
    console.log("productId", productId)
    const url = `${this.apiUrl}/${productId}`;
    //const url = this.apiUrlStubbed + "products/" + productId;
    console.log("The prepared url is: ", url);
    return this.http.get<any>(url);
  }

  concludeBidding(productId: string): Observable<any> {
    const url = `${this.apiUrl}/concludeBidding/${productId}`;
    return this.http.post<any>(url, null);

  }

  getProductsBySearchFilters(searchFilters: any): Observable<any> {
    const url = `${environment.apiUrl}/api/v1/search/products`;
    return this.http.post(url, searchFilters);
  }

  getProductInfo(productId: string) {
    // Make API call with productId as parameter
    return this.http.get(`product-info?pid=${productId}`);
  }

}
