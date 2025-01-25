import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PicsumService {
  private apiUrl = 'https://picsum.photos/v2/list';

  constructor(
    private http: HttpClient
  ) { }

  getImages(page?: number): Observable<any> {
    let params = new HttpParams();

    if (page) {
      params = params.set('page', page.toString());
    }
    return this.http.get<any>(this.apiUrl, { params });
  }

}