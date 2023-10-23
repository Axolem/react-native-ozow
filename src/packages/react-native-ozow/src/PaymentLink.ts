import { OzowContentType, OzowLinkResponse, OzowPaymentData, generateRequestHash } from "./utils";

class PaymentLink {
    private paymentLink: string | null;
    private ApiKey: string | null = null;
    private contentType: OzowContentType = OzowContentType.JSON;
    constructor(apiKey: string) {
        this.ApiKey = apiKey;
        this.paymentLink = null;

    }

    public setContentType(contentType: OzowContentType) {
        this.contentType = contentType;
    }

    public getPaymentLink() {
        return this.paymentLink;
    }

    public async generateLink(data: OzowPaymentData): Promise<OzowLinkResponse | OzowLinkResponseError> {

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

        const hash = await generateRequestHash(
            {
                CountryCode: data.CountryCode || "ZA",
                Amount: data.Amount,
                TransactionReference: data.TransactionReference,
                BankReference: data.BankReference,
                CancelUrl: data.CancelUrl,
                CurrencyCode: data.CurrencyCode || "ZAR",
                ErrorUrl: data.ErrorUrl,
                IsTest: data.IsTest || false,
                NotifyUrl: data.NotifyUrl || "",
                SiteCode: data.SiteCode,
                SuccessUrl: data.SuccessUrl
            },
            this.ApiKey,
            true
        )

        const options = {
            method: 'POST',
            headers: {
                'Accept': this.contentType,
                'ApiKey': this.ApiKey,
                'Content-Type': this.contentType,
            },
            body: JSON.stringify(
                {
                    ...finalData,
                    hashCheck: hash,
                }
            )
        };

        console.log(options.body);

        try {
            const response = await fetch('https://api.ozow.com/postpaymentrequest', options);
            const res = await response.json()

            console.log(res);

            if (!response.ok) {
                throw new OzowLinkResponseError(res.errorMessage, false, response.statusText, response.status, res.paymentRequestId);
            }
            return { ...res, success: res.paymentRequestId ? true : false } as OzowLinkResponse;
        } catch (error) {
            return error as OzowLinkResponseError;
        }
    }
}

class OzowLinkResponseError extends Error {
    public status: number;
    public success: boolean;
    public statusText: string;
    public paymentRequestId: string;

    constructor(
        message: string,
        success: boolean,
        statusText: string,
        status: number,
        paymentRequestId: string
    ) {
        super(message);
        this.name = "OzowLinkResponseError";
        this.success = success;
        this.statusText = statusText;
        this.status = status;
        this.paymentRequestId = paymentRequestId;
    }
}


export default PaymentLink;