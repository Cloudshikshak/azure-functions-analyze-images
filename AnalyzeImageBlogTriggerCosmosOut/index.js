const axios = require('axios');

module.exports = async function (context, myBlob) {

    // Subscription key and endpoint from computer vision api free instance portal
    // content type is octet-stream if direct image in body and app/json if URL specified
    // No async function
    context.log("Blob trigger: Received blob information: \n Blob:", context.bindingData.blobTrigger, "\n Blob Size:", myBlob.length, "Bytes");
    
    await axios({
        method: 'post',
        url: 'https://<<COMPUTER_VISION_API_NAME>>.cognitiveservices.azure.com/vision/v2.0/analyze?visualFeatures=Tags&language=en',
        data: myBlob,
        headers: {'Ocp-Apim-Subscription-Key': '<<COMPUTER_VISION_API_KEY>>', 'Content-Type': 'application/octet-stream'}
      })
    .then(function (response) {
        context.log(response.data);
        context.log("Received successful response from Computer Vision API. \nStoring results in CosmosDB...")
        context.bindings.outputDocument = JSON.stringify(response.data);
    })
    .catch(function (error) {
        context.log(error);
    });
    
};