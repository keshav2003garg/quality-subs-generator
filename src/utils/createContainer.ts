import Dockerode from 'dockerode';
import { generateSlug } from 'random-word-slugs';

import type { Container } from 'dockerode';

interface ICreateContainer {
    inputVideoPath: string;
    outputDirectory: string;
    qualities: string[];
}

const docker = new Dockerode();

const createContainer = async (props: ICreateContainer): Promise<Container> => {
    const { inputVideoPath, outputDirectory, qualities } = props;
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
        ],
        Entrypoint: ['bash', '/app/script.sh'],
    });
    return container;
};

export default createContainer;
