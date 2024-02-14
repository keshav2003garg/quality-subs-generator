import { spawn } from 'child_process';
import fs from 'fs';

const transcodeVideo = (
    videoName: string,
    outputPath: string,
    qualities: Array<string>,
) => {
    const currentDate = new Date();
    const timestamp = currentDate.getTime().toString();
    fs.mkdirSync(`${outputPath}/${timestamp}`);
    const name = videoName.split('.').slice(0, -1).join('.');
    qualities.forEach((quality: string) => {
        const ffmpegCommand = spawn('ffmpeg', [
            '-i',
            `/app/input/${videoName}`,
            '-c:v',
            'libx264',
            '-c:a',
            'libmp3lame',
            '-vf',
            `scale=-2:${quality}`,
            `${outputPath}/${timestamp}/${name}_${quality}p.mp4`,
        ]);
        ffmpegCommand.stdout.on('data', (data) => {
            console.log(`${data}`);
        });
        ffmpegCommand.stderr.on('data', (data) => {
            console.error(`${data}`);
        });
        ffmpegCommand.on('close', (code) => {
            if (code === 0) {
                console.log(
                    `Video with quality ${quality} generation completed`,
                );
            } else {
                console.error(
                    `Video with quality ${quality} generation failed with code ${code}`,
                );
            }
        });
    });
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

transcodeVideo(videoName, outputPath, qualitiesArray);
