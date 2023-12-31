# Stage 1: Builder
FROM node:18.0.0-alpine AS builder

ARG SSH_KEY

WORKDIR /usr/src/app

# Install openssh
RUN apk add --no-cache openssh
# Add github to known hosts
RUN mkdir -p -m 0600 ~/.ssh && ssh-keyscan github.com >> ~/.ssh/known_hosts

# Install node-canvas dependencies
RUN apk add --update --no-cache \
    make \
    g++ \
    jpeg-dev \
    cairo-dev \
    giflib-dev \
    pango-dev \
    libtool \
    autoconf \
    automake

COPY . .

# yarn and yarn build will install, build and remove dev dependencies
RUN ssh-agent sh -c 'echo $SSH_KEY | base64 -d | ssh-add - ; yarn && yarn build'

# Stage 2: Production Image
FROM node:18.0.0-alpine

RUN apk add --no-cache dumb-init

# Copy only necessary files from the builder stage
COPY --from=builder /usr/src/app /usr/src/app

WORKDIR /usr/src/app

ENTRYPOINT ["/usr/bin/dumb-init", "--"]
CMD ["yarn", "start"]