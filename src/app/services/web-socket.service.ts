/* eslint-disable @typescript-eslint/no-explicit-any */
import { Injectable } from '@angular/core'
import { Observable, Subject } from 'rxjs'
import { environment } from '../../environments/environment'

@Injectable({
  providedIn: 'root',
})
export class WebSocketService {
  private wsUrl = `${environment.websocketHost}`
  private socket: WebSocket
  private subject: Subject<any>

  private dataSubject = new Subject<{ txRate: number; rxRate: number }>()
  dataStream = this.dataSubject.asObservable()

  constructor() {
    this.socket = new WebSocket(`${this.wsUrl}/ws/network`)
    this.subject = new Subject<any>()

    this.socket.onmessage = (event) => {
      const data = JSON.parse(event.data)
      this.subject.next(data) // Pass the data to the observable
    }

    setInterval(() => {
      const txRate = Math.random() * 100
      const rxRate = Math.random() * 100
      this.dataSubject.next({ txRate, rxRate })
    }, 1000)
  }

  getNetworkStats(): Observable<any> {
    return this.subject.asObservable()
  }
}
