import {CloudinaryImage} from "@cloudinary/url-gen";
import {screeWidths} from "../utils/screenWidths";
// @ts-ignore
import cloneDeep from "lodash.clonedeep";
import {scale} from "@cloudinary/url-gen/actions/resize";

const DEFAULT_MAX_WIDTH = 3840;
const DEFAULT_MIN_WIDTH = 375;
// constant used to generate the number of default breakpoints
const MAX_IMAGES = 5;
// constant used to estimate and simulate dpr
const DEFAULT_DPR_THRESHOLD = 768;

export class HtmlPictureSourceLayer{
    image: CloudinaryImage;
    minWidth: number;
    maxWidth: number;
    sizes: string;

    //to be later config;
    autoOptimalBreakpoints: boolean;
    breakpoints: number[];
    relativeWidth: number;
    constructor(image: CloudinaryImage, minWidth: number, maxWidth: number, sizes: string, autoOptimalBreakpoints?:boolean, breakpoints?: number[], relativeWidth= 1) {
        this.image = image;
        this.minWidth = minWidth;
        this.maxWidth = maxWidth;
        this.sizes = sizes;
        this.relativeWidth = relativeWidth;
        this.autoOptimalBreakpoints = autoOptimalBreakpoints;
        this.breakpoints = breakpoints;
    }

    toTag(){
        const source = document.createElement('source');
        this.setMedia(source);
        this.setSize(source);
        this.generateSrcsetUrl(source);

        return source;
  }

    /**
     * @description Sets Source element's media attribute
     * @param source {HTMLSourceElement} Source element
     */
    setMedia(source: HTMLSourceElement) {
        if(this.maxWidth && this.minWidth){
            source.media = `(min-width: ${this.minWidth}px) and (max-width: ${this.maxWidth}px)`;
        }else if(this.maxWidth){
            source.media = `(max-width: ${this.maxWidth}px)`;
        }else if(this.minWidth){
            source.media = `(min-width: ${this.minWidth}px)`;
        }
    }

    /**
     * @description Sets Source element's size attribute
     * @param source {HTMLSourceElement} Source element
     */
    setSize(source: HTMLSourceElement) {
        if(this.sizes && this.autoOptimalBreakpoints){
            console.error(`Invalid input: sizes must not be used with autoOptimalBreakpoints`);
        }

        if(this.sizes){
            source.sizes = this.sizes;
        }else if(this.relativeWidth && this.autoOptimalBreakpoints){
            source.sizes =  `${Math.ceil(this.relativeWidth * 100)}vw`
        }
    }

    /**
     * @description Generates Source element srcset attribute
     * @param source {HTMLSourceElement} Source element
     */
    generateSrcsetUrl(source: HTMLSourceElement) {
        const breakpoints = this.getBreakPoints();
        if(breakpoints.length === 0){
            source.srcset = this.image.toURL();
            return;
        }

        let breakpointUrls:string[] = [];
        breakpoints.forEach(breakPoint=>{
            const width = Math.ceil(breakPoint * this.relativeWidth);
            const clone = cloneDeep(this.image);
            breakpointUrls.push(`${clone.resize(scale(width)).toURL()} ${width}w`);
        });

        source.srcset = breakpointUrls.join(',');
    }

   /**
     * @description An array of breakpoints is calculated and returned based on the
     * predefined constants in screenWidths
     * See conditions bellow
     */
    getBreakPoints(){
        if(this.breakpoints){
            return this.breakpoints;
        }
        if(!this.autoOptimalBreakpoints){
            return [];
        }
        if(!this.minWidth && !this.maxWidth){
            console.error(`Invalid input: either maxWidth or minWidth is required`);
        }
        if(this.minWidth > this.maxWidth){
            console.error(`Invalid input: maxWidth must be greater than minWidth`);
        }
        const [physicalMinWidth, physicalMaxWidth] = this.getPhysicalDimension();

        if(physicalMinWidth === physicalMaxWidth){
            return [physicalMaxWidth];
        }

        //Take 5 (or up to 5) sorted widths with highest rank between physicalMaxWidth and physicalMinWidth
        return screeWidths.filter((width)=>{
            return width <= physicalMaxWidth && width >= physicalMinWidth;
        }).slice(0,MAX_IMAGES)
            .sort((a, b) => a - b);
    }

    /**
     * @description Returns the physical dimensions
     */
    getPhysicalDimension(){
        let maxWidth = this.maxWidth || DEFAULT_MAX_WIDTH;
        let minWidth = this.minWidth || DEFAULT_MIN_WIDTH;

        let physicalMaxWidth = this.getDprDimension(maxWidth);
        let physicalMinWidth = this.getDprDimension(minWidth);

        // if physicalMinWidth is greater we swap
        if(physicalMinWidth > physicalMaxWidth){
            [physicalMinWidth, physicalMaxWidth] = [physicalMaxWidth, physicalMinWidth];
        }

        return [physicalMinWidth, physicalMaxWidth];
    }

    /**
     * @description If dimension is less than default DPR threshold we multiply by 2
     * @param dimension {number} Estimates DPR bases on max and min width
     */
    getDprDimension(dimension: number){
        return dimension < DEFAULT_DPR_THRESHOLD ? dimension * 2 : dimension;
    }

}
