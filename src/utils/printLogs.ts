import type { Container } from 'dockerode';

const printLogs = async (container: Container): Promise<void> => {
    const logsStream = await container.logs({
        follow: true,
        stdout: true,
        stderr: true,
    });
    logsStream.on('data', async (chunk) => {
        process.stdout.write(chunk.toString('utf8'));
    });
};

export default printLogs;
