import buildImage from './src/utils/buildImage';
import createContainer from './src/utils/createContainer';
import printLogs from './src/utils/printLogs';

import type { IStartProcessing } from './src/types';

const startProcessing = async ({
    logs = true,
    imageBuildOptions,
    ...props
}: IStartProcessing) => {
    const imageName = 'quality-subs-generator';
    await buildImage(
        imageName,
        imageBuildOptions.logs,
        props.whisperOptions.modelName,
    );
    const container = await createContainer(props);
    await container.start();
    if (logs) {
        await printLogs(container);
    }
    await container.wait();
    await container.remove();
};

export default startProcessing;
