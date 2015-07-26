var AWS = require('aws-sdk');
var fs = require('fs');
var childProcess = require('child_process');


var imageName = (new Date).getTime() + ".jpeg"; // name our new picture with the time so names are unique
var decodedImage;

childProcess.exec('./take-picture.sh ' + imageName, function(error, stdout, stderr) {
	
	console.log('stdout: ' + stdout);
	console.log('stderr: ' + stderr);
	if (error !== null) {
	  console.log('exec error: ' + error);
	}

	fs.readFile(imageName, function(err, original_data){
		fs.writeFile('image_orig.jpg', original_data, function(err) {});
		var base64Image = original_data.toString('base64');
		decodedImage = new Buffer(base64Image, 'base64');
		fs.writeFile('image_decoded.jpg', decodedImage, function(err) {});
	});

	/*
	Insert AWS config setup here
	*/

	var s3bucket = new AWS.S3({
		params: {
			Bucket: 'myBucket'
		}
	});


	s3bucket.createBucket(function() {
	  	var params = {
	  		Key: imageName, 
	  		Body: decodedImage, 
	  		ContentType: 'image/jpeg'
	  	};

	  	s3bucket.upload(params, function(err, data) {
			if (err) {
			  console.log("Error uploading data: ", err);
			} else {
			  console.log("Successfully uploaded data to myBucket");
			}
	  	});

	});


});
