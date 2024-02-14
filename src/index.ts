import buildImage from '../docker/lib/buildImage';
import createContainer from './utils/createContainer';
import printLogs from './utils/printLogs';

import type { IStartService } from './types/startService';

const startService = async ({ logs = true, ...props }: IStartService) => {
    const imageName = 'quality-subs-generator';
    await buildImage(imageName);
    const container = await createContainer(props);
    await container.start();
    if (logs) {
        await printLogs(container);
    }
    await container.wait();
    await container.remove();
};

startService({
    inputVideoPath: `${process.cwd()}/dist/video.mp4`,
    outputDirectory: `${process.cwd()}/dist/output`,
    qualities: ['144'],
    logs: true,
})
    .then(() => {
        console.log('Service finished');
    })
    .catch((error) => {
        console.error(error);
    });
export default startService;
