import {plugins, htmlPluginState, videoSources, videoType} from '../types'
import cloneDeep from 'lodash/cloneDeep'
import {CloudinaryVideo} from "@cloudinary/base";
import {CloudinaryImage} from "@cloudinary/base/assets/CloudinaryImage";
import {VIDEO_CODEC_TYPE, VIDEO_MIME_TYPES} from "../utils/internalConstants";

export class HtmlVideoLayer{
    asset: any;
    originalVideo: CloudinaryVideo;
    htmlPluginState: htmlPluginState;
    mimeType = 'video';
    mimeSubTypes = VIDEO_MIME_TYPES;

    constructor(videoElement: HTMLVideoElement | null, userCloudinaryVideo: CloudinaryVideo, sources: videoSources,  plugins?: plugins, videoAttributes?: object){
        this.asset = videoElement;
        this.originalVideo = userCloudinaryVideo;
        this.htmlPluginState = {cleanupCallbacks:[], pluginEventSubscription: []};
        const pluginCloudinaryVideo  = cloneDeep(userCloudinaryVideo);

        this.render(videoElement, userCloudinaryVideo, plugins)
            .then(()=>{ // when resolved updates sources
                this.htmlPluginState.pluginEventSubscription.forEach(fn=>{fn()});

                this.setVideoAttributes(videoAttributes);
                this.handleSourceToVideo(pluginCloudinaryVideo, sources)
            });

    }

    /**
     * Iterate through plugins and break in cases where the response is canceled. The
     * response is canceled if component is updated or unmounted
     * @param element Image element
     * @param pluginCloudinaryImage
     * @param plugins array of plugins passed in by the user
     * @return {Promise<void>}
     */
    async render(element: HTMLVideoElement, pluginCloudinaryImage: CloudinaryImage, plugins: any) {
        if(plugins === undefined) return;
        for(let i = 0; i < plugins.length; i++){
            const response = await plugins[i](element, pluginCloudinaryImage, this.htmlPluginState);
            if(response === 'canceled'){
                break;
            }
        }
    }

    /**
     * Handles user supplied sources or default sources
     * @param userCloudinaryVideo {CloudinaryVideo}
     * @param sources
     */
    handleSourceToVideo(userCloudinaryVideo: CloudinaryVideo, sources: videoSources) {
        // checks if user supplied sources
        if(sources){
           this.generateUserSources(userCloudinaryVideo, sources)
        }else {
            const defaultTypes = ['webm', 'mp4', 'ogg'];
            defaultTypes.forEach(type => {
                this.appendSourceTag(userCloudinaryVideo, type)
            });
        }
    }

    /**
     * Generate sources based on user input
     * @param userCloudinaryVideo {CloudinaryVideo}
     * @param sources
     */
    generateUserSources(userCloudinaryVideo: CloudinaryVideo, sources: videoSources) {
        sources.map(({type, codecs , videoCodec}) => (
            this.appendSourceTag(
                cloneDeep(userCloudinaryVideo)
                    .transcode(VIDEO_CODEC_TYPE[videoCodec]),
                type,
                this.buildMimeType(type, codecs))));
    }

    /**
     * Appends source tag to html video element
     * @param userCloudinaryVideo {CloudinaryVideo}
     * @param type {string}
     * @param mimeType {string}
     */
    appendSourceTag(userCloudinaryVideo: CloudinaryVideo, type: string, mimeType?: string){
        const source = document.createElement('source');

        source.src = `${userCloudinaryVideo.toURL()}.${type}`;
        source.type = mimeType ? mimeType :`video/${type}`;

        this.asset.appendChild(source);
    }

    /**
     * Determines MIME type of given source type and codecs.
     * @param type - format of the video
     * @param codecs - optional information about codecs of the video
     */
    buildMimeType(type: videoType, codecs: string[]){
        let mimeType = `${this.mimeType}/${this.mimeSubTypes[type] || type}`;

        if(codecs) {
            mimeType += "; codecs=" + (Array.isArray(codecs) ? codecs.join(', ') : codecs);
        }
        return mimeType;
    };

    /**
     * Iterates through the video attributes and sets to true if passed in by the user.
     * In case of poster, sets the poster.
     * @param videoAttributes {object} Supported attributes: controls, loop, muted, poster, preload, autoplay, playsinline
     */
    setVideoAttributes(videoAttributes: object) {
        for (const [key, value] of Object.entries(videoAttributes)) {
            if(value){
                if(key === 'poster'){
                    this.asset.poster = value;
                } else {
                    this.asset[key] = true
                }
            }
        }
    }

    /**
     * Cancels currently running plugins. This is called from unmount or update
     */
    cancelCurrentlyRunningPlugins(): void{
        this.htmlPluginState.cleanupCallbacks.forEach((fn: any) => {
            fn();// resolve each promise with 'canceled'
        })
    }

    /**
     * Called when component is updated. If our video source has changed, a video reload is triggered.
     * @param updatedCloudinaryVideo
     * @param sources
     * @param plugins
     * @param videoAttributes
     */
    update(updatedCloudinaryVideo: CloudinaryVideo, sources: videoSources,  plugins?: plugins, videoAttributes?: object){
        if(updatedCloudinaryVideo !== this.originalVideo){
            const sourcesToDelete = this.asset.getElementsByTagName("SOURCE");
            while (sourcesToDelete[0]) sourcesToDelete[0].parentNode.removeChild(sourcesToDelete[0]);

            this.render(this.asset, updatedCloudinaryVideo, plugins)
                .then(()=>{ // when resolved updates sources
                    this.setVideoAttributes(videoAttributes);
                    this.handleSourceToVideo(updatedCloudinaryVideo, sources);
                    this.asset.load();
                });
        }
    }
}
