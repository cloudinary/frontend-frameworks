import { CloudinaryRemoveBackgroundOption } from '../types'

export const parseRemoveBackgroundOption = (removeBackground: CloudinaryRemoveBackgroundOption) => {
  if (!removeBackground) {
    return ''
  }

  switch (removeBackground) {
    case true:
      return 'e_background_removal'
    case 'fineEdges':
      return 'e_background_removal:fineedges_y'
  }
}
