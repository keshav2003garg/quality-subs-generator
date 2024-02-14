import Dockerode from 'dockerode';
import doesImageExist from './doesImageExist';

const docker = new Dockerode();

const buildImage = async (
    imageName: string = 'quality-subs-generator',
    imageBuildLogs: boolean = false,
): Promise<void> => {
    const imageExists = await doesImageExist(`${imageName}:latest`);
    if (!imageExists) {
        const stream = await docker.buildImage(
            {
                context: `${process.cwd()}/docker`,
                src: ['Dockerfile', 'app/', 'script.sh'],
            },
            { t: imageName },
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
