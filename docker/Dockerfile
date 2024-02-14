FROM node:18 as builder
WORKDIR /build
COPY app/ /build/
RUN yarn install
RUN yarn global add typescript
RUN yarn build

FROM node:18 as runner
WORKDIR /app
RUN apt update
RUN apt install ffmpeg -y
COPY script.sh /app/script.sh
RUN chmod +x /app/script.sh
COPY --from=builder /build/package.json /app/src/
COPY --from=builder /build/yarn.lock /app/src/
COPY --from=builder /build/node_modules/ /app/src/node_modules/
COPY --from=builder /build/dist/ /app/src/dist/
ENTRYPOINT ["bash", "script.sh"]