import { Component, OnInit, ViewChild, ElementRef } from '@angular/core'
import { ChartConfiguration, ChartOptions } from 'chart.js'
import { WebSocketService } from '../../services/web-socket.service'
import { BehaviorSubject } from 'rxjs'

import { BaseComponentDirective } from '../golden-layout/base-component.directive'
import { BaseChartDirective } from 'ng2-charts'

@Component({
  selector: 'app-live-graph',
  templateUrl: './live-graph.component.html',
  styleUrls: ['./live-graph.component.scss'],
})
export class LiveGraphComponent
  extends BaseComponentDirective
  implements OnInit
{
  @ViewChild(BaseChartDirective) chart?: BaseChartDirective
  graphMaxTime = 120
  graphSlice = -1 * this.graphMaxTime
  public lineChartData: ChartConfiguration<'line'>['data'] = {
    datasets: [
      {
        type: 'line',
        data: [],
        label: 'Tx Rate',
        fill: false,
        tension: 0.5,
        borderColor: 'blue',
        backgroundColor: 'rgba(0, 0, 255, 0.3)',
        animation: false,
      },
      {
        type: 'line',
        data: [],
        label: 'Rx Rate',
        fill: false,
        tension: 0.5,
        borderColor: 'green',
        backgroundColor: 'rgba(0, 255, 0, 0.3)',
        animation: false,
      },
    ],
    labels: [],
  }

  public lineChartOptions: ChartOptions<'line'> = {
    responsive: true,
    maintainAspectRatio: false, // Important for Golden Layout responsiveness
    scales: {
      x: {
        title: { display: true, text: 'Time' },
      },
      y: {
        title: { display: true, text: 'Bytes' },
        min: 0,
      },
    },
  }

  private txData$ = new BehaviorSubject<number[]>([])
  private rxData$ = new BehaviorSubject<number[]>([])
  private labels$ = new BehaviorSubject<string[]>([])

  constructor(
    private webSocketService: WebSocketService,
    elRef: ElementRef,
  ) {
    super(elRef.nativeElement)
  }

  ngOnInit(): void {
    this.initializeChart()

    this.webSocketService.getNetworkStats().subscribe((data) => {
      this.updateChart(data.bytes_sent_per_sec, data.bytes_recv_per_sec)
    })
  }

  private initializeChart(): void {
    this.txData$.next([])
    this.rxData$.next([])
    this.labels$.next([])
  }

  private updateChart(txRate: number, rxRate: number): void {
    const currentTime = new Date().toLocaleTimeString()

    // Update data arrays and emit new values
    const updatedTxData = [...this.txData$.value, txRate].slice(this.graphSlice) // Keep last 20 points
    const updatedRxData = [...this.rxData$.value, rxRate].slice(this.graphSlice)
    const updatedLabels = [...this.labels$.value, currentTime].slice(
      this.graphSlice,
    )

    this.txData$.next(updatedTxData)
    this.rxData$.next(updatedRxData)
    this.labels$.next(updatedLabels)

    // Update chart data
    this.lineChartData.datasets[0].data = updatedTxData
    this.lineChartData.datasets[1].data = updatedRxData
    this.lineChartData.labels = updatedLabels
    // Trigger chart update
    this.chart?.update()
  }
}

// eslint-disable-next-line @typescript-eslint/no-namespace
export namespace LiveGraphComponent {
  export const componentTypeName = 'LiveGraph'
}
