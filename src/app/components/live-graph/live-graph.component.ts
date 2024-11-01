import { Component, OnInit, ViewChild, ElementRef } from '@angular/core'
import { ChartConfiguration, ChartOptions } from 'chart.js'
import { WebSocketService } from '../../services/web-socket.service'
import { BehaviorSubject, interval } from 'rxjs'
import { switchMap } from 'rxjs/operators'
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
  public lineChartData: ChartConfiguration<'line'>['data'] = {
    datasets: [
      {
        data: [],
        label: 'Tx Rate',
        fill: false,
        tension: 0.5,
        borderColor: 'blue',
      },
      {
        data: [],
        label: 'Rx Rate',
        fill: false,
        tension: 0.5,
        borderColor: 'green',
      },
    ],
    labels: [],
  }

  public lineChartOptions: ChartOptions<'line'> = {
    responsive: true,
    scales: {
      x: {
        title: { display: true, text: 'Time' },
      },
      y: {
        title: { display: true, text: 'Rate' },
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

    // Subscribe to WebSocket data updates
    this.webSocketService.dataStream
      .pipe(
        switchMap((data) => {
          this.updateChart(data.txRate, data.rxRate)
          return interval(1000) // Update every second
        }),
      )
      .subscribe()
  }

  private initializeChart(): void {
    this.txData$.next([])
    this.rxData$.next([])
    this.labels$.next([])
  }

  private updateChart(txRate: number, rxRate: number): void {
    const currentTime = new Date().toLocaleTimeString()

    // Update data arrays and emit new values
    const updatedTxData = [...this.txData$.value, txRate].slice(-20) // Keep last 20 points
    const updatedRxData = [...this.rxData$.value, rxRate].slice(-20)
    const updatedLabels = [...this.labels$.value, currentTime].slice(-20)

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
