import Dockerode from 'dockerode';
import doesImageExist from './doesImageExist';
import isLabelChanged from './isLabelsChanged';
import getWhisperURL from './getWhisperURL';

import type { SupportedModels } from '../types/whisper';

const docker = new Dockerode();

const buildImage = async (
    imageName: string = 'quality-subs-generator',
    imageBuildLogs: boolean = false,
    modelName: SupportedModels = 'tiny',
): Promise<void> => {
    const imageExists = await doesImageExist(`${imageName}:latest`);
    let labelsChanged;
    if (imageExists) {
        labelsChanged = await isLabelChanged(`${imageName}:latest`, modelName);
    }
    if (!imageExists || labelsChanged) {
        const whisperURL = getWhisperURL(modelName);
        const stream = await docker.buildImage(
            {
                context: `${process.cwd()}/docker`,
                src: ['Dockerfile', 'app/', 'script.sh'],
            },
            {
                t: imageName,
                buildargs: {
                    WHISPER_BASE_URL: whisperURL,
                    MODEL_NAME: modelName,
                },
                labels: { modelName },
            },
        );
        await new Promise((resolve, reject) => {
            docker.modem.followProgress(
                stream,
                (err, res) => (err ? reject(err) : resolve(res)),
                (event) => {
                    if (imageBuildLogs) {
                        console.log(event);
                    }
                },
            );
        });
    }
};

export default buildImage;
