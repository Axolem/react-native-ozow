import { WebView } from 'react-native-webview';
import getSearchParams from './utils/params';
import { generateRequestHash } from './utils/hashers';
import { OzowTransactionStatus } from './utils/interfaces';
/**
 * Ozow React Native Component
 *
 * @param props @type OzowProps
 * @returns A React Native WebView component that will load the Ozow payment page
 */
const Ozow = (props) => {
    const { data } = props;
    const apiUrl = 'https://pay.ozow.com/';
    const HashCheck = generateRequestHash(data, props.privateKey);
    //ensure order of data is correct
    const orderedData = new Map();
    orderedData.set('SiteCode', data.SiteCode);
    orderedData.set('CountryCode', data.CountryCode || 'ZA');
    orderedData.set('CurrencyCode', data.CurrencyCode || 'ZAR');
    orderedData.set('Amount', data.Amount);
    orderedData.set('TransactionReference', data.TransactionReference);
    orderedData.set('BankReference', data.BankReference);
    orderedData.set('Customer', data.Customer ? JSON.stringify(data.Customer) : '');
    orderedData.set('CancelUrl', data.CancelUrl);
    orderedData.set('ErrorUrl', data.ErrorUrl);
    orderedData.set('SuccessUrl', data.SuccessUrl);
    orderedData.set('NotifyUrl', data.NotifyUrl || '');
    orderedData.set('IsTest', data.IsTest || false);
    orderedData.set('HashCheck', HashCheck);
    const fullData = JSON.stringify(Object.fromEntries(orderedData));
    // Inject JavaScript code to perform the POST request on initial page load
    const injectedJavaScript = `
        const form = document.createElement('form');
        form.method = 'POST';
        form.action = '${apiUrl}';
        const fullData = ${fullData};
        for (const key in fullData) {
            if (fullData.hasOwnProperty(key)) {
                const input = document.createElement('input');
                input.type = 'hidden';
                input.name = key;
                input.value = fullData[key];
                form.appendChild(input);
            }
        }
        document.body.appendChild(form);
        form.submit();
    `;
    return (<WebView scalesPageToFit javaScriptEnabled domStorageEnabled startInLoadingState thirdPartyCookiesEnabled source={{ html: `<html><body><script>${injectedJavaScript}</script></body></html>` }} mixedContentMode="always" style={[props.style, { flex: 1 }]} onError={({ nativeEvent }) => {
            props.onErrorMessage?.(nativeEvent);
        }} onNavigationStateChange={(error) => {
            const { url } = error;
            const urlArr = url.split('?');
            if (urlArr.length <= 1) {
                return;
            }
            const ozowResponse = getSearchParams(urlArr);
            //Check if the transaction was successful
            if (ozowResponse?.Status === OzowTransactionStatus.SUCCESS
                && ozowResponse?.Hash
                && props?.onPaymentSuccess) {
                props.onPaymentSuccess(ozowResponse);
            }
            else if (ozowResponse?.Status === OzowTransactionStatus.CANCELLED && props?.onPaymentCancel) {
                props.onPaymentCancel(ozowResponse);
            }
            else {
                props.onErrorMessage?.(error);
            }
        }}/>);
};
export default Ozow;
