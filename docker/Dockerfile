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
RUN curl -L https://openaipublic.azureedge.net/main/whisper/models/d3dd57d32accea0b295c96e26691aa14d8822fac7d9d27d5dc00b4ca2826dd03/tiny.en.pt -o /root/.cache/whisper/tiny.en.pt
COPY script.sh /app/script.sh
RUN chmod +x /app/script.sh
COPY --from=builder /build/package.json /app/src/
COPY --from=builder /build/yarn.lock /app/src/
COPY --from=builder /build/node_modules/ /app/src/node_modules/
COPY --from=builder /build/dist/ /app/src/dist/
ENTRYPOINT ["bash", "script.sh"]