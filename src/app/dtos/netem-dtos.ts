export interface NetemDelayDTO {
  time: number // ms
  jitter: number // ms
  correlation: number // %
}

export interface NetemLossDTO {
  percentage: number // %
  interval: number // ms
  correlation: number // %
}

export interface NetemCorruptDTO {
  percentage: number // %
  correlation: number // %
}
