import { Injectable } from '@angular/core';
import { catchError, Observable, of } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Filter } from '../models/filter';
import { Item } from '../models/item';
import { ItemsPayload } from '../models/items-payload';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ItemsService {
  itemsUrl = `${environment.apiUrl}/items`;
  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };
  constructor(private http: HttpClient) { }

  getItems(page:number, pageSize:number, filter:Filter): Observable<ItemsPayload> {
    let body = {
      name: filter.name,
      categories: filter.categories,
      page: page,
      pageSize: pageSize
    }
    
    return this.http.post<ItemsPayload>(this.itemsUrl, body, this.httpOptions)
    .pipe(catchError(this.handleError<ItemsPayload>('getItems', {items:[], count:0} )));
  }

  handleError<T>(operation = 'operation', result?: T) {
    return (error: any) : Observable<T> => {
      console.error(error);
      return of(result as T);
    }
  }

  getItem(id: number): Observable<Item> {
    const url = `${this.itemsUrl}/${id}`;
    return this.http.get<Item>(url)
              .pipe(catchError(this.handleError<Item>(`getItem/${id}`, {id:0, name:"", price:0, category:"", description:""})));
  }
}
