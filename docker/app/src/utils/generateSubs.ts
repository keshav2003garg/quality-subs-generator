import { spawn } from 'child_process';
import fs from 'fs';
import whisper from './whisper';

const generateSubs = (
    videoName: string,
    outputPath: string,
    timestamp: string,
) => {
    fs.mkdirSync(`/app/temp/${timestamp}/audio`, { recursive: true });
    const name = videoName.split('.').slice(0, -1).join('.');
    const videoToAudioCommand = spawn('ffmpeg', [
        '-i',
        `/app/input/${videoName}`,
        '-ar',
        '16000',
        '-acodec',
        'pcm_s16le',
        `/app/temp/${timestamp}/audio/${name}.wav`,
    ]);
    videoToAudioCommand.stdout.on('data', (data: string) => {
        console.log(`${data}`);
    });
    videoToAudioCommand.stderr.on('data', (data: string) => {
        console.error(`${data}`);
    });
    videoToAudioCommand.on('close', (code: number) => {
        if (code === 0) {
            console.log('Audio generation completed');
            whisper(outputPath, timestamp, name);
        } else {
            console.error(`Audio generation failed with code ${code}`);
        }
    });
};

export default generateSubs;
