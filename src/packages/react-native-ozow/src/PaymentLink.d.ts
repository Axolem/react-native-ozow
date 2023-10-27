import { OzowLinkResponse, OzowPaymentData } from "./utils/interfaces";
/**
 * Class for generating payment links for Ozow.
 *
 * @param1  API Key
 * @param2  Private Key
 *
 * @see https://hub.ozow.com/docs/step-post-from-merchant-website#generate-payment-url-using-api
*/
declare class PaymentLink {
    private paymentLink;
    private ApiKey;
    private privateKey;
    constructor(apiKey: string, privateKey: string);
    /**
     * Get the last generated payment link
     * @returns The generated payment link
     * @type string
     */
    getPaymentLink(): string | null;
    /**
     * Generate a payment link
     * @param data @type OzowPaymentData

     * @param shortUrl @type boolean
     * @description Generate a short url for the payment link
     * @default false
     * -------------------------------
     * @returns @type OzowLinkResponse
     */
    generateLink(data: OzowPaymentData, shortUrl?: boolean): Promise<OzowLinkResponse>;
}
export default PaymentLink;
