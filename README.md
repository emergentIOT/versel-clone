# versel-clone
Creating a versel clone, from Piyush Garg videos

We are going to build a deployment pipeline, which will take a repo from github and will deploy it on versel along with a custom domain name.

We will use isolated environment: 
using AWS ECS , we will build code in container


Steps to build Part 1
1. Api server also called as build server
    1.1 dockerfile - To setup a docker file with nodejs
    1.2 main.sh - 
    1.3 script.js - To build code and publish in s3 : project files to be uploaded at s3 : __outputs/{project_id}
2. 

Production ready practice:

What makes Scalable code:

Things to learn:
1. Setting up s3
    project files to be uploaded : __outputs/{project_id}
    KEYS NEEDED: 
    const S3Client = new S3Client({
    region: 'ap-southeast-2',
    credentials: {
        accessKeyId: 'ACCESS_KEY_ID',
        secretAccessKey: 'SECRET_ACCESS_KEY'
    }
    });

2. AMAZON ECR: Elastic container registry
    We will use above service to push our dockerfile


SETUP AWS CLI 

SETUP PYTHON


Use the following steps to authenticate and push an image to your repository. For additional registry authentication methods, including the Amazon ECR credential helper, see Registry authentication .
Retrieve an authentication token and authenticate your Docker client to your registry.
Use the AWS CLI:

1. aws ecr get-login-password --region ap-southeast-2 | docker login --username AWS --password-stdin 533267074719.dkr.ecr.ap-southeast-2.amazonaws.com
Note: if you receive an error using the AWS CLI, make sure that you have the latest version of the AWS CLI and Docker installed.
Build your Docker image using the following command. For information on building a Docker file from scratch, see the instructions here . You can skip this step if your image has already been built:

2. docker build -t build-image .
After the build is completed, tag your image so you can push the image to this repository:

3. docker tag build-image:latest 533267074719.dkr.ecr.ap-southeast-2.amazonaws.com/build-image:latest
Run the following command to push this image to your newly created AWS repository:

4. docker push 533267074719.dkr.ecr.ap-southeast-2.amazonaws.com/build-image:latest

3. ECS: Elastic container service, creating a service.


4. Creating a task in ECS, that wold help us to run image in ECS
    We need to run these tasks dynamically, when request came through API server
