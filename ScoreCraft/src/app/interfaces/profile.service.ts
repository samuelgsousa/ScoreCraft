import {HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Profile } from './profile';
import { map, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProfileService {
  
  // updateProfileField(id: number, field: string, arg2: any) {
  //   throw new Error('Method not implemented.');
  // }

  private apiUrl = 'http://localhost:3000/api/profiles';
  
  constructor(private http: HttpClient) { }


  getAllUsers(): Observable<Profile[]> {
    return this.http.get<Profile[]>(this.apiUrl);
  }

  getUserById(id: number): Observable<Profile> {
    return this.http.get<Profile>(`${this.apiUrl}/${id}`);
  }

  getFollowersById(id: number): Observable<Profile[]> {
    return this.getAllUsers().pipe(
      map((profiles: any[]) => profiles.filter(profile => profile.seguindo?.includes(id)))
    );
  }


  addProfile(profile: Profile): Observable<Profile> {
    return this.http.post<Profile>(this.apiUrl, profile);
  }

  // getNextId(): number{
  //    const lastProfile = this.userList[this.userList.length - 1];
  //    return lastProfile ? lastProfile.id + 1 : 1;
  // }

  // Função para atualizar um perfil
  updateProfile(id: number, profile: Profile): Observable<Profile> {
    return this.http.put<Profile>(`${this.apiUrl}/${id}`, profile);
  }

    // Função para deletar um perfil
    deleteProfile(id: number): Observable<void> {
      return this.http.delete<void>(`${this.apiUrl}/${id}`);
    }


    
  }