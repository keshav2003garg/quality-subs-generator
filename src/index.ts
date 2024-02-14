import Dockerode from 'dockerode';
import buildImage from '../docker/lib/buildImage';

import type { IStartService } from './types/startService';

const docker = new Dockerode();

const startService = async ({ logs = true, ...props }: IStartService) => {
    const imageName = 'quality-subs-generator';
    await buildImage(imageName);
    const { inputVideoPath, outputDirectory, qualities } = props;
    const videoName = inputVideoPath.split('/').pop();
    const container = await docker.createContainer({
        Image: imageName,
        name: 'quality-subs-generator',
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
    await container.start();
    if (logs) {
        const logsStream = await container.logs({
            follow: true,
            stdout: true,
            stderr: true,
        });
        logsStream.on('data', (chunk) => {
            process.stdout.write(chunk.toString('utf8'));
        });
    }
    await container.wait();
    await container.remove();
};

startService({
    inputVideoPath: `${process.cwd()}/dist/video.mp4`,
    outputDirectory: `${process.cwd()}/dist/output`,
    qualities: ['144', '240'],
    logs: true,
})
    .then(() => {
        console.log('Service finished');
    })
    .catch((error) => {
        console.error(error);
    });

export default startService;
