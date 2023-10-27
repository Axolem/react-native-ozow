import sha512 from '@cryptography/sha512'
import { OzowPaymentData } from './interfaces';

function generateLinkHash(data: any, privatekey: string): string {
  const inputString = `${data.siteCode}${data.countryCode}${data.currencyCode}${data.amount}${data.transactionReference}${data.bankReference}${data.cancelUrl}${data.errorUrl}${data.successUrl}${data.notifyUrl}${data.isTest}${privatekey}`;
  return sha512(inputString.toLowerCase(), 'hex');
}

function generateRequestHash(data: OzowPaymentData, privatekey: string): string {
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

  const inputString = `${siteCode}${countryCode}${currencyCode}${amount}${transactionReference}${bankReference}${customer}${cancelUrl}${errorUrl}${successUrl}${notifyUrl}${isTest}${privatekey}`;

  return sha512(inputString.toLowerCase(), 'hex');
}

export { generateRequestHash, generateLinkHash }