import { Injectable } from '@angular/core'
import { HttpClient } from '@angular/common/http'
import { Observable } from 'rxjs'
import { BearerDetailsDTO } from '../dtos/bearer-details-dto'
import { EnvironmentDetailsDTO } from '../dtos/environment-details-dto'

@Injectable({
  providedIn: 'root',
})
export class HttpService {
  // TODO - replace with env var
  private apiUrl = 'http://localhost:8000/api' // Replace with your backend URL

  constructor(private http: HttpClient) {}

  setImpairment(bearerId: number, environmentId: number): Observable<any> {
    const url = `${this.apiUrl}/settings/` // API endpoint for setting impairment
    const payload = {
      bearerId: bearerId,
      environmentId: environmentId,
    }

    return this.http.post(url, payload)
  }

  /**
   * Get all bearers from the backend.
   * @returns Observable<BearerDetailsDTO[]>
   */
  getBearers(): Observable<BearerDetailsDTO[]> {
    return this.http.get<BearerDetailsDTO[]>(`${this.apiUrl}/bearers/`)
  }

  /**
   * Get all environments from the backend.
   * @returns Observable<EnvironmentDetailsDTO[]>
   */
  getEnvironments(): Observable<EnvironmentDetailsDTO[]> {
    return this.http.get<EnvironmentDetailsDTO[]>(
      `${this.apiUrl}/environments/`,
    )
  }
}