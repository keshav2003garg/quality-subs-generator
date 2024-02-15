type SupportedOutputFormats = 'srt' | 'vtt' | 'json' | 'txt' | 'all';
export type SupportedModels =
    | 'tiny.en'
    | 'tiny'
    | 'base.en'
    | 'base'
    | 'small.en'
    | 'small'
    | 'medium.en'
    | 'medium'
    | 'large';

export interface WhisperOptions {
    outputFormat?: SupportedOutputFormats;
    outputDirectory?: string;
    modelName?: SupportedModels;
}
