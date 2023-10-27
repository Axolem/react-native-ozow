import { ViewStyle } from 'react-native';

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
    OzowPaymentError,
    OzowPaymentResponse,
    OzowTransactionStatus,
    OzowContentType,
    OzowLinkResponse,
    CurrencyCodes,
    CountryCodes,
};
