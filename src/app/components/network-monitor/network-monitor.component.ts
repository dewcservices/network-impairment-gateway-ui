import { Component, OnInit, ElementRef } from '@angular/core'
import { WebSocketService } from '../../services/web-socket.service'
import { BaseComponentDirective } from '../golden-layout/base-component.directive'

@Component({
  selector: 'app-network-monitor',
  templateUrl: './network-monitor.component.html',
  styleUrl: './network-monitor.component.scss',
})
export class NetworkMonitorComponent
  extends BaseComponentDirective
  implements OnInit
{
  rxPerSec = 0
  txPerSec = 0
  packets_recv_per_sec = 0
  packets_sent_per_sec = 0
  errors_rx_per_sec = 0
  errors_tx_per_sec = 0
  dropped_rx_per_sec = 0
  dropped_tx_per_sec = 0

  constructor(
    elRef: ElementRef,
    private webSocketService: WebSocketService,
  ) {
    super(elRef.nativeElement)
  }

  ngOnInit(): void {
    this.webSocketService.getNetworkStats().subscribe((data) => {
      this.rxPerSec = data.bytes_recv_per_sec
      this.txPerSec = data.bytes_sent_per_sec
      this.packets_recv_per_sec = data.packets_recv_per_sec
      this.packets_sent_per_sec = data.packets_sent_per_sec
      this.errors_rx_per_sec = data.errors_rx_per_sec
      this.errors_tx_per_sec = data.errors_tx_per_sec
      this.dropped_rx_per_sec = data.dropped_rx_per_sec
      this.dropped_tx_per_sec = data.dropped_tx_per_sec
    })
  }
}

// eslint-disable-next-line @typescript-eslint/no-namespace
export namespace NetworkMonitorComponent {
  export const componentTypeName = 'NetworkMonitor'
}
