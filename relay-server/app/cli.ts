#!/usr/bin/env node

import { requestBinStream } from "./requestBinStream";
import { fatal } from "./fatal";
import { RelayOptions } from "./relayOptions"; 

const chalk = require('chalk');
const args = require('minimist')(process.argv.slice(2));

const defaultHost: string = 'https://bin.graversen.io'

// Global object for options
const relayOptions: RelayOptions = {
    host: args.host || defaultHost,
    stream: args.stream,
    target: args.target,
    ignoreSslValidation: args['ignore-ssl-validation'] || false,
    verbosePayload: args['verbose-payload'] || false,
    verboseResponse: args['verbose-response'] || false,
    verboseResponseError: args['verbose-response-error'] || false
};

console.log(args);

if (args.help) { 
    console.log(`
Usage: requestbin --host=<host> --stream=<stream> --target=<target> [options]

Options:
  --host=<host>                Request Bin host (default: ${defaultHost})
  --stream=<stream>              Request Bin stream ID
  --target=<target>            Target URL to relay requests to
  --ignore-ssl-validation          Disable SSL certificate validation
  --verbose-payload            Log request payload
  --verbose-response           Log full response
  --verbose-response-error     Log only response errors
  --help                       Show this help message
`);
    process.exit(0);
}

if (!relayOptions.host || relayOptions.host === '') {
    fatal('Please specify a valid \'--host\' argument');
}

if (!relayOptions.stream || relayOptions.stream === '') {
    fatal('Please specify a valid \'--stream\' argument');
}

if (!relayOptions.target || relayOptions.target === '') {
    fatal('Please specify a valid \'--target\' argument');
}

// https://github.com/axios/axios/issues/535
process.env.NODE_TLS_REJECT_UNAUTHORIZED = relayOptions.ignoreSslValidation ? '0' : '1';

console.log('============================');
console.log(`Welcome to ${chalk.bold.green('Request Bin Relay')}`)
console.log('============================');
console.log(chalk.cyan('Host: ') + relayOptions.host);
console.log(chalk.cyan('Stream: ') + relayOptions.stream);
console.log(chalk.cyan('Target: ') + relayOptions.target);
if (relayOptions.ignoreSslValidation) {
    console.log(chalk.yellow('SSL Validation: ') + 'Disabled');
}

requestBinStream(relayOptions);