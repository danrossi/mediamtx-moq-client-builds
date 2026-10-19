export {};

declare module '@mediamtx/moq/publisher' {
  /**
   * @callback OnError
   * @param {string} err - error.
   */
  type OnError = (err: string) => any;

  /**
   * @callback OnConnected
   */
  type OnConnected = () => any;

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
   * @property {OnError} onError - called when there's an error.
   * @property {OnConnected} onConnected - called when publishing has started.
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
    onError?: OnError;
    onConnected?: OnConnected;
  };

  export type MediaMTXMoQPublisherConf = Conf;

  /** Media-over-QUIC publisher. */
  export class MediaMTXMoQPublisher {
    /**
     * Create a MediaMTXMoQPublisher.
     * @param {Conf} conf - configuration.
     */
    constructor(conf: Conf);
  }
}
