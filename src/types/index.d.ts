import { WhisperOptions } from './whisper';

type AllowedQualities = '144' | '240' | '360' | '480' | '720' | '1080';

export interface IStartProcessing {
    inputVideoPath: string;
    outputDirectory: string;
    qualities: AllowedQualities[];
    logs?: boolean;
    imageBuildOptions?: {
        logs?: boolean;
    };
    whisperOptions: WhisperOptions;
}
