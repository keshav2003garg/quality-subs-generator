import { spawn } from 'child_process';

const whisper = (outputPath: string, timestamp: string, name: string) => {
    const whisperCommand = spawn('whisper', [
        `/app/temp/${timestamp}/audio/${name}.wav`,
        '--model',
        'tiny.en',
        '--language',
        'English',
        '--output_format',
        'srt',
        '--output_dir',
        `${outputPath}/${timestamp}`,
    ]);
    whisperCommand.stdout.on('data', (data: string) => {
        console.log(`${data}`);
    });
    whisperCommand.stderr.on('data', (data: string) => {
        console.error(`${data}`);
    });
    whisperCommand.on('close', (whisperCode) => {
        if (whisperCode === 0) {
            console.log(`Subtitle generation completed`);
        } else {
            console.error(`Whisper command failed with code ${whisperCode}`);
        }
    });
};

export default whisper;
