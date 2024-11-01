import { Injectable } from '@angular/core'
import { HttpClient } from '@angular/common/http'
import { Observable, BehaviorSubject, tap } from 'rxjs'
import {
  EnvironmentDTO,
  EnvironmentDetailsDTO,
  EnvironmentType,
} from '../dtos/environment-dtos'
import { environment } from '../../environments/environment'

@Injectable({
  providedIn: 'root',
})
export class EnvironmentService {
  private apiUrl = `${environment.apiHost}/api/environments`

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
    return this.http.get<EnvironmentDetailsDTO[]>(`${this.apiUrl}/`)
  }

  getEnvironment(
    id: number,
    type: EnvironmentType,
  ): Observable<EnvironmentDTO> {
    return this.http.get<EnvironmentDTO>(`${this.apiUrl}/${id}`).pipe(
      tap((environment: EnvironmentDTO) => {
        if (type === EnvironmentType.UPLINK) {
          this.setUplinkEnvironment(environment)
        } else if (type === EnvironmentType.DOWNLINK) {
          this.setDownlinkEnvironment(environment)
        }
      }),
    )
  }

  setUplinkEnvironment(environment: EnvironmentDTO) {
    this.uplinkEnvironmentSubject.next(environment)
  }

  setDownlinkEnvironment(environment: EnvironmentDTO) {
    this.downlinkEnvironmentSubject.next(environment)
  }
}
