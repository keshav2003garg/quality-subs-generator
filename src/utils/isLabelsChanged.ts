import Dockerode from 'dockerode';

const docker = new Dockerode();

const isLabelChanged = async (
    imageName: string,
    modelName: string,
): Promise<boolean> => {
    const images = docker.getImage(imageName);
    const imageInfo = await images.inspect();
    const labels = imageInfo.Config?.Labels;
    return labels?.modelName !== modelName;
};

export default isLabelChanged;
