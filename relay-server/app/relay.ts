import { RequestBinEvent } from "./RequestBinEvent";
import { EventData } from "./EventData";
import { AxiosResponse, AxiosError } from 'axios';
import { RelayOptions } from "./relayOptions"; 
const chalk = require('chalk');
const https = require('https');

const httpClient = require('axios');

const queryParameters = (eventData: EventData) => {
    if (Object.keys(eventData.queryParameters).length !== 0) {
        const parameters = new URLSearchParams();

        for (const property in eventData.queryParameters) {
            if (eventData.queryParameters.hasOwnProperty(property)) {
                parameters.set(property, eventData.queryParameters[property]);
            }
        }

        return '?' + parameters.toString();
    } else {
        return '';
    }
};

const logOutputStatus = (status: number) => {
    if (status >= 200 && status <= 299) {
        process.stdout.write(chalk.green(' ' + status));
    } else if (status >= 300 && status <= 399) {
        process.stdout.write(chalk.yellow(' ' + status));
    } else if (status >= 400 && status <= 599) {
        process.stdout.write(chalk.red(' ' + status));
    } else {
		process.stdout.write(chalk.gray(' ' + status));
	}
	
    console.log('');
};

export const relay = (options: RelayOptions, event: RequestBinEvent) => {
    const eventData: EventData = event.data;
    const compiledUrl = options.target + queryParameters(eventData);
    const requestBody = Buffer.from(eventData.encodedRequestBody, 'base64').toString('ascii');   


    if (options.verbosePayload) {
        console.log("Payload:", requestBody);
    }

    process.stdout.write(`[${new Date().toISOString()}] [${eventData.httpVerb}] ${compiledUrl}`);

    httpClient({
        url: compiledUrl,
        method: eventData.httpVerb,
        headers: eventData.httpHeaders,
        data: requestBody
    }).then((response: AxiosResponse) => {
        logOutputStatus(response.status);
        if (options.verboseResponse) { 
            console.log("Response:", response.data);
        }
    }).catch((error: AxiosError) => {
        if (error.response) {
            logOutputStatus(error.response.status);
            if (options.verboseResponse || options.verboseResponseError) {
                console.error('Error: ', error.response.data);
            }
        } else {
            console.error('Error: ' + error.message);
        }
    });
};