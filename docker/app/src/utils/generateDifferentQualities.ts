import { spawn } from 'child_process';
import fs from 'fs';

const generateDifferentQualities = (
    videoName: string,
    outputPath: string,
    timestamp: string,
    qualities: Array<string>,
) => {
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
                    `Video with quality ${quality}p generation completed`,
                );
            } else {
                console.error(
                    `Video with quality ${quality}p generation failed with code ${code}`,
                );
            }
        });
    });
};

export default generateDifferentQualities;
