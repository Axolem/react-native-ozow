import sha512 from '@cryptography/sha512'

function generateLinkHash(data: any, privatekey: string): string {
  const inputString = `${data.siteCode}${data.countryCode}${data.currencyCode}${data.amount}${data.transactionReference}${data.bankReference}${data.cancelUrl}${data.errorUrl}${data.successUrl}${data.notifyUrl}${data.isTest}${privatekey}`;
  return sha512(inputString.toLowerCase(), 'hex');
}

export default generateLinkHash