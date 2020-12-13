const TextToSpeechV1 = require('ibm-watson/text-to-speech/v1');
const { IamAuthenticator } = require('ibm-watson/auth');


const textToSpeech = new TextToSpeechV1({
  authenticator: new IamAuthenticator({
    apikey: '{apikey}',
  }),
  serviceUrl: '{url}',
});