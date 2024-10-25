import { Injectable } from '@angular/core'
import { Observable, Subject } from 'rxjs'

@Injectable({
  providedIn: 'root',
})
export class WebSocketService {
  // TODO - replace with env var
  private wsUrl = 'ws://localhost:8000' // Replace with your backend URL
  private socket: WebSocket
  private subject: Subject<any>

  constructor() {
    this.socket = new WebSocket(`${this.wsUrl}/ws/network`)
    this.subject = new Subject<any>()

    this.socket.onmessage = (event) => {
      const data = JSON.parse(event.data)
      this.subject.next(data) // Pass the data to the observable
    }
  }

  getNetworkStats(): Observable<any> {
    return this.subject.asObservable()
  }
}
