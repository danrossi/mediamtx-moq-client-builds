export {};

declare module '@mediamtx/moq/publisher' {
  /**
   * The error detail object
   * @typedef {Object} ErrorDetail
   * @property {string} code - The error code.
   * @property {string} message - The error message.
   */

  /**
   * Error event
   * @event MediaMTXMoQPublisher#event:error
   * @type {CustomEvent<ErrorDetail>}
   * @property {ErrorDetail} detail - Error event payload.
   */

  /**
   * Connected event
   * @event MediaMTXMoQPublisher#event:connected
   * @type {CustomEvent}
   */

  /**
   * Restarting event
   * @event MediaMTXMoQPublisher#event:restarting
   * @type {CustomEvent}
   */

  class EventEmitter extends EventTarget {
    /**
     * Emit event
     * @param {string} eventName
     * @param {any} detailData
     */
    emit(eventName: string, detailData: any): void;

    /**
     * Listen to event
     * @param {string} eventName
     * @param {EventListenerOrEventListenerObject} callback
     * @returns
     */
    on(eventName: string, callback: EventListenerOrEventListenerObject): this;
  }

  export interface ErrorDetail {
    code: number;
    message: string;
  }

  /**
   * Publishe error codes
   */
  export const PublishErrorCodes: {
    PUBLISH_ERROR: number;
    CONNECTION: number;
    TRANSPORT: number;
    STREAMS: number;
    VIDEO_WRITE: number;
    AUDIO_WRITE: number;
  };

  /**
   * @typedef Conf
   * @type {object}
   * @property {string} fingerprintUrl - URL to fetch the server certificate fingerprint.
   * @property {string} url - WebTransport URL to connect to.
   * @property {string} user - username.
   * @property {string} pass - password.
   * @property {string} token - token.
   * @property {MediaStream} stream - media stream to publish.
   * @property {string} videoCodec - video codec string (e.g., "avc3.640028").
   * @property {number} videoBitrate - video bitrate in kbps.
   * @property {number} videoFramerate - video framerate.
   * @property {number} videoKeyframeInterval - video keyframe interval in seconds.
   * @property {number} videoWidth - video width.
   * @property {number} videoHeight - video height.
   * @property {string} audioCodec - audio codec string (e.g., "opus").
   * @property {number} audioBitrate - audio bitrate in kbps.
   * @property {boolean} autostart - auto start the stream.
   * @property {boolean} autorestart - auto restart the stream on errors.
   * @property {number} retryDelay - the retry delay interval.
   */

  export type Conf = {
    fingerprintUrl: string;
    url: string;
    user?: string;
    pass?: string;
    token?: string;
    stream: MediaStream;
    videoCodec: string;
    videoBitrate: number;
    videoFramerate: number;
    videoKeyframeInterval: number;
    videoWidth: number;
    videoHeight: number;
    audioCodec: string;
    audioBitrate: number;
    autostart?: boolean;
    autorestart?: boolean;
    retryDelay?: number;
  };

  export type MediaMTXMoQPublisherConf = Conf;

  /** Media-over-QUIC publisher. */
  export class MediaMTXMoQPublisher extends EventEmitter {
    /**
     * Create a MediaMTXMoQPublisher.
     * @param {MediaMTXMoQPublisherConf} conf - configuration.
     */
    constructor(conf: MediaMTXMoQPublisherConf);

    /**
     * Start the stream
     */
    start(): void;

    /**
     * Close the stream
     */
    close(): void;

    /**
     * Update the config
     * @param {MediaMTXMoQPublisherConf} conf - configuration.
     */
    set config(conf: Partial<MediaMTXMoQPublisherConf>);

    /**
     * Set a new media stream
     * @param {MediaStream} - the media stream
     */
    set stream(stream: MediaStream): void;
  }
}
