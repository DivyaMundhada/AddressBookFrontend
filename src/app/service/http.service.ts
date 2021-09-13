import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class HttpService {
  private baseUrl: string = "http://localhost:8080/addressbook";

  constructor(private httpClient: HttpClient) { }
  getAddressBookData(): Observable<any> {
    return this.httpClient.get(this.baseUrl + "/get");
  }

  deleteAddressBookData(id: number): Observable<any> {
    return this.httpClient.delete(this.baseUrl + "/delete",
      {
        headers: new HttpHeaders(),
        params: new HttpParams().append('id', id)
      })
  }
  
  addAddressBook(body: any): Observable<any> {
    return this.httpClient.post(this.baseUrl + "/add", body);
  }

  updateAddressBook(id:number,body: any): Observable<any> {
    return this.httpClient.put(this.baseUrl + "/update/?id=" + id, body);
  }

  getStateDetails(): Observable<any> {
    return this.httpClient.get(this.baseUrl + "/getStateDetails");
  } 

  getAddressBookDetailsByID(id: number): Observable<any> {
    return this.httpClient.get(this.baseUrl + "/getById",
      {
        headers: new HttpHeaders(),
        params: new HttpParams().append('id', id)
      })
  }
}