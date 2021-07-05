import {CloudinaryImage} from "@cloudinary/base";
import {PictureSources, PictureSource} from '../types';
import cloneDeep from "lodash/cloneDeep";
import {scale} from "@cloudinary/base/actions/resize";
import {screeWidths} from '../utils/screenWidths';

const DEFAULT_MAX_WIDTH = 3840;
const DEFAULT_MIN_WIDTH = 375;
// constant used to generate the number of default breakpoints
const BREAKPOINT_NUMBER = 5;
// constant used to estimate and simulate dpr
const DPR_ESTIMATION = 768;


export class HtmlPictureLayer {
    pictureElement: HTMLPictureElement;
    autoOptimalBreakpoints: boolean;
    constructor(element: HTMLPictureElement | null, userCloudinaryImage: CloudinaryImage, sources?: PictureSources, autoOptimalBreakpoints?: boolean, relativeWidth= 1) {
        this.pictureElement = element;
        this.autoOptimalBreakpoints = autoOptimalBreakpoints;

        this.setImageTag(userCloudinaryImage);
        sources.forEach(source => {this.setSourceTag(source, autoOptimalBreakpoints, relativeWidth)});
    }

    /**
     * @description Sets image tag based on user's Cloudinary image input
     * @param userCloudinaryImage {CloudinaryImage} Cloudinary image instance
     */
    setImageTag(userCloudinaryImage: CloudinaryImage){
        const imageTag = document.createElement('img');
        imageTag.src = userCloudinaryImage.toURL();
        this.pictureElement.appendChild(imageTag);
    }

    /**
     * @description Sets source tag bases on user's input
     * @param sourceInput {PictureSource} Source input passed in by user.
     * @param autoOptimalBreakpoints {boolean} boolean to turn on auto optimal breakpoint generation. Default set to
     * false
     * @param relativeWidth {number} Floating point number from: 0 to 1. Default set to 1
     */
    setSourceTag(sourceInput: PictureSource, autoOptimalBreakpoints?: boolean, relativeWidth?: number){
        const source = document.createElement('source');
        let srcset: string[] = [];

        if(this.autoOptimalBreakpoints) {
            this.populateSrcsetUrl(source, sourceInput, srcset, relativeWidth)
        }
        this.setSourceAttributes(source, sourceInput, srcset, relativeWidth)
    }

    /**
     * @description Populates srcset based on generated breakpoints and relativeWidth
     * @param source {HTMLSourceElement} source element
     * @param sourceInput {PictureSource} Supported source attributes: minWidth, maxWidth, image, sizes
     * @param srcset {string[]} String array to hold generated the srcset
     * @param relativeWidth {number} Floating point number from: 0 to 1. Default set to 1
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
     * @description An array of breakpoints is calculated and returned based on the
     * predefined constants in screenWidths
     * See conditions bellow
     * @param sourceInput {PictureSource} Source input passed in by user.
     */
    getBreakPoints(sourceInput: PictureSource){
        if(!sourceInput.minWidth && !sourceInput.maxWidth){
            console.error(`Invalid input: either maxWidth or minWidth is required`);
        }
        if(sourceInput.minWidth > sourceInput.maxWidth){
            console.error(`Invalid input: maxWidth must be greater than minWidth`);
        }
        const [physicalMinWidth, physicalMaxWidth] = this.getPhysicalDimension(sourceInput);

        if(physicalMinWidth === physicalMaxWidth){
            return [physicalMaxWidth];
        }

        //Take 5 (or up to 5) sorted widths with highest rank between physicalMaxWidth and physicalMinWidth
        return screeWidths.filter((width)=>{
            return width <= physicalMaxWidth && width >= physicalMinWidth;
        }).slice(0,BREAKPOINT_NUMBER)
            .sort((a, b) => a - b);
    }

    /**
     * @description Sets the Source element's attributes
     * @param source {HTMLSourceElement} Source element
     * @param sourceInput {PictureSource} Source input passed in by user.
     * @param srcset {string[]} String array to hold generated the srcset
     * @param relativeWidth {number} Floating point number from: 0 to 1. Default set to 1
     */
    setSourceAttributes(source: any, sourceInput: PictureSource, srcset?: string[], relativeWidth?: number){
        this.setMedia(source, sourceInput);
        this.setSize(source, sourceInput, relativeWidth);
        this.generateSrcsetUrl(source, sourceInput, srcset);

        this.pictureElement.appendChild(source);
    }

