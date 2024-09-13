import { Injectable } from '@angular/core';
import { Profile } from './profile';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ProfileService {

  private baseUrl = 'http://localhost:3000/api/profiles';


  
  constructor(private http: HttpClient) { }
  

  getAllUsers(): Observable<Profile[]>{
    return this.http.get<Profile[]>(this.baseUrl);
  }

  getUserById(id: number): Observable<Profile>{
    return this.http.get<Profile>(`${this.baseUrl}/${id}`)
  }

  getFollowersById(id: number): Observable<Profile[]> {
    return this.http.get<Profile[]>(`${this.baseUrl}/followers/${id}`);
  }

  addProfile(profile: Profile): Observable<Profile> {
    return this.http.post<Profile>(this.baseUrl, profile);
  }

 

  updateProfileField(userId: number, field: string, value: any): Observable<any> {
    const body = { field, value };

    // Faz uma requisição PATCH para atualizar o campo específico do perfil
    return this.http.patch(`${this.baseUrl}/${userId}`, body);
  }


    
  }