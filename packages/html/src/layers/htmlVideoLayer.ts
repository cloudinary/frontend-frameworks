import {Plugins, HtmlPluginState, VideoSources, VideoType} from '../types'
import cloneDeep from 'lodash.clonedeep'
import {CloudinaryVideo} from "@cloudinary/url-gen";
import {render} from '../utils/render';
import {VIDEO_MIME_TYPES} from "../utils/internalConstants";

export class HtmlVideoLayer{
    videoElement: any;
    originalVideo: CloudinaryVideo;
    htmlPluginState: HtmlPluginState;
    mimeType = 'video';
    mimeSubTypes = VIDEO_MIME_TYPES;

    constructor(element: HTMLVideoElement | null, userCloudinaryVideo: CloudinaryVideo, sources: VideoSources,  plugins?: Plugins, videoAttributes?: object){
        this.videoElement = element;
        this.originalVideo = userCloudinaryVideo;
        this.htmlPluginState = {cleanupCallbacks:[], pluginEventSubscription: []};
        const pluginCloudinaryVideo  = cloneDeep(userCloudinaryVideo);

        render(element, userCloudinaryVideo, plugins, this.htmlPluginState)
            .then(()=>{ // when resolved updates sources
                this.htmlPluginState.pluginEventSubscription.forEach(fn=>{fn()});

                this.setVideoAttributes(videoAttributes);
                this.handleSourceToVideo(pluginCloudinaryVideo, sources)
            });

    }

    /**
     * Handles user supplied sources or default sources
     * @param userCloudinaryVideo {CloudinaryVideo}
     * @param sources
     */
    handleSourceToVideo(userCloudinaryVideo: CloudinaryVideo, sources: VideoSources) {
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
    generateUserSources(userCloudinaryVideo: CloudinaryVideo, sources: VideoSources) {
        sources.map(({type, codecs , transcode}) => (
            this.appendSourceTag(
                cloneDeep(userCloudinaryVideo)
                    .transcode(transcode),
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

        this.videoElement.appendChild(source);
    }

    /**
     * Determines MIME type of given source type and codecs.
     * @param type - format of the video
     * @param codecs - optional information about codecs of the video
     */
    buildMimeType(type: VideoType, codecs: string[]){
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
        if(!videoAttributes) return;

        for (const [key, value] of Object.entries(videoAttributes)) {
            if(value){
                if(key === 'poster'){
                    this.videoElement.poster = value;
                } else {
                    this.videoElement[key] = true
                }
            }
        }
    }

    /**
     * Called when component is updated. If our video source has changed, a video reload is triggered.
     * @param updatedCloudinaryVideo
     * @param sources
     * @param plugins
     * @param videoAttributes
     */
    update(updatedCloudinaryVideo: CloudinaryVideo, sources: VideoSources,  plugins?: Plugins, videoAttributes?: object){
        if(updatedCloudinaryVideo !== this.originalVideo){
            const sourcesToDelete = this.videoElement.getElementsByTagName("SOURCE");
            while (sourcesToDelete[0]) sourcesToDelete[0].parentNode.removeChild(sourcesToDelete[0]);

            render(this.videoElement, updatedCloudinaryVideo, plugins, this.htmlPluginState)
                .then(()=>{ // when resolved updates sources
                    this.setVideoAttributes(videoAttributes);
                    this.handleSourceToVideo(updatedCloudinaryVideo, sources);
                    this.videoElement.load();
                });
        }
    }
}
