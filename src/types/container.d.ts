import { WhisperOptions } from './whisper';

export interface ICreateContainer {
    inputVideoPath: string;
    outputDirectory: string;
    qualities: string[];
    whisperOptions: WhisperOptions;
}
