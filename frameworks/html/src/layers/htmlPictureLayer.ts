import {CloudinaryImage} from "@cloudinary/url-gen";
import {PictureSources, PictureSource} from '../types';
import {HtmlPictureSourceLayer} from "./htmlPictureSourceLayer";

export class HtmlPictureLayer {
    pictureElement: HTMLPictureElement;
    constructor(element: HTMLPictureElement | null, userCloudinaryImage: CloudinaryImage, breakpoints?:number[], sources?: PictureSources, autoOptimalBreakpoints?: boolean, relativeWidth= 1) {
        this.pictureElement = element;

        sources.forEach(source => {this.setSourceTag(breakpoints, source, autoOptimalBreakpoints, relativeWidth)});
        this.setImageTag(userCloudinaryImage);
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
     * @description Calls HtmlPictureSourceLayer to set the source tag bases on user's input
     * @param breakpoints {number[]} User's breakpoint array.
     * @param sourceInput {PictureSource} Source input passed in by user.
     * @param autoOptimalBreakpoints {boolean} boolean to turn on auto optimal breakpoint generation. Default set to
     * false
     * @param relativeWidth {number} Floating point number from: 0 to 1. Default set to 1
     */
    setSourceTag(breakpoints?:number[], sourceInput?: PictureSource, autoOptimalBreakpoints?: boolean, relativeWidth?: number){
        const sourceTest =
            new HtmlPictureSourceLayer(
                sourceInput.image,
                sourceInput.minWidth,
                sourceInput.maxWidth,
                sourceInput.sizes,
                autoOptimalBreakpoints,
                breakpoints,
                relativeWidth)
                    .toTag();

        this.pictureElement.appendChild(sourceTest);
    }


    /**
     * @description Called when component is updated.
     * @param updatedCloudinaryImage {CloudinaryImage} Updated Cloudinary image instance
     * @param breakpoints
     * @param sources {HTMLSourceElement} Source element
     * @param autoOptimalBreakpoints {boolean} boolean to turn on auto optimal breakpoint generation. Default set to
     * @param relativeWidth {number} Floating point number from: 0 to 1. Default set to 1
     */
    update(updatedCloudinaryImage: CloudinaryImage, breakpoints?:number[], sources?: PictureSources, autoOptimalBreakpoints?: boolean, relativeWidth?: number){
        const sourcesToDelete = this.pictureElement.getElementsByTagName("SOURCE");
        while (sourcesToDelete[0]) sourcesToDelete[0].parentNode.removeChild(sourcesToDelete[0]);

        this.setImageTag(updatedCloudinaryImage);
        sources.forEach(source => {this.setSourceTag(breakpoints, source, autoOptimalBreakpoints, relativeWidth)});
    }
}
