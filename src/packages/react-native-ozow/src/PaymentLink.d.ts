import { OzowLinkResponse, OzowPaymentData } from "./utils/interfaces";
declare class PaymentLink {
    private paymentLink;
    private ApiKey;
    private privateKey;
    constructor(apiKey: string, privateKey: string);
    getPaymentLink(): string | null;
    generateLink(data: OzowPaymentData, shortUrl?: boolean): Promise<OzowLinkResponse>;
}
export default PaymentLink;
