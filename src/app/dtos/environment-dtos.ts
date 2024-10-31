export interface EnvironmentDTO {
  title: string
  description: string
  netem: EnvironmentNetemDTO
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

export interface EnvironmentNetemDTO {
  delay: NetemDelayDTO
  loss: NetemLossDTO
  corrupt: NetemCorruptDTO
}

export interface NetemDelayDTO {
  value: number // Replace with actual properties for delay
  unit: string
}

export interface NetemLossDTO {
  percentage: number // Replace with actual properties for loss
}

export interface NetemCorruptDTO {
  percentage: number // Replace with actual properties for corruption
}
