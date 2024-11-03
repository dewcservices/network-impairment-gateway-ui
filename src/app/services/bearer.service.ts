import { Injectable } from '@angular/core'
import { HttpClient } from '@angular/common/http'
import { Observable, BehaviorSubject, tap } from 'rxjs'
import { BearerDetailsDTO, BearerDTO } from '../dtos/bearer-dtos'
import { environment } from '../../environments/environment'

@Injectable({
  providedIn: 'root',
})
export class BearerService {
  private readonly apiUrl = `${environment.apiHost}/api/bearers`

  private readonly currentBearerSubject = new BehaviorSubject<BearerDTO | null>(
    null,
  )

  constructor(private readonly http: HttpClient) {}

  // Observable stream for the current bearer
  currentBearer$ = this.currentBearerSubject.asObservable()

  getBearers(): Observable<BearerDetailsDTO[]> {
    return this.http.get<BearerDetailsDTO[]>(`${this.apiUrl}/`)
  }

  getBearer(id: number): Observable<BearerDTO> {
    return this.http.get<BearerDTO>(`${this.apiUrl}/${id}`).pipe(
      tap((bearer: BearerDTO) => {
        this.setBearer(bearer)
      }),
    )
  }

  setBearer(bearer: BearerDTO) {
    this.currentBearerSubject.next(bearer)
  }
}
