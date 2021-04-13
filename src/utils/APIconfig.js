const msRest = require('@azure/ms-rest-js');
const Face = require('@azure/cognitiveservices-face');

const key = process.env.REACT_APP_AZURE_KEY1;
const endpoint = 'https://laboratoriarecog.cognitiveservices.azure.com/';

const credentials = new msRest.ApiKeyCredentials({
  inHeader: {
    'Ocp-Apim-Subscription-Key': key,
  },
});
const client = new Face.FaceClient(credentials, endpoint);

export default client;
