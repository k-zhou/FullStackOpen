FROM denoland/deno:latest

WORKDIR /app

COPY deno.json package.json /app/

RUN DENO_FUTURE=1 deno install

COPY . .

CMD [ "run", "--allow-net", "--allow-env", "--watch", "app-server.ts" ]