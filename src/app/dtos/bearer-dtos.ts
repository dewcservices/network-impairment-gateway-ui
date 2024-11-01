import { NetemDelayDTO, NetemLossDTO } from './netem-dtos'
import { HBTDTO } from './htb-dtos'

export class BearerDetailsDTO {
  id: number
  title: string
  description: string
  img?: string

  constructor(id: number, title: string, description: string, img?: string) {
    this.id = id
    this.title = title
    this.description = description
    this.img = img
  }
}

export interface BearerDTO {
  title: string // Title of the bearer with min length 2 and max length 100
  description: string // Description of the bearer with min length 5 and max length 500
  img?: string // Optional URL for an image representing the bearer
  links: Record<string, BearerLinkDTO> // Dictionary of Bearer Links
}

// BearerLinkDTO.ts
export interface BearerLinkDTO {
  hbt: HBTDTO // Reference to HBT model containing rate and ceil values
  netem: BearerNetemDTO // Reference to NETEM model containing delay and loss values
}

// BearerNetemDTO.ts
export interface BearerNetemDTO {
  delay: NetemDelayDTO // Reference the Netem delay model
  loss: NetemLossDTO // Reference the Netem loss model
}
