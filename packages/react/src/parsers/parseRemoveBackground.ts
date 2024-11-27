import { CloudinaryRemoveBackgroundOption } from '../types'

export const parseRemoveBackground = (removeBackground: CloudinaryRemoveBackgroundOption): '' | `e_background_removal${string}` => {
  switch (removeBackground) {
    case false:
      return ''
    case true:
      return 'e_background_removal'
    case 'fineEdges':
      return 'e_background_removal:fineedges_y'
  }
}
