import generateDifferentQualities from './utils/generateDifferentQualities';
import generateSubs from './utils/generateSubs';

const startProcessing = (
    videoName: string,
    outputPath: string,
    qualities: Array<string>,
) => {
    const currentDate = new Date();
    const timestamp = currentDate.getTime().toString();
    generateDifferentQualities(videoName, outputPath, timestamp, qualities);
    generateSubs(videoName, outputPath, timestamp);
};

const videoName = process.env.VIDEO_NAME;
const outputPath = '/app/output';
const qualities = process.env.QUALITIES;

if (!videoName) {
    console.error('No video name provided');
    process.exit(1);
}
if (!qualities) {
    console.error('No qualities provided');
    process.exit(1);
}
const qualitiesArray = JSON.parse(qualities);

startProcessing(videoName, outputPath, qualitiesArray);
