import { Component } from '@angular/core'
import { WebSocketService } from '../../services/web-socket.service'

@Component({
  selector: 'app-network-monitor',
  templateUrl: './network-monitor.component.html',
  styleUrl: './network-monitor.component.scss',
})
export class NetworkMonitorComponent {
  rxPerSec: number = 0
  txPerSec: number = 0

  constructor(private webSocketService: WebSocketService) {}

  ngOnInit(): void {
    this.webSocketService.getNetworkStats().subscribe((data) => {
      this.rxPerSec = data.rx
      this.txPerSec = data.tx
    })
  }
}
