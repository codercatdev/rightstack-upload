const sanityClient = require('@sanity/client');
const glob = require('glob');
var fs = require('fs');
var path = require('path');
const {default: PQueue} = require('p-queue')


function files() {
  glob(`${__dirname}/images/**/*.svg`, {}, async (err, files) => {
    console.log(`Files: ${files.length}`)

    const queue = new PQueue({
      concurrency: 1
    })

    files.forEach((file) => {
      queue.add(async () => {
        try {
          const imageAsset = await client.assets.upload('image', fs.createReadStream(file), {
            filename: path.basename(file)
          });
          console.log(imageAsset);
        } catch (err) {
          console.log(err);
        }
      });
    });
  });
}

const client = sanityClient({
  projectId: '',
  dataset: '',
  token: ''
})

files();