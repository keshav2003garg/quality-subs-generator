FROM node:18 as builder
WORKDIR /build
COPY app/ /build/
RUN yarn install
RUN yarn global add typescript
RUN yarn build

FROM ubuntu:latest as runner
WORKDIR /app
RUN apt update
RUN apt install -y ffmpeg python3 python3-pip nodejs
RUN pip install -U openai-whisper
RUN pip install setuptools-rust
RUN apt install -y curl
RUN mkdir -p /root/.cache/whisper
ARG WHISPER_BASE_URL
ARG MODEL_NAME
RUN curl -L ${WHISPER_BASE_URL}/${MODEL_NAME}.pt -o /root/.cache/whisper/${MODEL_NAME}.pt
COPY script.sh /app/script.sh
RUN chmod +x /app/script.sh
COPY --from=builder /build/package.json /app/src/
COPY --from=builder /build/yarn.lock /app/src/
COPY --from=builder /build/node_modules/ /app/src/node_modules/
COPY --from=builder /build/dist/ /app/src/dist/
ENTRYPOINT ["bash", "script.sh"]