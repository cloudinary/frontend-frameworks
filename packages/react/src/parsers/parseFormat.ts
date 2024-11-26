import { CloudinaryImageFormat } from '../types'

export const parseFormat = (format: CloudinaryImageFormat) => `f_${format}`
