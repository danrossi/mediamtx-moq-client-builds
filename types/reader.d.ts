export {};

declare module '@mediamtx/moq' {
  /**
   * @callback OnError
   * @param {string} err - error.
   */
  type OnError = (err: string) => any;
  /**
   * @callback OnSubscribed
   * @param {boolean} hasAudio - whether an audio track was subscribed.
   */
  type OnSubscribed = (hasAudio: boolean) => any;

  /**
   * @callback OnAudioMuted
   * @param {boolean} muted - whether the audio is muted.
   */
  type OnAudioMuted = (muted: boolean) => any;

  /**
   * @typedef Conf
   * @type {object}
   * @property {string} fingerprintUrl - URL to fetch the server certificate fingerprint.
   * @property {string} url - WebTransport URL to connect to.
   * @property {string} user - username.
   * @property {string} pass - password.
   * @property {string} token - token.
   * @property {HTMLElement} videoElement - element where the video canvas will be appended.
   * @property {OnError} onError - called when there's an error.
   * @property {OnSubscribed} onSubscribed - called when track subscription is successful.
   * @property {OnAudioMuted} onAudioMuted - called when audio is muted or unmuted.
   */

  export interface Conf {
    fingerprintUrl: string;
    url: string;
    user?: string;
    pass?: string;
    token?: string;
    videoElement: HTMLElement;
    onError: OnError;
    onSubscribed: OnSubscribed;
    onAudioMuted: OnAudioMuted;
  }

  export type MediaMTXMoQReaderConf = Conf;

  export class MediaMTXMoQReader {
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
     * Set the audio volume
     * @param {number} value = the gain value 0-1
     */
    set volume(value: number);

    /**
     * Get the audio volume
     * @returns {number} the audio volume
     */
    get volume(): number;
  }
}
