import * as Crypto from 'expo-crypto';
async function generateRequestHash(data, privateKey, link = false) {
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
        const inputString = `${countryCode}${amount}${transactionReference}${bankReference}${cancelUrl}${currencyCode}${errorUrl}${isTest}${siteCode}${notifyUrl}${successUrl}`;
        return await generateRequestHashCheck(inputString);
    }
    const inputString = `${siteCode}${countryCode}${currencyCode}${amount}${transactionReference}${bankReference}${customer}${cancelUrl}${errorUrl}${successUrl}${notifyUrl}${isTest}${privateKey}`;
    return await generateRequestHashCheck(inputString);
}
async function generateRequestHashCheck(inputString) {
    return await getSha512Hash(inputString.toLowerCase());
}
async function getSha512Hash(stringToHash) {
    return await Crypto.digestStringAsync(Crypto.CryptoDigestAlgorithm.SHA512, stringToHash);
}
function getSearchParams(urlArr) {
    const params = urlArr[1].split('&');
    const obj = {};
    params.forEach((param) => {
        const [key, value] = param.split('=');
        obj[key] = value;
    });
    return obj;
}
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
export { getSearchParams, generateRequestHash, OzowTransactionStatus, OzowContentType, CurrencyCodes, CountryCodes };
