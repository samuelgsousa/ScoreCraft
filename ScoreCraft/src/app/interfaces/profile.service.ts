import { Injectable } from '@angular/core';
import { Profile } from './profile';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
 
@Injectable({
  providedIn: 'root'
})
export class ProfileService {

  private baseUrl = 'https://scorecraft.onrender.com/api/profiles';
    //private baseUrl = 'http://localhost:3000/api/profiles'

  
  constructor(private http: HttpClient) { }
  

  getAllUsers(): Observable<Profile[]>{
    return this.http.get<Profile[]>(this.baseUrl);
  }

  getUserById(id: number): Observable<Profile>{
    return this.http.get<Profile>(`${this.baseUrl}/${id}`)
  }

  getLastUserid(): Observable<number> {
    return this.http.get<number>(`${this.baseUrl}/profiles/last`);
  }

  getFollowersById(id: number): Observable<Profile[]> {
    return this.http.get<Profile[]>(`${this.baseUrl}/followers/${id}`);
  }

  addProfile(profile: Profile): Observable<Profile> {
    console.log('reviews.service, dados recebidos, a serem passados para o db' + profile)
    return this.http.post<Profile>(this.baseUrl, profile);
  }

 

  updateProfile(profile: Profile): Observable<any> {
    console.log("Dados recebidos no profile.service.ts serem alterados: " + profile)
    return this.http.patch(`${this.baseUrl}/updating/${profile.id}`, profile);
  }


    
  }