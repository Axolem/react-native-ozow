import { ViewStyle } from 'react-native';
declare function generateRequestHash(data: OzowPaymentData, privateKey: string, link?: boolean): Promise<string>;
declare function getSearchParams(urlArr: string[]): OzowPaymentResponse;
interface OzowPaymentData {
    SiteCode: string;
    CountryCode?: string | CurrencyCodes;
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
    paymentRequestId: string;
    url: string;
    errorMessage: boolean;
    success: boolean;
}
export { OzowProps, OzowPaymentData, getSearchParams, OzowPaymentError, OzowPaymentResponse, generateRequestHash, OzowTransactionStatus, OzowContentType, OzowLinkResponse, CurrencyCodes, CountryCodes };
