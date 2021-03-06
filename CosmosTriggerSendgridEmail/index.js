module.exports = async function (context, documents) {
    if (!!documents && documents.length > 0) {
        context.log('New image analysis result added to CosmosDB with ID = ', documents[0].id);
        
        // Extract tags from the result
        var tags = documents[0].tags;

        // Send top three tags to user email address
        var analysis_result_summary = "The image contains " + tags[0].name + ", " + tags[1].name + ", " + tags[2].name;
        var message = {
            "personalizations": [ { "to": [ { "email": "<receiver email>" } ] } ],
           from: { email: "<sender email>" },
           subject: "Image Analysis Result",
           content: [{
               type: 'text/plain',
               value: analysis_result_summary
           }]
       };
       return message;
    }
}
