import { ViewStyle } from 'react-native';
import { WebViewError, WebViewNavigation } from 'react-native-webview/lib/WebViewTypes';
interface OzowPaymentData {
    /** A unique code for the site currently in use. A site code is generated when adding a site in the Ozow merchant admin section.
     * @see https://hub.ozow.com/docs/step-post-from-merchant-website
    */
    SiteCode: string;
    /** The country code of the country where the payment is being made. Only ZA is supported currently */
    CountryCode?: "ZAR" | string | CurrencyCodes;
    /** The currency code of the currency being used for the transaction. Only ZA is supported currently. */
    CurrencyCode?: "ZAR";
    /** The amount to be paid in rands
     * @example - 100.00 // is R100.00
     */
    Amount: number;
    /** A unique reference for the transaction. This reference must be unique for each transaction. */
    TransactionReference: string;
    /** A reference for the transaction that will be shown on the bank statement of the payer. This reference must be unique for each transaction. */
    BankReference: string;
    /** Unique identifier for a user on your application */
    Customer?: string | number | null;
    /** The URL that the payer will be redirected to if they cancel the payment.
     * @example - https://www.yourwebsite.com/cancel
    */
    CancelUrl: string;
    /** The URL that the payer will be redirected to if the payment fails.
     * @example - https://www.yourwebsite.com/error
    */
    ErrorUrl: string;
    /** The URL that the payer will be redirected to if the payment is successful.
     * @example - https://www.yourwebsite.com/success
     */
    SuccessUrl: string;
    /** The URL that the notification result should be posted to. The result will post regardless of the outcome of the transaction.
     * @example - https://www.yourwebsite.com/notify
    */
    NotifyUrl?: string;
    /** A boolean value indicating whether the payment should be treated as a test payment.
     * @default false
     *
     * @description
     * Set this to true if you want to test the payment process.
    */
    IsTest?: boolean;
}
interface OzowProps {
    /**
     * The data required to make a payment request
     * @see https://hub.ozow.com/docs/step-post-from-merchant-website
     *
     * @example
     * ```js
     * const data = {
     *      SiteCode: "testSiteCode",
     *      CountryCode: "ZA",
     *      CurrencyCode: "ZAR",
     *      Amount: 100.00,
     *      TransactionReference: "123456789",
     *      BankReference: "123456789",
     *      Customer: "123456789",
     *      CancelUrl: "https://www.yourwebsite.com/cancel",
     *      ErrorUrl: "https://www.yourwebsite.com/error",
     *      SuccessUrl: "https://www.yourwebsite.com/success",
     *      NotifyUrl: "https://www.yourwebsite.com/notify",
     *      IsTest: true,
     * };
     * ```
     */
    data: OzowPaymentData;
    /**
     * The PRIVATE key provided by Ozow for your account. Make sure it's private key not API key.
     */
    privateKey: string;
    /**
     * Styles to be applied to the webview container
     */
    style?: ViewStyle;
    /**
     * Callback function that is called when there is an error with the payment
     * @param data @type OzowPaymentResponse
     * @returns void
     */
    onPaymentError?: (data: OzowPaymentResponse) => void;
    /**
     * Callback function that is called when the payment is cancelled
     * @param data @type OzowPaymentResponse
     * @returns void
     */
    onPaymentCancel?: (data: OzowPaymentResponse) => void;
    /**
     * Callback function that is called when the payment is successful
     * @param data @type OzowPaymentResponse
     * @returns void
     */
    onPaymentSuccess?: (data: OzowPaymentResponse) => void;
    /**
     * Callback function that is called when is an error that is not related to the payment
     * @param data @type OzowPaymentError
     * @returns void
     */
    onErrorMessage?: (data: WebViewNavigation | WebViewError) => void;
}
interface OzowPaymentError {
    url: string;
    code: number;
    description: string;
}
declare enum OzowTransactionStatus {
    ERROR = "Error",
    SUCCESS = "Complete",
    CANCELLED = "Cancelled",
    ABANDONED = "Abandoned",
    PENDING = "PendingInvestigation"
}
interface OzowPaymentResponse {
    Hash: string;
    Amount: string;
    IsTest: string;
    Status: string;
    SiteCode: string;
    Optional1: string;
    Optional2: string;
    Optional3: string;
    Optional4: string;
    Optional5: string;
    CurrencyCode: string;
    StatusMessage: string;
    TransactionId: string;
    TransactionReference: string;
}
declare enum OzowContentType {
    JSON = "application/json",
    FORM = "application/xml "
}
declare enum CountryCodes {
    ZA = "ZA"
}
declare enum CurrencyCodes {
    ZAR = "ZAR"
}
interface OzowLinkResponse {
    /**
     * Ozow's unique identifier for the payment request. This is the ID that should be used to query the status of the payment request.
     */
    paymentRequestId: string | null;
    /**
     * Generated URL that allows payment for the posted variables used to create the payment request.
     */
    url: string | null;
    /**
     * Error message generated when validating the request
     */
    errorMessage: boolean | null;
}
interface LinkData {
    [key: string]: string | number | boolean;
}
export { OzowProps, OzowPaymentData, OzowPaymentError, OzowPaymentResponse, OzowTransactionStatus, OzowContentType, OzowLinkResponse, CurrencyCodes, CountryCodes, LinkData };
