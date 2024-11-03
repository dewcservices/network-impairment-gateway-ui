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
  selectedBearer: BearerDTO | null = null

  constructor(
    elRef: ElementRef,
    private readonly bearerService: BearerService,
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