    /**
     * @description Sets Source element's media attribute
     * @param source {HTMLSourceElement} Source element
     * @param sourceInput {PictureSource} Source input passed in by user.
     */
    setMedia(source: HTMLSourceElement, sourceInput: PictureSource){
        if(sourceInput.maxWidth || sourceInput.minWidth){
            source.media = this.getMedia(sourceInput);
        }
    }

    /**
     * @description Sets Source element's size attribute
     * @param source {HTMLSourceElement} Source element
     * @param sourceInput {PictureSource} Source input passed in by user.
     * @param relativeWidth {number} Floating point number from: 0 to 1. Default set to 1
     */
    setSize(source: HTMLSourceElement, sourceInput: PictureSource, relativeWidth?: number){
        source.sizes = this.getSizes(sourceInput, relativeWidth);
    }

    /**
     * @description Generates Source element srcset attribute
     * @param source {HTMLSourceElement} Source element
     * @param sourceInput {PictureSource} Source input passed in by user.
     * @param srcset {string[]} String array to hold generated the srcset
     */
    generateSrcsetUrl(source: HTMLSourceElement, sourceInput: PictureSource, srcset?: string[]){
        if(this.autoOptimalBreakpoints){
            source.srcset = srcset.join(',');
        }else {
            source.srcset = sourceInput.image.toURL();
        }
    }

    /**
     * @description Returns media attribute string
     * @param sourceInput {PictureSource} Source input passed in by user.
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
     * @description Returns sizes attribute
     * @param sourceInput {PictureSource} Source input passed in by user.
     * @param relativeWidth {number} Floating point number from: 0 to 1. Default set to 1
     */
    getSizes(sourceInput: PictureSource, relativeWidth?: number){
        if(sourceInput.sizes){
            return sourceInput.sizes
        }else if(relativeWidth){
            return `${Math.ceil(relativeWidth * 100)}vw`
        }
    }

    /**
     * @description Returns the physical dimensions
     * @param sourceInput {PictureSource} Source input passed in by user.
     */
    getPhysicalDimension(sourceInput: PictureSource){
        let maxWidth = sourceInput.maxWidth || DEFAULT_MAX_WIDTH;
        let minWidth = sourceInput.minWidth || DEFAULT_MIN_WIDTH;

        let physicalMaxWidth = this.getDprDimension(maxWidth);
        let physicalMinWidth = this.getDprDimension(minWidth);

        // if physicalMinWidth is greater we swap
        if(physicalMinWidth > physicalMaxWidth){
            [physicalMinWidth, physicalMaxWidth] = [physicalMaxWidth, physicalMinWidth];
        }

        return [physicalMinWidth, physicalMaxWidth];
    }
    /**
     * @description If dimension is less than DPR_ESTIMATION we multiply by 2
     * @param dimension {number} Estimates DPR bases on max and min width
     */
    getDprDimension(dimension: number){
        return dimension < DPR_ESTIMATION ? dimension * 2 : dimension;
    }

    /**
     * @description Called when component is updated.
     * @param updatedCloudinaryImage {CloudinaryImage} Updated Cloudinary image instance
     * @param sources {HTMLSourceElement} Source element
     * @param autoOptimalBreakpoints {boolean} boolean to turn on auto optimal breakpoint generation. Default set to
     * @param relativeWidth {number} Floating point number from: 0 to 1. Default set to 1
     */
    update(updatedCloudinaryImage: CloudinaryImage, sources?: PictureSources, autoOptimalBreakpoints?: boolean, relativeWidth?: number){
        const sourcesToDelete = this.pictureElement.getElementsByTagName("SOURCE");
        while (sourcesToDelete[0]) sourcesToDelete[0].parentNode.removeChild(sourcesToDelete[0]);

        this.setImageTag(updatedCloudinaryImage);
        sources.forEach(source => {this.setSourceTag(source, autoOptimalBreakpoints, relativeWidth)});
    }
}
