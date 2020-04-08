const GOOGLE_ANALYTICS_URL_TOKEN = "http://localhost:5000";

module.exports = Object.freeze({
  // SYSTEM SETTING
  PORT_IN_USE: ":8000",

  //PORT_IN_USE_SERVER:'', //USE THIS IN CASE OF PRODUCTION SERVER
  IS_LOCAL_TEST_ENV: true,

  // URL'S
  APPLICATION_LOCAL_URL: "http://localhost:8000",

  //NAME CONSTANTS
  APPLICATION_NAME: "Participacao",

  //GENERATE AN VALID TOKEN TO EDEMOCRACIA
  EDEMOCRACIA_GOOGLE_ANALYTICS: GOOGLE_ANALYTICS_URL_TOKEN + "edemocracia",

  //GENERATE AN VALID TOKEN TO ENQUETES
  ENQUETES_GOOGLE_ANALYTICS: GOOGLE_ANALYTICS_URL_TOKEN + "enquetes",

  //AUDIENCIAS PAGED USER API URL USED IN TABLE REPORTS
  AUDIENCIAS_PAGED_USER_API_URL:
    "https://edemocracia.camara.leg.br/audiencias/api/user/?page=",

  //AUDIENCIAS ROOM'S API URL USED IN TABLE REPORTS
  AUDIENCIAS_ROOM_API_URL:
    "https://edemocracia.camara.leg.br/audiencias/api/room/?ordering=-created&is_visible=true",

  //e-DEMOCRACIA PAGED USER API URL USED IN TABLE REPORTS
  EDEMOCRACIA_PAGED_USER_API_URL:
    "https://edemocracia.camara.leg.br/api/v1/user/?page=",

  //WIKILEGIS PAGED DOCUMENT API URL USED IN TABLE REPORTS
  WIKILEGIS_PAGED_DOCUMENT_API_URL:
    "http://261572d9.ngrok.io/api/v1/documents/?page="
});
