// impairment.service.ts
import { Injectable } from '@angular/core'
import { HttpClient } from '@angular/common/http'
import { Observable, combineLatest } from 'rxjs'
import { map, take } from 'rxjs/operators'
import { BearerService } from './bearer.service'
import { EnvironmentService } from './environment.service'

@Injectable({
  providedIn: 'root',
})
export class ImpairmentService {
  private apiUrl = '/api/set-impairment'

  constructor(
    private http: HttpClient,
    private bearerService: BearerService,
    private environmentService: EnvironmentService,
  ) {}

  setImpairment(): Observable<any> {
    // Combine the latest values of bearer, uplink environment, and downlink environment
    return combineLatest([
      this.bearerService.currentBearer$,
      this.environmentService.uplinkEnvironment$,
      this.environmentService.downlinkEnvironment$,
    ]).pipe(
      take(1), // Take the latest values only once
      map(([bearer, uplinkEnv, downlinkEnv]) => {
        if (!bearer || !uplinkEnv || !downlinkEnv) {
          throw new Error(
            'Bearer, uplink environment, or downlink environment is not set.',
          )
        }
        // Construct the payload
        const payload = {
          bearer_id: bearer.id,
          uplink_environment_id: uplinkEnv.id,
          downlink_environment_id: downlinkEnv.id,
        }
        return payload
      }),
      // Make the POST request to set the impairment
      map((payload) => this.http.post(this.apiUrl, payload)),
    )
  }
}
