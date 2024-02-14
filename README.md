# Quality Subs Generator

Effortlessly generate high-quality subtitles for your videos using the "quality-subs-generator" npm package. This powerful tool combines the capabilities of ffmpeg and the advanced Whisper model, providing a seamless solution for converting videos into various quality formats with precise subtitles.

## Installation

Install the package easily using npm or Yarn:

### Using npm

```bash
npm install quality-subs-generator
```

### Using Yarn

```bash
yarn add quality-subs-generator
```

## Usage
This package utilizes Docker for all processing, ensuring a hassle-free experience for users. You only need Docker; no need to deal with the tedious installation of components like the Whisper model, ffmpeg binaries, etc. The isolated environment also reduces the risk of system crashes.

During the initial run, the package will build a Docker image. This process includes heavy installations, such as ffmpeg, the OpenAI-Whisper model, transcription models, Node.js runtime, and more. Please note that it may take some time (approximately ~30 minutes) depending on internet speed and system resources, resulting in an image size of around ~10GB. Subsequent video processing will not rebuild the image; they will directly run a container.

## Dependencies

-   [dockerode](https://www.npmjs.com/package/dockerode): ^4.0.2
-   [random-word-slugs](https://www.npmjs.com/package/random-word-slugs): ^0.1.7

## Contributing

We welcome contributions! Feel free to contribute by [raising issues](https://github.com/keshav2003garg/quality-subs-generator/issues) or submitting pull requests. Please follow our [contribution guidelines](CONTRIBUTING.md).

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Contact

For any inquiries or feedback, please reach out to [Keshav Garg](https://github.com/keshav2003garg). Your input is valuable!