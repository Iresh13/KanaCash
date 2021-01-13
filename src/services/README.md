##

**axios/**\
a service is used to manage API integrations, so it is separated from logic in the component. It is simply a javascript function to manage API integration based on the type of data/configuration and return axios instance.
All the API used over the application. All API are colleted by its nature what it does with the fileName for the readability and it is wrapped in Api.js file which you can called it from anywhere from the app.

## Expample

import * as api from '~/service/api';
api[api-service-name].then((response)=> console.log(response))

**endpoints/**\
it is the javaScript object where all the API URI are stored. it is feed to the API service i.e axios
