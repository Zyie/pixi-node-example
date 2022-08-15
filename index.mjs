import { Application, Assets, Sprite } from '@pixi/node';
import fs from 'fs';
import path from 'path';

// Create a new app but disable Ticker
const app = new Application({ autoStart: false });

// Load a sprite using new Assets API
console.log(path.join(process.cwd()));

let tests = [
    './assets/bunny.png',
    'https://pixijs.io/examples/examples/assets/bunny.png',
    path.join(process.cwd(), 'assets/bunny.png')
]

for (let i = 0; i < tests.length; i++) {
    const test = tests[i];
    const bunnyTexture = await Assets.load(test);
    const bunny = Sprite.from(bunnyTexture);

    // Add the Sprite and manually render it
    app.stage.addChild(bunny);
    bunny.x = 100 * i
}

app.render();

// Extract and save the stage
const data = app.renderer.plugins.extract.base64()
    .replace(/^data:image\/png;base64,/, '');

// Write the output to a file
await fs.promises.writeFile(`./test.png`, data, 'base64');
