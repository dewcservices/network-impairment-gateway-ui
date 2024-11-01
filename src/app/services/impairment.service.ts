/* eslint-disable @typescript-eslint/no-explicit-any */
// impairment.service.ts
import { Injectable } from '@angular/core'
import { HttpClient } from '@angular/common/http'
import { Observable, tap } from 'rxjs'
import { BearerService } from './bearer.service'
import { EnvironmentService } from './environment.service'
import { EnvironmentType } from '../dtos/environment-dtos'
import { ImpairmentDTO } from '../dtos/impairment-dtos'
import { environment } from '../../environments/environment'

@Injectable({
  providedIn: 'root',
})
export class ImpairmentService {
  private apiUrl = `${environment.apiHost}/api/settings/`

  constructor(
    private http: HttpClient,
    private bearerService: BearerService,
    private environmentService: EnvironmentService,
  ) {}

  getImpairment(): Observable<ImpairmentDTO> {
    return this.http.get<ImpairmentDTO>(this.apiUrl).pipe(
      tap((data) => {
        this.refresh(
          data.bearer_id,
          data.uplink_environment_id,
          data.downlink_environment_id,
        )
      }),
    )
  }

  refresh(
    bearerId: number,
    uplinkEnvironmentId: number,
    downlinkEnvironmentId: number,
  ): void {
    this.bearerService.getBearer(bearerId).subscribe()

    this.environmentService
      .getEnvironment(uplinkEnvironmentId, EnvironmentType.UPLINK)
      .subscribe()

    this.environmentService
      .getEnvironment(downlinkEnvironmentId, EnvironmentType.DOWNLINK)
      .subscribe()
  }

  setImpairment(
    bearerId: number,
    uplinkEnvironmentId: number,
    downlinkEnvironmentId: number,
  ): Observable<any> {
    this.refresh(bearerId, uplinkEnvironmentId, downlinkEnvironmentId)

    const payload: ImpairmentDTO = {
      bearer_id: bearerId,
      uplink_environment_id: uplinkEnvironmentId,
      downlink_environment_id: downlinkEnvironmentId,
    }

    return this.http.post<ImpairmentDTO>(this.apiUrl, payload)
  }
}
