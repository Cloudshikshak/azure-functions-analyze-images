const axios = require('axios');

module.exports = function (context, myBlob) {

    // Subscription key and endpoint from computer vision api free instance portal
    // content type is octet-stream if direct image in body and app/json if URL specified
    // No async function
    context.log("Blob trigger: Received blob information: \n Blob:", context.bindingData.blobTrigger, "\n Blob Size:", myBlob.length, "Bytes");
    
    axios({
        method: 'post',
        url: 'https://afccomputervision.cognitiveservices.azure.com/vision/v2.0/analyze?visualFeatures=Tags&language=en',
        data: myBlob,
        headers: {'Ocp-Apim-Subscription-Key': 'ea6cb11c8c6b465294a7c87268533822', 'Content-Type': 'application/octet-stream'}
      })
    .then(function (response) {
        context.log(response.data);
        context.log("Received successful response from Computer Vision API. \nStoring results in CosmosDB...")
        context.bindings.outputDocument = JSON.stringify(response.data);
        context.done();
    })
    .catch(function (error) {
        context.log(error);
        context.done();
    });
    
};