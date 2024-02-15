import generateDifferentQualities from './utils/generateDifferentQualities';
import generateSubs from './utils/generateSubs';

import type { WhisperOptions } from './types/whisper';

const startProcessing = (
    videoName: string,
    outputPath: string,
    qualities: Array<string>,
    whisperOptions: WhisperOptions,
) => {
    const currentDate = new Date();
    const timestamp = currentDate.getTime().toString();
    generateDifferentQualities(videoName, outputPath, timestamp, qualities);
    generateSubs(videoName, outputPath, timestamp, whisperOptions);
};

const videoName = process.env.VIDEO_NAME;
const outputPath = '/app/output';
const qualities = process.env.QUALITIES;
const whisper = process.env.WHISPER_OPTIONS;

if (!videoName) {
    console.error('No video name provided');
    process.exit(1);
}
if (!qualities) {
    console.error('No qualities provided');
    process.exit(1);
}
if (!whisper) {
    console.error('No whisper options provided');
    process.exit(1);
}
const qualitiesArray = JSON.parse(qualities);
const whisperOptions = JSON.parse(whisper);

startProcessing(videoName, outputPath, qualitiesArray, whisperOptions);
