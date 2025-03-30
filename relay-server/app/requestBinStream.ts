import { relay } from "./relay";
import { sseDataFilter } from "./sseDataFilter";
import { RelayOptions } from "./relayOptions"; 

const EventSource = require('eventsource');

export const requestBinStream = (options: RelayOptions) => {
    const requestBinUrl: string = [options.host, 'api', options.stream, 'stream'].join('/');
    const eventSource: EventSource = new EventSource(requestBinUrl);

    eventSource.onerror = () => {
        console.error(`Whoops. The request bin '${options.stream}' does not seem to exist on '${options.host}'!`); 
    };
    eventSource.onmessage = (event: MessageEvent) => {
        sseDataFilter(event, (event) => relay(options, event));
    };
};