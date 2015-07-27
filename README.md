# Edison Cam
Attach a webcam to your Intel Edison, then use Edison Cam to take a picture and upload it to Amazon S3 and download it somewhere else, like a web server. This project was made for [LA Hacks 2015](http://lahacks.com/). 

## Dependencies
On your Edison, you need to install:
- Node.js: `sudo apt-get install nodejs`
- AWS SDK for Node.js: `npm install aws-sdk`
- ffmpeg: `sudo apt-get install ffmpeg`

On your web server or computer where you want to download the pictures, you need to install:
- [s3cmd] (http://s3tools.org/s3cmd)

## Setup
Copy the edison-picture folder to your Edison's directory, and then copy download-pictures-from-aws.sh to the folder you want to download the pictures to.

In the edison-picture folder, place your [Amazon S3 config options](http://docs.aws.amazon.com/AWSJavaScriptSDK/guide/node-configuring.html) into take-picture.sh, and place your S3 bucket name into both files. In download-pictures-from-aws.sh, place your S3 bucket name, place the correct path to s3cmd and place the directory that you want your pictures to download to.

## Using it
To take a picture and upload it to S3, navigate to the edison-picture folder and run `./take-picture-to-aws.js`

To download all pictures from your bucket to your directory, run `./download-pictures-from-aws.sh`
