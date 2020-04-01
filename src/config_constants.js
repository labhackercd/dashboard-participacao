module.exports = Object.freeze({

    // SYSTEM SETTING
    PORT_IN_USE :':8000',

    //PORT_IN_USE_SERVER:'', //USE THIS IN CASE OF PRODUCTION SERVER
    IS_LOCAL_TEST_ENV: true,

    // URL'S
    APPLICATION_LOCAL_URL: 'http://localhost:8000',

    //NAME CONSTANTS
    APPLICATION_NAME: 'Participacao',

    //TOKEN GENERATED TO ACCESS GOOGLE ANALYTICS
    GOOGLE_ANALYTICS_TOKEN:'ya29.c.Ko4BxAex-ZdM61lvnT5iLOHBP-MKkL5Or_v6gJIYWihvu_l9Ow9T6Q7T4fLWlRaiSrJvT8zMT2lNTHtpy8fcUe-yAsZ-Vjrr6tUb2Tn-wFrQa1x6xFTgXuTYpX8i_4cCdgu0MOOFcfBIIskruli_j7MWSsdcX9OLzDA80JMtwVYD2y7p-DrBG7SSOCNbKilsNA',
     
    //GOOGLE ANALYTICS URL TO GENERATE AN VALID TOKEN
    GOOGLE_ANALYTICS_URL_TOKEN:'http://322d46aa.ngrok.io',

    //AUDIENCIAS PAGED USER API URL USED IN TABLE REPORTS
    AUDIENCIAS_PAGED_USER_API_URL:'https://edemocracia.camara.leg.br/audiencias/api/user/?page=',

    //AUDIENCIAS ROOM'S API URL USED IN TABLE REPORTS
    AUDIENCIAS_ROOM_API_URL:'https://edemocracia.camara.leg.br/audiencias/api/room/?ordering=-created&is_visible=true',

    //e-DEMOCRACIA PAGED USER API URL USED IN TABLE REPORTS
    EDEMOCRACIA_PAGED_USER_API_URL:'https://edemocracia.camara.leg.br/api/v1/user/?page=',

    //WIKILEGIS PAGED DOCUMENT API URL USED IN TABLE REPORTS
    WIKILEGIS_PAGED_DOCUMENT_API_URL:'http://261572d9.ngrok.io/api/v1/documents/?page=',
 
  });