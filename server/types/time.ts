export interface Time {
  hours: number,
  mins: number
}

export interface TimeInterval {
  startTime: Time,
  endTime: Time,
}

// 8am
export const StartTime: Time = {
  hours: 8,
  mins: 0,
}

// 10pm
export const EndTime: Time = {
  hours: 22,
  mins: 0,
}
