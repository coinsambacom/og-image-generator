# og-image-generator

![example](./example.png)

![ts](https://flat.badgen.net/badge/-/TypeScript?icon=typescript&label&labelColor=blue&color=555555)
![Open Source Love](https://badges.frapsoft.com/os/v1/open-source.svg?v=103)
[![MIT Licence](https://badges.frapsoft.com/os/mit/mit.png?v=103)](https://opensource.org/licenses/mit-license.php)

Generate images dynamically for the open graph protocol (og tags)

# Idea

The idea for this project came from a similar project created by the Vercel team.

The main difference between this project and theirs is that I needed something simpler than the one they developed, and also less expensive since they use a headless browser to take a print of the image while we simply created the image using the canvas library.

# How to use

Simple do `yarn` and `yarn run start:dev`

To generate an image dynamically open your browser and visit the link `localhost:3131/og.jpg?text=hello%20from%20github`