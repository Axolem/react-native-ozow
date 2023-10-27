import axios from "axios";

import { generateLinkHash } from "./utils/hashers"
import { OzowLinkResponse, OzowPaymentData } from "./utils/interfaces";

/**
 * Class for generating payment links for Ozow.
 * 
 * @param1  API Key
 * @param2  Private Key
 * 
 * @see https://hub.ozow.com/docs/step-post-from-merchant-website#generate-payment-url-using-api
*/
class PaymentLink {
    private paymentLink: string | null;
    private ApiKey: string;
    private privateKey: string;

    constructor(apiKey: string, privateKey: string) {
        if (!apiKey || !privateKey) {
            throw new Error("API Key and Private Key are required");
        }
        this.ApiKey = apiKey;
        this.privateKey = privateKey;
        this.paymentLink = null;
    }

    /**
     * Get the last generated payment link
     * @returns The generated payment link
     * @type string  
     */
    public getPaymentLink() {
        return this.paymentLink;
    }

    /**
     * Generate a payment link
     * @param data @type OzowPaymentData 

     * @param shortUrl @type boolean
     * @description Generate a short url for the payment link
     * @default false
     * -------------------------------
     * @returns @type OzowLinkResponse
     */
    public async generateLink(data: OzowPaymentData, shortUrl: boolean = false): Promise<OzowLinkResponse> {

        const finalData = {
            countryCode: data.CountryCode || "ZA",
            amount: data.Amount,
            transactionReference: data.TransactionReference,
            bankReference: data.BankReference,
            cancelUrl: data.CancelUrl,
            currencyCode: data.CurrencyCode || "ZAR",
            errorUrl: data.ErrorUrl,
            isTest: data.IsTest || false,
            notifyUrl: data.NotifyUrl || "",
            siteCode: data.SiteCode,
            successUrl: data.SuccessUrl,
        };

        const hash = generateLinkHash(finalData, this.privateKey);

        try {
            const response = await axios.post("https://api.ozow.com/postpaymentrequest",
                { ...finalData, hashCheck: hash, GenerateShortUrl: shortUrl },
                {
                    headers: {
                        Accept: "application/json",
                        ApiKey: this.ApiKey,
                        "Content-Type": "application/json",
                    },
                }
            );

            if (response.data.paymentRequestId) {
                this.paymentLink = response.data.url;
            }
            return response.data;

        } catch (error: any) {
            return error;
        }
    }
}

export default PaymentLink;