import { Quality } from '../types'

export const parseQuality = (quality: Quality): `q_${string}` => {
  switch (quality) {
    case 'auto':
      return 'q_auto'
    case 'auto:good':
      return 'q_auto:good'
    case 'auto:eco':
      return 'q_auto:eco'
    case 'auto:low':
      return 'q_auto:low'
    case 'auto:best':
      return 'q_auto:best'
    case 'jpegmini':
      return 'q_jpegmini'
    case 'jpegmini:0':
      return 'q_jpegmini:0'
    case 'jpegmini:1':
      return 'q_jpegmini:1'
    case 'jpegmini:2':
      return 'q_jpegmini:2'
    case 'low':
      return 'q_low'
    case 'eco':
      return 'q_eco'
    case 'medium':
      return 'q_medium'
    case 'good':
      return 'q_good'
    case 'high':
      return 'q_high'
    case 'best':
      return 'q_best'
  }
}
