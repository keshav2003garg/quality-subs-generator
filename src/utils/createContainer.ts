import Dockerode from 'dockerode';
import { generateSlug } from 'random-word-slugs';
import fs from 'fs';

import type { Container } from 'dockerode';
import type { ICreateContainer } from '../types/container';

const docker = new Dockerode();

const createContainer = async (props: ICreateContainer): Promise<Container> => {
    const { inputVideoPath, outputDirectory, qualities, whisperOptions } =
        props;
    if (!fs.existsSync(inputVideoPath)) {
        throw new Error(`inputVideoPath: ${inputVideoPath} does not exist`);
    }
    if (!fs.existsSync(outputDirectory)) {
        throw new Error(`outputDirectory: ${outputDirectory} does not exist`);
    }
    if (!qualities.length) {
        throw new Error('qualities: Array must have at least one item');
    }
    if (!whisperOptions.outputFormat) {
        whisperOptions.outputFormat = 'srt';
    }
    if (!whisperOptions.outputDirectory) {
        whisperOptions.outputDirectory = '';
    }
    if (!whisperOptions.modelName) {
        whisperOptions.modelName = 'tiny';
    }
    const imageName = 'quality-subs-generator';
    const containerName = generateSlug(3, { format: 'kebab' });
    const videoName = inputVideoPath.split('/').pop();
    const container = await docker.createContainer({
        Image: imageName,
        name: containerName,
        HostConfig: {
            Binds: [
                `${inputVideoPath}:/app/input/${videoName}`,
                `${outputDirectory}:/app/output`,
            ],
        },
        Env: [
            `VIDEO_NAME=${videoName}`,
            `QUALITIES=${JSON.stringify(qualities)}`,
            `WHISPER_OPTIONS=${JSON.stringify(whisperOptions)}`,
        ],
        Entrypoint: ['bash', '/app/script.sh'],
    });
    return container;
};

export default createContainer;
