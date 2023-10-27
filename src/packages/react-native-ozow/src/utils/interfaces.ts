import { ViewStyle } from 'react-native';
import sha512 from '@cryptography/sha512';

const privatekey = "f276b028558946308361979e4bf88ffa";

async function generateRequestHash(data: OzowPaymentData, privateKey: string, link: boolean = false) {
    const siteCode = data.SiteCode;
    const countryCode = data.CountryCode || 'ZA';
    const currencyCode = data.CurrencyCode || 'ZAR';
    const amount = data.Amount;
    const transactionReference = data.TransactionReference;
    const bankReference = data.BankReference;
    const cancelUrl = data.CancelUrl;
    const errorUrl = data.ErrorUrl;
    const successUrl = data.SuccessUrl;
    const notifyUrl = data.NotifyUrl || '';
    const isTest = data.IsTest || false;
    const customer = data.Customer ? JSON.stringify(data.Customer) : '';

    if (link) {
        const inputString = `${siteCode}${countryCode}${currencyCode}${amount}${transactionReference}${bankReference}${cancelUrl}${errorUrl}${successUrl}${notifyUrl}${isTest}${privateKey}`;
        console.warn(inputString);
        return sha512(inputString.toLowerCase(), 'hex');

    }

    const inputString = `${siteCode}${countryCode}${currencyCode}${amount}${transactionReference}${bankReference}${customer}${cancelUrl}${errorUrl}${successUrl}${notifyUrl}${isTest}${privateKey}`;
    return sha512(inputString.toLowerCase(), 'hex');

}

function getSearchParams(urlArr: string[]): OzowPaymentResponse {
    const params = urlArr[1].split('&');
    const obj: OzowPaymentResponse = {} as OzowPaymentResponse;

    params.forEach((param) => {
        const [key, value] = param.split('=');
        obj[key as keyof OzowPaymentResponse] = value;
    });
    return obj;
}

interface OzowPaymentData {
    SiteCode: string;
    CountryCode?: "ZAR" | string | CurrencyCodes;
    CurrencyCode?: "ZAR";
    Amount: number;
    TransactionReference: string;
    BankReference: string;
    Customer?: string | number | null;
    CancelUrl: string;
    ErrorUrl: string;
    SuccessUrl: string;
    NotifyUrl?: string;
    IsTest?: boolean;
}

interface OzowProps {
    data: OzowPaymentData;
    privateKey: string;
    style?: ViewStyle;
    onPaymentError?: (data: OzowPaymentResponse) => void;
    onPaymentCancel?: (data: OzowPaymentResponse) => void;
    onPaymentSuccess?: (data: OzowPaymentResponse) => void;
    onErrorMessage?: (data: OzowPaymentError | OzowPaymentResponse) => void;
}

interface OzowPaymentError {
    url: string;
    code: number;
    description: string;
}

enum OzowTransactionStatus {
    ERROR = "Error",
    SUCCESS = "Complete",
    CANCELLED = "Cancelled",
    ABANDONED = "Abandoned",
    PENDING = "PendingInvestigation",
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

enum OzowContentType {
    JSON = "application/json",
    FORM = "application/xml ",
}

enum CountryCodes {
    ZA = "ZA",
    //BW = "BW",
    //LS = "LS",
    //SZ = "SZ",
}

enum CurrencyCodes {
    ZAR = "ZAR",
}

interface OzowLinkResponse {
    paymentRequestId: string | null;
    url: string | null;
    errorMessage: boolean | null;
}

export {
    OzowProps,
    OzowPaymentData,
    getSearchParams,
    OzowPaymentError,
    OzowPaymentResponse,
    generateRequestHash,
    OzowTransactionStatus,
    OzowContentType,
    OzowLinkResponse,
    CurrencyCodes,
    CountryCodes,
};
