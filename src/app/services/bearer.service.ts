import { Injectable } from '@angular/core'
import { HttpClient } from '@angular/common/http'
import { Observable, BehaviorSubject } from 'rxjs'
import { BearerDetailsDTO, BearerDTO } from '../dtos/bearer-dtos

@Injectable({
  providedIn: 'root',
})
export class BearerService {
  private apiUrl = '/api/bearers'

  private currentBearerSubject = new BehaviorSubject<BearerDTO | null>(null)

  constructor(private http: HttpClient) {}

  // Observable stream for the current bearer
  currentBearer$ = this.currentBearerSubject.asObservable()

  getBearers(): Observable<BearerDetailsDTO[]> {
    return this.http.get<BearerDetailsDTO[]>(this.apiUrl)
  }

  getBearer(id: number): Observable<BearerDTO> {
    return this.http.get<BearerDTO>(`${this.apiUrl}/${id}`)
  }

  setBearer(bearer: BearerDTO) {
    this.currentBearerSubject.next(bearer)
  }
}
