import {plugins, htmlPluginState} from '../types'
import cloneDeep from 'lodash/cloneDeep'
import {CloudinaryVideo} from "@cloudinary/base";

export class HtmlVideoLayer{
    private readonly asset: any;
    htmlPluginState: htmlPluginState;
    constructor(videoElement: HTMLVideoElement | null, userCloudinaryVideo: CloudinaryVideo, sources: object,  plugins?: plugins, videoAttributes?: any[]){
        this.asset = videoElement;
        this.htmlPluginState = {cleanupCallbacks:[], pluginEventSubscription: []};
        const pluginCloudinaryVideo  = cloneDeep(userCloudinaryVideo);


        //add attribute to video element
        if(videoAttributes){
            videoAttributes.forEach(attr=>{
                console.log(typeof attr)
                this.asset.attr = true;
            });

            // for (const [key, value] of Object.entries(videoAttributes)) {
            //     console.log('value', value);
            //     // if(value){
            //     //     if(key === 'poster'){
            //     //         console.log('value', value);
            //     //         this.asset.poster = value;
            //     //     } else {
            //     //         this.asset[key] = true
            //     //     }
            //     // }
            // }
        }

        //add sources to video element
        this.addSourceToVideo(pluginCloudinaryVideo.toURL(), sources)

    }

    /**
     * append source to video element
     * @param src
     * @param type
     */
    addSourceToVideo(src: string, sources: object) {
        if(!sources){
            const defaultTypes = ['webm', 'mp4', 'ogg'];

            defaultTypes.forEach(type => {
                const source = document.createElement('source');

                source.src = `${src}.${type}`;
                source.type = `video/${type}`;

                this.asset.appendChild(source);
            });
        }
    }

    update(userCloudinaryVideo: CloudinaryVideo, plugins?: plugins, videoAttributes?: any[]){
        //delete sources and re do them
        this.asset.src = userCloudinaryVideo.toURL();
        this.asset.load();
        console.log('asset', this.asset);
    }
}
