import Dockerode from 'dockerode';
import type { ImageInfo } from 'dockerode';

const docker = new Dockerode();

const doesImageExist = async (imageName: string): Promise<boolean> => {
    const images = await docker.listImages();
    return images.some((image: ImageInfo) =>
        image.RepoTags.includes(imageName),
    );
};

export default doesImageExist;
