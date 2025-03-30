export interface RelayOptions {
    host: string;
    stream: string;
    target: string;
    ignoreSslValidation: boolean;
    verbosePayload: boolean;
    verboseResponse: boolean;
    verboseResponseError: boolean;
}