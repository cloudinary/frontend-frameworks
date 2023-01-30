import {Plugins, HtmlPluginState, VideoSources, VideoType, VideoPoster} from '../types'
import cloneDeep from 'lodash.clonedeep'
import {CloudinaryVideo} from "@cloudinary/url-gen";
import {render} from '../utils/render';
import {VIDEO_MIME_TYPES} from "../utils/internalConstants";

const ANALYTICS_DELIMITER = '?_a=';

export class HtmlVideoLayer{
    videoElement: any;
    originalVideo: CloudinaryVideo;
    htmlPluginState: HtmlPluginState;
    mimeType = 'video';
    mimeSubTypes = VIDEO_MIME_TYPES;

    constructor(element: HTMLVideoElement | null, userCloudinaryVideo: CloudinaryVideo, sources: VideoSources,  plugins?: Plugins, videoAttributes?: object, userCloudinaryPoster?: VideoPoster){
        this.videoElement = element;
        this.originalVideo = userCloudinaryVideo;
        this.htmlPluginState = {cleanupCallbacks:[], pluginEventSubscription: []};
        const pluginCloudinaryVideo  = cloneDeep(userCloudinaryVideo);

        render(element, userCloudinaryVideo, plugins, this.htmlPluginState)
            .then(()=>{ // when resolved updates sources
                this.htmlPluginState.pluginEventSubscription.forEach(fn=>{fn()});

                this.setVideoAttributes(videoAttributes, userCloudinaryPoster);
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
            const defaultTypes = ['webm', 'mp4', 'ogv'];
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
        const url = userCloudinaryVideo.toURL();

        // Split url to get analytics string so that we can insert the file extension (type) before it
        // To simplify this we could add a .getPublicId to CloudinaryVideo and do vid.setPublicId(vid.getPublicId+type)
        // Another option could be to add a .setExtension, which will allow to do vid.setExtension(type)
        const srcParts = url.split(ANALYTICS_DELIMITER);
        const analyticsStr = srcParts[1] ? `${ANALYTICS_DELIMITER}${srcParts[1]}` :  '';


        source.src = `${srcParts[0]}.${type}${analyticsStr}`;
        // Ideally, we want to use the VIDEO_MIME_TYPE to detect the mime of the extension
        // For future proofing of simple formats (say .foo and mimetype of video/foo), we also fallback to the actual type
        source.type = mimeType ? mimeType :`video/${VIDEO_MIME_TYPES[type] || type}`;

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
    setVideoAttributes(videoAttributes: object = {}, userCloudinaryPoster?: VideoPoster) {
        if (userCloudinaryPoster === 'auto') {
          const posterCloudinaryVideo = cloneDeep(this.originalVideo);
          videoAttributes['poster'] = posterCloudinaryVideo
           .quality('auto')
           .format('jpg')
           .addTransformation('so_auto')
           .toURL()
        } else if (userCloudinaryPoster) {
            videoAttributes['poster'] = userCloudinaryPoster.toURL?.();
        }
        for (const [key, value] of Object.entries(videoAttributes)) {
          // Boolean attributes are considered to be true if they're present on the element at all.
          // You should set value to the empty string ("") or the attribute's name.
          // See https://developer.mozilla.org/en-US/docs/Web/API/Element/setAttribute
          value && this.videoElement.setAttribute(key, key === 'poster' ? value : '');
        }
    }

    /**
     * Called when component is updated. If our video source has changed, a video reload is triggered.
     * @param updatedCloudinaryVideo
     * @param sources
     * @param plugins
     * @param videoAttributes
     */
    update(updatedCloudinaryVideo: CloudinaryVideo, sources: VideoSources,  plugins?: Plugins, videoAttributes?: object, userCloudinaryPoster?: VideoPoster){
        if(updatedCloudinaryVideo !== this.originalVideo){
            const sourcesToDelete = this.videoElement.getElementsByTagName("SOURCE");
            while (sourcesToDelete[0]) sourcesToDelete[0].parentNode.removeChild(sourcesToDelete[0]);

            render(this.videoElement, updatedCloudinaryVideo, plugins, this.htmlPluginState)
                .then(()=>{ // when resolved updates sources
                    this.setVideoAttributes(videoAttributes, userCloudinaryPoster);
                    this.handleSourceToVideo(updatedCloudinaryVideo, sources);
                    this.videoElement.load();
                });
        }
    }
}
