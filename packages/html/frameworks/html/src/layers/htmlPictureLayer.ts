import {CloudinaryImage} from "@cloudinary/base";
import {PictureSources} from '../types';

export class HtmlPictureLayer {
    pictureElement: any;
    constructor(element: HTMLPictureElement | null, userCloudinaryImage: CloudinaryImage, sources: PictureSources) {
        this.pictureElement = element;

        this.buildImageTag(userCloudinaryImage);
        sources.forEach(param => {this.buildSourceTag(param)})
    }

    buildImageTag(userCloudinaryImage: CloudinaryImage){
        const imageTag = document.createElement('img');
        imageTag.src = userCloudinaryImage.toURL();
        this.pictureElement.appendChild(imageTag);
    }

    /**
     * Builds source tag bases on user's input
     * @param param
     */
    buildSourceTag(param: {minWidth?: number, maxWidth?: number, image: CloudinaryImage, sizes?: string}){
        const source = document.createElement('source');
        source.srcset = param.image.toURL();

        if(param.sizes) {
            source.sizes = param.sizes;
        }
        if(param.maxWidth && param.minWidth){
            source.media = `(min-width: ${param.minWidth}px) and (max-width: ${param.maxWidth}px)`
        }else if(param.maxWidth){
            source.media = `(max-width: ${param.maxWidth}px)`
        }else if(param.minWidth){
            source.media = `(min-width: ${param.minWidth}px)`
        }

        this.pictureElement.appendChild(source);
    }

    /**
     * Called when component is updated.
     * @param updatedCloudinaryImage
     * @param sources
     */
    update(updatedCloudinaryImage: CloudinaryImage, sources: PictureSources){
        const sourcesToDelete = this.pictureElement.getElementsByTagName("SOURCE");
        while (sourcesToDelete[0]) sourcesToDelete[0].parentNode.removeChild(sourcesToDelete[0]);

        this.buildImageTag(updatedCloudinaryImage);
        sources.forEach(param => {this.buildSourceTag(param)})
    }
}
