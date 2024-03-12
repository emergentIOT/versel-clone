/**
 * To build code and publish in s3
 */

//We can execute any type of command from exec
const { exec } = require('child_process');
const path = require('path')
const fs = require('fs')
var mime = require('mime-types')

const { S3Client, PutObjectCommand } = require('@aws-sdk/client-s3')

const S3Client = new S3Client({
    region: 'ap-southeast-2',
    credentials: {
        accessKeyId: '',
        secretAccessKey: ''
    }
});

//Project files to be uploaded in s3 : __outputs/{project_id}
const PROJECT_ID = process.env.PROJECT_ID;

async function init() {
    console.log('Executing script.js');
    const outputDirPath = path.join(__dirname, 'output');

    const p = exec(`cd ${outputDirPath} && npm install && npm run build`);

    //While above command is executing or building, we will capture its logs through below listeners.
    p.stdout.on('data', function(data){
        console.log("Build data", data.toString())
    })

    p.stdout.on('error', function(error){
        console.log("Build error",error.toString())
    })

    p.stdout.on('close', async function(close){
        console.log("Build complete",close.toString())
        //Read dist folder as build is completed
        const distFolderPath = path.join(__dirname, 'output', 'dist');
        //Reading all files in the dis folder. 
        // {recursive:true} will get all the files inside the nester folders. 
        // whenever we have upload on s3 we need to give file path not folder name.
        const distFolderContents = fs.readFileSync(distFolderPath, { recursive: true });

        for (const filePath of distFolderContents) {
            //check for folder, if it is then we ll ignore it
            if(fs.lstatSync(filePath).isDirectory()) continue;

            //Upload to s3
            /**
             * Project files to be uploaded in s3 : __outputs/{project_id}
             */
            console.log('Uploading ...', filePath);
            /**
             * 
             * Dynamically evaulate the content type, as we are not sure about the clients codefile.
             *  - We will use a package for that : https://www.npmjs.com/package/mime-types
             */
            const command = new PutObjectCommand({
                Bucket: 'versal-clone',
                Key: `__output/${PROJECT_ID}/${filePath}`,
                Body: fs.createReadStream(filePath),
                ContentType: mime.lookup(filePath)
            })

            await S3Client.send(command);
            console.log('Uploaded', filePath);
        }

        console.log("Uploading done to s3 bucket .")
    })
}