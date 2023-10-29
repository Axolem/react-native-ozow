var OzowTransactionStatus;
(function (OzowTransactionStatus) {
    OzowTransactionStatus["ERROR"] = "Error";
    OzowTransactionStatus["SUCCESS"] = "Complete";
    OzowTransactionStatus["CANCELLED"] = "Cancelled";
    OzowTransactionStatus["ABANDONED"] = "Abandoned";
    OzowTransactionStatus["PENDING"] = "PendingInvestigation";
})(OzowTransactionStatus || (OzowTransactionStatus = {}));
var OzowContentType;
(function (OzowContentType) {
    OzowContentType["JSON"] = "application/json";
    OzowContentType["FORM"] = "application/xml ";
})(OzowContentType || (OzowContentType = {}));
var CountryCodes;
(function (CountryCodes) {
    CountryCodes["ZA"] = "ZA";
    //BW = "BW",
    //LS = "LS",
    //SZ = "SZ",
})(CountryCodes || (CountryCodes = {}));
var CurrencyCodes;
(function (CurrencyCodes) {
    CurrencyCodes["ZAR"] = "ZAR";
})(CurrencyCodes || (CurrencyCodes = {}));
export { OzowTransactionStatus, OzowContentType, CurrencyCodes, CountryCodes };
