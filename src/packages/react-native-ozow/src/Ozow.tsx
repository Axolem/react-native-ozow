import { WebView } from 'react-native-webview';
import { useEffect, useRef, useState } from 'react';

import getSearchParams from './utils/params';
import { generateRequestHash } from './utils/hashers';
import { OzowPaymentResponse, OzowProps, OzowTransactionStatus } from './utils/interfaces';

const Ozow = (props: OzowProps) => {

    const { data } = props;
    const apiUrl = 'https://pay.ozow.com/';

    const [retry, setRetry] = useState(0);
    const [ready, setReady] = useState(false);

    const webViewRef = useRef<WebView>(null);

    useEffect(() => {
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

        // Load the WebView with the injected JavaScript
        webViewRef.current?.injectJavaScript(injectedJavaScript);

    }, [ready]);

    return (
        <WebView
            ref={webViewRef}
            scalesPageToFit
            javaScriptEnabled
            domStorageEnabled
            startInLoadingState
            thirdPartyCookiesEnabled
            source={{ uri: apiUrl }}
            mixedContentMode="always"
            style={[props.style, { flex: 1 }]}
            onError={({ nativeEvent }) => props.onErrorMessage?.(nativeEvent)}
            onNavigationStateChange={({ url }) => {
                if (url === "https://pay.ozow.com/request-error" && retry < 3) {
                    setReady(!ready);
                    setRetry(retry + 1);
                }

                const urlArr = url.split('?');

                if (urlArr.length <= 1) {
                    return;
                }

                const ozowResponse: OzowPaymentResponse = getSearchParams(urlArr);

                //Check if the transaction was successful
                if (ozowResponse?.Status === OzowTransactionStatus.SUCCESS
                    && ozowResponse?.Hash
                    && props?.onPaymentSuccess) {
                    props.onPaymentSuccess(ozowResponse);
                } else if (ozowResponse?.Status === OzowTransactionStatus.CANCELLED && props?.onPaymentCancel) {
                    props.onPaymentCancel(ozowResponse);
                } else {
                    if (retry < 3) return;
                    props.onErrorMessage?.(ozowResponse);
                }
            }}
        />
    );
}

export default Ozow;