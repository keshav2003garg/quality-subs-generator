import startProcessing from '../src/index';

const processVideoWithSubtitles = async () => {
    try {
        await startProcessing({
            inputVideoPath: `${process.cwd()}/dist/video.mp4`,
            outputDirectory: `${process.cwd()}/dist/output`,
            qualities: ['144'],
            logs: true,
            imageBuildOptions: { logs: true },
            whisperOptions: { outputFormat: 'srt', modelName: 'tiny' },
        });
        console.log('Service finished');
    } catch (error) {
        console.error(error);
    }
};

processVideoWithSubtitles();
