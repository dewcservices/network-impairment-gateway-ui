import { NetemDelayDTO, NetemLossDTO, NetemCorruptDTO } from './netem-dtos'

export enum EnvironmentType {
  UPLINK = 'uplink',
  DOWNLINK = 'downlink',
}

export class EnvironmentDetailsDTO {
  id: number
  title: string
  description: string

  constructor(id: number, title: string, description: string) {
    this.id = id
    this.title = title
    this.description = description
  }
}

export interface EnvironmentDTO {
  title: string
  description: string
  netem: EnvironmentNetemDTO
}

export interface EnvironmentNetemDTO {
  delay: NetemDelayDTO
  loss: NetemLossDTO
  corrupt: NetemCorruptDTO
}
