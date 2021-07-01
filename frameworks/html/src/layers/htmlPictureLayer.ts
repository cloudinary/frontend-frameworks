import {CloudinaryImage} from "@cloudinary/base";
import {PictureSources, PictureSource} from '../types';
import cloneDeep from "lodash/cloneDeep";
import {scale} from "@cloudinary/base/actions/resize";
import {screeWidths} from '../utils/screenWidths';
const DIMENSION_LIMIT = 768;
const SRC_NUMBER = 5;
const DEFAULT_MAX_WIDTH = 3840;
const DEFAULT_MIN_WIDTH = 375;


export class HtmlPictureLayer {
    pictureElement: HTMLPictureElement;
    autoOptimalBreakpoints: boolean;
    constructor(element: HTMLPictureElement | null, userCloudinaryImage: CloudinaryImage, sources?: PictureSources, autoOptimalBreakpoints?: boolean, relativeWidth= 1) {
        this.pictureElement = element;
        this.autoOptimalBreakpoints = autoOptimalBreakpoints;

        this.buildImageTag(userCloudinaryImage);
        sources.forEach(source => {this.buildSourceTag(source, autoOptimalBreakpoints, relativeWidth)});
    }

    /**
     * Builds image tag based on user's Cloudinary image input
     * @param userCloudinaryImage
     */
    buildImageTag(userCloudinaryImage: CloudinaryImage){
        const imageTag = document.createElement('img');
        imageTag.src = userCloudinaryImage.toURL();
        this.pictureElement.appendChild(imageTag);
    }

    /**
     * Builds source tag bases on user's input
     * @param sourceInput
     * @param autoOptimalBreakpoints
     * @param relativeWidth
     */
    buildSourceTag(sourceInput: PictureSource, autoOptimalBreakpoints?: boolean, relativeWidth?: number){
        const source = document.createElement('source');
        let srcset: string[] = [];

        if(this.autoOptimalBreakpoints) {
            this.populateSrcsetUrl(source, sourceInput, srcset, relativeWidth)
        }
        this.setSourceAttributes(source, sourceInput, srcset, relativeWidth)
    }

    /**
     * Populates srcset based on generated breakpoints and relativeWidth
     * @param source
     * @param sourceInput
     * @param srcset
     * @param relativeWidth
     */
    populateSrcsetUrl(source: HTMLSourceElement, sourceInput: PictureSource, srcset: string[], relativeWidth?: number){
        let breakPoints = this.getBreakPoints(sourceInput);
        breakPoints.forEach(breakPoint=>{
            const width = Math.ceil(breakPoint * relativeWidth);
            const clone = cloneDeep(sourceInput.image);
            srcset.push(`${clone.resize(scale(width)).toURL()} ${width}w`);
        });
    }

    /**
     * Returns breakpoints based on min and max width
     * @param sourceInput
     */
    getBreakPoints(sourceInput: PictureSource){
        if(sourceInput.minWidth > sourceInput.maxWidth){
            return [sourceInput.minWidth];
        }
        const [physicalMinWidth, physicalMaxWidth] = this.getPhysicalDimension(sourceInput);

        if(physicalMinWidth === physicalMaxWidth){
            return [physicalMaxWidth];
        }

        return screeWidths.filter((width)=>{
            return width <= physicalMaxWidth && width >= physicalMinWidth;
        }).slice(0,SRC_NUMBER)
            .sort((a, b) => a - b);
    }

    /**
     * Sets the Source element's attributes
     * @param source
     * @param sourceInput
     * @param srcset
     * @param relativeWidth
     */
    setSourceAttributes(source: any, sourceInput: PictureSource, srcset?: string[], relativeWidth?: number){
        this.setMedia(source, sourceInput);
        this.setSize(source, sourceInput, relativeWidth);
        this.generateSrcsetUrl(source, sourceInput, srcset);

        this.pictureElement.appendChild(source);
    }

    /**
     * Sets Source element's media attribute
     * @param source
     * @param sourceInput
     */
    setMedia(source: HTMLSourceElement, sourceInput: PictureSource){
        if(sourceInput.maxWidth || sourceInput.minWidth){
            source.media = this.getMedia(sourceInput);
        }
    }

    /**
     * Sets Source element's size attribute
     * @param source
     * @param sourceInput
     * @param relativeWidth
     */
    setSize(source: HTMLSourceElement, sourceInput: PictureSource, relativeWidth?: number){
        source.sizes = this.getSizes(sourceInput, relativeWidth);
    }

    /**
     * Generates Source element srcset attribute
     * @param source
     * @param sourceInput
     * @param srcset
     */
    generateSrcsetUrl(source: HTMLSourceElement, sourceInput: PictureSource, srcset?: string[]){
        if(this.autoOptimalBreakpoints){
            source.srcset = srcset.join(',');
        }else {
            source.srcset = sourceInput.image.toURL();
        }
    }

    /**
     * Returns media attribute string
     * @param sourceInput
     */
    getMedia(sourceInput: PictureSource){
        if(sourceInput.maxWidth && sourceInput.minWidth){
            return `(min-width: ${sourceInput.minWidth}px) and (max-width: ${sourceInput.maxWidth}px)`;
        }else if(sourceInput.maxWidth){
            return `(max-width: ${sourceInput.maxWidth}px)`;
        }else if(sourceInput.minWidth){
            return `(min-width: ${sourceInput.minWidth}px)`;
        }
    }

    /**
     * Returns size attribute
     * @param sourceInput
     * @param relativeWidth
     */
    getSizes(sourceInput: PictureSource, relativeWidth?: number){
        if(sourceInput.sizes){
            return sourceInput.sizes
        }else if(relativeWidth){
            return `${Math.ceil(relativeWidth * 100)}vw`
        }
    }

    /**
     * Returns the physical dimensions
     * @param sourceInput
     */
    getPhysicalDimension(sourceInput: PictureSource){
        let maxWidth = sourceInput.maxWidth || DEFAULT_MAX_WIDTH;
        let minWidth = sourceInput.minWidth || DEFAULT_MIN_WIDTH;

        let physicalMaxWidth = this.getDprDimension(maxWidth);
        let physicalMinWidth = this.getDprDimension(minWidth);

        // if physical-min-width is greater we swap
        if(physicalMinWidth > physicalMaxWidth){
            [physicalMinWidth, physicalMaxWidth] = [physicalMaxWidth, physicalMinWidth];
        }

        return [physicalMinWidth, physicalMaxWidth];
    }
    /**
     * Ensures dimensions are larger than the DIMENSION_LIMIT
     * @param dimension
     */
    getDprDimension(dimension: number){
        return dimension < DIMENSION_LIMIT ? dimension * 2 : dimension;
    }

    /**
     * Called when component is updated.
     * @param updatedCloudinaryImage
     * @param sources
     * @param autoOptimalBreakpoints
     * @param relativeWidth
     */
    update(updatedCloudinaryImage: CloudinaryImage, sources?: PictureSources, autoOptimalBreakpoints?: boolean, relativeWidth?: number){
        const sourcesToDelete = this.pictureElement.getElementsByTagName("SOURCE");
        while (sourcesToDelete[0]) sourcesToDelete[0].parentNode.removeChild(sourcesToDelete[0]);

        this.buildImageTag(updatedCloudinaryImage);
        sources.forEach(source => {this.buildSourceTag(source, autoOptimalBreakpoints, relativeWidth)});
    }
}
