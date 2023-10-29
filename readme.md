# **React Native Ozow**

[![npm version](https://badge.fury.io/js/react-native-ozow.svg)](https://badge.fury.io/js/react-native-ozow)
[![npm downloads](https://img.shields.io/npm/dm/react-native-ozow.svg)](https://www.npmjs.com/package/react-native-ozow)
[![npm](https://img.shields.io/npm/dt/react-native-ozow.svg)](https://www.npmjs.com/package/react-native-ozow)
[![npm](https://img.shields.io/npm/l/react-native-ozow.svg)](https://www.npmjs.com/package/react-native-ozow) 
[![GitHub issues](https://img.shields.io/github/issues/Axolem/test-ozow.svg)](https://github.com/Axolem/test-ozow/issues)


React Native Ozow is a React Native library for integrating [Ozow](https://www.ozow.com) payment gateway into your React Native app. It supports both In-App and Link payments. 
 
**Thsi is not an official Ozow library.**

## Table of contents

- [react-native-ozow](#react-native-ozow)
  - [Table of contents](#table-of-contents)
  - [Getting started](#getting-started)
  - [Documentation](#documentation)
    - [Usage](#usage)
  - [Demos](#demos)
  - [In-App Payments](#in-app-payments)
    - [Props](#props)
    - [Data](#data)
  - [Link Payments](#link-payments)
    - [PaymentLink Params](#paymentlink-params)
    - [PaymentLink Methods](#paymentlink-methods)
    - [PaymentLink Data](#paymentlink-data)
  - [Author](#author)
  - [Help wanted!](#help-wanted)
  - [Credits](#credits)
  - [Support](#support)
  - [Donate](#donate)
  - [Follow me](#follow-me)

### Getting started

```bash
npm install react-native-ozow
```

```bash
npx expo install react-native-ozow
```

## Documentation

- For more information, please visit [Ozow API](https://hub.ozow.com/docs/step-post-from-merchant-website)

### Usage

## Demos

 ![In-App Payments](https://github.com/Axolem/test-ozow/blob/master/assets/ezgif.com-video-to-gif.gif) ![Link Payments](https://github.com/Axolem/test-ozow/blob/master/assets/Untitled%20video%20-%20Screen%20Recording%20-%202023_10_27%2C%2008_48_52.gif)

## In-App Payments

```javascript
import { Ozow } from "react-native-ozow";

const MyPaymemt = () =>{
    return(
        <Ozow
            data={{
                SiteCode: "RPI-RPI-300",
                Amount: 1000, // in rands
                TransactionReference: "1234567",
                BankReference: "123456",
                CancelUrl: "https://www.ozow.com",
                ErrorUrl: "https://www.ozow.com",
                SuccessUrl: "https://www.ozow.com",
                NotifyUrl: "https://www.ozow.com",
                }}
            privateKey="f276b028..."
            onErrorMessage={...}
            onPaymentCancel={(data) => {...}}
            onPaymentSuccess={(data) => {...}}
      />
    )
}

export default MyPaymemt;
```

### Props

| Prop             | Type       | Description                                                                                                  | Required |
| ---------------- | ---------- | ------------------------------------------------------------------------------------------------------------ | -------- |
| data             | `object`   | [Data](./readme.md#data) to be sent to [Ozow API](https://hub.ozow.com/docs/step-post-from-merchant-website) | Yes      |
| privateKey       | `string`   | Private key generated from Ozow                                                                              | Yes      |
| onErrorMessage   | `function` | Callback function to handle error message                                                                    | No       |
| onPaymentCancel  | `function` | Callback function to handle payment cancellation                                                             | No       |
| onPaymentSuccess | `function` | Callback function to handle payment success                                                                  | No       |
| onPaymentError   | `function` | Callback function to handle payment error                                                                    | No       |

### Data

| Prop                 | Type               | Description                                        | Required                                                         |
| -------------------- | ------------------ | -------------------------------------------------- | ---------------------------------------------------------------- |
| SiteCode             | `string`           | Site code generated from Ozow                      | [Yes](https://hub.ozow.com/docs/step-post-from-merchant-website) |
| Amount               | `number`           | Amount to be paid in rands                         | Yes                                                              |
| TransactionReference | `string`           | Transaction reference to be sent to Ozow           | Yes                                                              |
| BankReference        | `string`           | Bank reference to be sent to Ozow                  | Yes                                                              |
| CancelUrl            | `string`           | Url to be redirected to when payment is cancelled  | Yes                                                              |
| ErrorUrl             | `string`           | Url to be redirected to when payment has an error  | Yes                                                              |
| SuccessUrl           | `string`           | Url to be redirected to when payment is successful | Yes                                                              |
| NotifyUrl            | `string`           | Url to be redirected to when payment is successful | Yes                                                              |
| Customer             | `string or number` | The customer’s name or identifier.                 | No                                                               |
| IsTest               | `boolean`          | Run on test mode when `true`                       | No (default `false`)                                             |
| style                | `object`           | Style passed to the WebView component              | No                                                               |

## Link Payments

```javascript
import { PaymentLink } from "react-native-ozow";

const myLink = new PaymentLink("9219...[API_KEY]", "f276...[PRIVATE_KEY]");

...
        <Button
          title="Get Payment Link"
          onPress={async () => {
            const results = await myLink.generateLink({
              SiteCode: "IPR...[SITE_CODE]]",
              CountryCode: "ZA",
              CurrencyCode: "ZAR",
              Amount: 10,
              TransactionReference: "1234567",
              BankReference: "123456",
              CancelUrl: "https://www.ozow.com",
              ErrorUrl: "https://www.ozow.com",
              SuccessUrl: "https://www.ozow.com",
              NotifyUrl: "https://www.ozow.com",
              IsTest: false,
              Customer: "John Doe",
            }, false);

            setLink(results.url);

            console.log(myLink.getPaymentLink()); //Get last generated link
          }}
        />
...

```

### PaymentLink Params

| Param       | Type     | Description                     | Required                                                         |
| ----------- | -------- | ------------------------------- | ---------------------------------------------------------------- |
| API_KEY     | `string` | API key generated from Ozow     | [Yes](https://hub.ozow.com/docs/step-post-from-merchant-website) |
| PRIVATE_KEY | `string` | Private key generated from Ozow | Yes                                                              |

### PaymentLink Methods

| Method         | Params                            | Description                                                                                                  | Required |
| -------------- | --------------------------------- | ------------------------------------------------------------------------------------------------------------ | -------- |
| generateLink   | `data: object`, `isTest: boolean` | [Data](./readme.md#data) to be sent to [Ozow API](https://hub.ozow.com/docs/step-post-from-merchant-website) | Yes      |
| getPaymentLink | `none`                            | Get last generated link                                                                                      | No       |

### PaymentLink Data

[See In-App Payments Data](./readme.md#data)

## Author

- [Axole](https://github.com/AxoleMm)

## Help wanted!

- If you want to contribute to this project, please read the [contributing guide](./CONTRIBUTING.md) (comming soon) for now you can fork the project and make your changes.

## Credits

- [Ozow](https://www.ozow.com)
- [React Native](https://reactnative.dev)
- [Expo](https://expo.io)

## Support

- If you need help with this project or you want to report a bug, please open an issue on [GitHub](https://github.com/Axolem/test-ozow/issues)

## Donate

- If you like this project and you want to support me, you can donate to my [PayPal](https://paypal.me/axoleforex) account.

## Follow me

- [LinkedIn](https://www.linkedin.com/in/axolemaranjana/)

```

```
