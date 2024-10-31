import { Injectable } from '@angular/core'
import { HttpClient } from '@angular/common/http'
import { Observable, BehaviorSubject } from 'rxjs'
import { EnvironmentDTO, EnvironmentDetailsDTO } from '../dtos/environment-dtos'

@Injectable({
  providedIn: 'root',
})
export class EnvironmentService {
  private apiUrl = '/api/environments'

  private uplinkEnvironmentSubject = new BehaviorSubject<EnvironmentDTO | null>(
    null,
  )
  private downlinkEnvironmentSubject =
    new BehaviorSubject<EnvironmentDTO | null>(null)

  constructor(private http: HttpClient) {}

  // Observable streams
  uplinkEnvironment$ = this.uplinkEnvironmentSubject.asObservable()
  downlinkEnvironment$ = this.downlinkEnvironmentSubject.asObservable()

  getEnvironments(): Observable<EnvironmentDetailsDTO[]> {
    return this.http.get<EnvironmentDetailsDTO[]>(this.apiUrl)
  }

  getEnvironment(id: number): Observable<EnvironmentDTO> {
    return this.http.get<EnvironmentDTO>(`${this.apiUrl}/${id}`)
  }

  setUplinkEnvironment(environment: EnvironmentDTO) {
    this.uplinkEnvironmentSubject.next(environment)
  }

  setDownlinkEnvironment(environment: EnvironmentDTO) {
    this.downlinkEnvironmentSubject.next(environment)
  }
}
