/**
 * returns true if input is an image element
 * @param i
 */
export function isImage(i: any): i is HTMLImageElement {
    return i instanceof HTMLImageElement;
}
