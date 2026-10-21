export {};

declare module '@mediamtx/moq/reader' {
  /**
   * @typedef {Object} ErrorDetail
   * @property {string} code - The error code.
   * @property {string} message - The error message.
   */

  /**
   * @typedef {Object} CatalogTrack
   * @property {string} name - The track name.
   * @property {string} packaging - The track packaging.
   * @property {boolean} isLive - Track live.
   * @property {string} codec - The track codec.
   * @property {number} samplerate - The track audio samplerate.
   */

  /**
   * @typedef {Object} VideoCatalogTrack
   * @property {string} name - The track name.
   * @property {string} packaging - The track packaging.
   * @property {boolean} isLive - Track live.
   * @property {string} codec - The track codec.
   */

  /**
   * @typedef {Object} AudioCatalogTrack
   * @property {string} name - The track name.
   * @property {string} packaging - The track packaging.
   * @property {boolean} isLive - Track live.
   * @property {string} codec - The track codec.
   * @property {number} samplerate - The track audio samplerate.
   */

  /**
   * Error event
   * @event MediaMTXMoQReader#event:error
   * @type {CustomEvent<ErrorDetail>}
   * @property {ErrorDetail} detail - Error event payload.
   */

  /**
   * Dimension changed event
   * @event MediaMTXMoQReader#event:dimensionschanged
   * @type {CustomEvent<VideoFrame>}
   * @property {VideoFrame} detail - The video frame information.
   */

  /**
   * Video render type event
   * @event MediaMTXMoQReader#event:rendertype
   * @type {CustomEvent<string>}
   * @property {string} detail - The video render type
   */

  /**
   * Connected event
   * @event MediaMTXMoQReader#event:connected
   * @type {CustomEvent}
   */

  /**
   * Restarting event
   * @event MediaMTXMoQReader#event:restarting
   * @type {CustomEvent}
   */

  /**
   * Muted event
   * @event MediaMTXMoQReader#event:muted
   * @type {CustomEvent<boolean>}
   * @property {boolean} detail - Audio muted
   */

  /**
   * Subscribed event
   * @event MediaMTXMoQReader#event:subscribed
   * @type {CustomEvent<boolean>}
   * @property {boolean} detail - Has an audio track
   */

  /**
   * Catalog data event
   * @event MediaMTXMoQReader#event:catalog
   * @type {CustomEvent<Catalog>}
   * @property {Catalog} detail - The catalog data.
   */

  /**
   * Subscribed track event
   * @event MediaMTXMoQReader#event:subscribedtrack
   * @type {CustomEvent<VideoCatalogTrack | AudioCatalogTrack>}
   * @property {VideoCatalogTrack | AudioCatalogTrack} detail - Video or audio catalog track
   */

  /**
   * Closed event
   * @event MediaMTXMoQReader#event:closed
   * @type {CustomEvent}
   */

  /**
   * Dimension changed event
   * @event VideoRenderer#event:dimensionschanged
   * @type {CustomEvent<VideoFrame>}
   * @property {VideoFrame} detail - The video frame information.
   */

  /**
   * Video render type event
   * @event VideoRenderer#event:rendertype
   * @type {CustomEvent<string>}
   * @property {string} detail - The video render type
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
    on(eventName: string, callback: EventListenerOrEventListenerObject): void;
  }

  /**
   * Reader error codes
   */
  export const ReaderErrorCodes: {
    STREAM_NOT_FOUND: number;
    CONNECTION: number;
    TRANSPORT: number;
    STREAMS: number;
    DATATRACK: number;
  };

  /**
   * @typedef Conf
   * @type {object}
   * @property {string} fingerprintUrl - URL to fetch the server certificate fingerprint.
   * @property {string} url - WebTransport URL to connect to.
   * @property {string} user - username.
   * @property {string} pass - password.
   * @property {string} token - token.
   * @property {HTMLElement} videoElement - element where the video canvas will be appended.
   * @property {HTMLCanvasElement} canvasElement - element where the video canvas will be appended.
   * @property {boolean} autostart - auto start the stream.
   * @property {boolean} autorestart - auto restart the stream on errors.
   * @property {boolean} autoclear - auto clear the render on close.
   * @property {number} retryDelay - the retry delay interval.
   */

  export interface Conf {
    fingerprintUrl: string;
    url: string;
    user?: string;
    pass?: string;
    token?: string;
    videoElement?: HTMLElement;
    canvasElement?: HTMLCanvasElement;
    autostart?: boolean;
    autorestart?: boolean;
    autoclear?: boolean;
    retryDelay?: number;
  }

  export type MediaMTXMoQReaderConf = Conf;

  export class MediaMTXMoQReader extends EventEmitter {
    /**
     * Create a MediaMTXMoQReader.
     * @param {Conf} conf - configuration.
     */
    constructor(conf: Conf);

    /**
     * Unmute the reader.
     */
    unmute(): void;

    /**
     * Mute the reader
     */
    mute(): void;

    /**
     * Start the stream
     */
    start(): void;

    /**
     * Close the stream
     */
    close(): void;

    /**
     * Set the audio volume
     * @param {number} value = the gain value 0-1
     */
    set volume(value: number);

    /**
     * Get the audio volume
     * @returns {number} the audio volume
     */
    get volume(): number;

    /**
     * Update the config
     * @param {Conf} conf - configuration.
     */
    set config(conf: Conf);

    /**
     * Get the current state
     */
    get state(): string;
  }
}
