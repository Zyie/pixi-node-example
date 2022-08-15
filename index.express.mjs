import express from 'express'
import {fileURLToPath} from 'url';
import path from 'path';
import { Application, Assets, Sprite } from '@pixi/node';
import fs from 'fs';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express()
const port = 3000

app.use(express.static(__dirname))

app.get('/', async (_req, res) => {
    // Create a new app but disable Ticker
    const app = new Application({ autoStart: false });

    await Assets.init({
        basePath: 'http://localhost:3000/',
    })

    // const bunnyTexture = await Assets.load('https://pixijs.io/examples/examples/assets/bunny.png');
    const bunnyTexture = await Assets.load('./assets/bunny.png');
    const bunny = Sprite.from(bunnyTexture);

    // Add the Sprite and manually render it
    app.stage.addChild(bunny);
    app.render();

    // Extract and save the stage
    const data = app.renderer.plugins.extract.base64()
        .replace(/^data:image\/png;base64,/, '');

    // Write the output to a file
    await fs.promises.writeFile(`./test.png`, data, 'base64');

    res.send('image saved!')
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})