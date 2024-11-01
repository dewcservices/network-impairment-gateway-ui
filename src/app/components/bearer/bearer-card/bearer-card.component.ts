import { Component, ElementRef, OnInit } from '@angular/core'
import { BaseComponentDirective } from '../../golden-layout/base-component.directive'
import { BearerService } from '../../../services/bearer.service'
import { BearerDTO } from '../../../dtos/bearer-dtos'

@Component({
  selector: 'app-bearer-card',
  templateUrl: './bearer-card.component.html',
  styleUrl: './bearer-card.component.scss',
})
export class BearerCardComponent
  extends BaseComponentDirective
  implements OnInit
{
  // selectedBearer: BearerDTO | null = null
  selectedBearer: BearerDTO | null = {
    title: 'Optus C1 Satellite Link',
    description:
      'A satellite bearer connection with simulated impairments for testing DDIL conditions.',
    img: 'https://example.com/image-of-satellite.png', // Optional image URL
    links: {
      downlink: {
        hbt: {
          rate: { value: 1024, unit: 'kbps' },
          ceil: { value: 2048, unit: 'kbps' },
        },
        netem: {
          delay: {
            time: 500, // ms
            jitter: 50, // ms
            correlation: 25, // %
          },
          loss: {
            percentage: 1, // %
            interval: 1000, // ms
            correlation: 10, // %
          },
        },
      },
      uplink: {
        hbt: {
          rate: { value: 512, unit: 'kbps' },
          ceil: { value: 1024, unit: 'kbps' },
        },
        netem: {
          delay: {
            time: 300, // ms
            jitter: 30, // ms
            correlation: 15, // %
          },
          loss: {
            percentage: 0.5, // %
            interval: 500, // ms
            correlation: 5, // %
          },
        },
      },
    },
  }
  constructor(
    elRef: ElementRef,
    private bearerService: BearerService,
  ) {
    super(elRef.nativeElement)
  }

  ngOnInit(): void {
    this.bearerService.currentBearer$.subscribe(
      (bearer) => (this.selectedBearer = bearer),
    )
  }

  bearerLinksKeys(): string[] {
    return this.selectedBearer ? Object.keys(this.selectedBearer.links) : []
  }
}

// eslint-disable-next-line @typescript-eslint/no-namespace
export namespace BearerCardComponent {
  export const componentTypeName = 'BearerCard'
}
