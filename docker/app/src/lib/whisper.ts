import { spawn } from 'child_process';

import type { WhisperOptions } from '../types/whisper';

const whisper = (
    outputPath: string,
    timestamp: string,
    name: string,
    whisperOptions: WhisperOptions,
) => {
    const outputFormat = whisperOptions.outputFormat;
    const outputDirectory = whisperOptions.outputDirectory;
    const modelName = whisperOptions.modelName;
    const whisperCommand = spawn('whisper', [
        `/app/temp/${timestamp}/audio/${name}.wav`,
        '--model',
        modelName,
        '--output_format',
        outputFormat,
        '--output_dir',
        `${outputPath}/${timestamp}/${outputDirectory}`,
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
