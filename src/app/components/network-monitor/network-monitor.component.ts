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

  constructor(
    elRef: ElementRef,
    private webSocketService: WebSocketService,
  ) {
    super(elRef.nativeElement)
  }

  ngOnInit(): void {
    this.webSocketService.getNetworkStats().subscribe((data) => {
      this.rxPerSec = data.rx
      this.txPerSec = data.tx
    })
  }
}

// eslint-disable-next-line @typescript-eslint/no-namespace
export namespace NetworkMonitorComponent {
  export const componentTypeName = 'NetworkMonitor'
}
