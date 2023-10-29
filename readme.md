# **React Native Ozow**

[![npm](https://img.shields.io/npm/v/react-native-ozow.svg)](https://www.npmjs.com/package/react-native-ozow)
[![npm](https://img.shields.io/npm/dm/react-native-ozow.svg)](https://www.npmjs.com/package/react-native-ozow)
[![GitHub issues](https://img.shields.io/github/issues/axolem/react-native-ozow.svg)](https://github.com/Axolem/react-native-ozow/issues)
[![GitHub stars](https://img.shields.io/github/stars/axolem/react-native-ozow.svg)]
[![GitHub license](https://img.shields.io/github/license/axolem/react-native-ozow.svg)]
[![Twitter](https://img.shields.io/twitter/url/https/github.com/axolem/react-native-ozow.svg?style=social)](https://twitter.com/intent/tweet?text=Checkout%20React%20Native%20Payfast%20Plugin!%20https://github.com/axolem/react-native-ozow%20via%20@axole_ma)
[![GitHub contributors](https://img.shields.io/github/contributors/axolem/react-native-ozow.svg)]
[![GitHub last commit](https://img.shields.io/github/last-commit/axolem/react-native-ozow.svg)]
[![GitHub pull requests](https://img.shields.io/github/issues-pr/axolem/react-native-ozow.svg)]
[![GitHub pull requests](https://img.shields.io/github/issues-pr-closed/axolem/react-native-ozow.svg)]
[![GitHub forks](https://img.shields.io/github/forks/axolem/react-native-ozow.svg?style=social&label=Fork)]
[![GitHub stars](https://img.shields.io/github/stars/axolem/react-native-ozow.svg?style=social&label=Stars)]
[![GitHub watchers](https://img.shields.io/github/watchers/axolem/react-native-ozow.svg?style=social&label=Watch)]

React Native Ozow is a React Native library for integrating [Ozow](https://ozow.com/) payment gateway into your React Native app. It supports both In-App and Link payments.

#### **This is not an official Ozow library.**

## Check out my other libraries

- [React Native Payfast](https://www.npmjs.com/package/react-native-payfast-plugin)

## Table of contents

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

Expo?

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
                CancelUrl: "https://ozow.com/",
                ErrorUrl: "https://ozow.com/",
                SuccessUrl: "https://ozow.com/",
                NotifyUrl: "https://ozow.com/",
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
              CancelUrl: "https://ozow.com/",
              ErrorUrl: "https://ozow.com/",
              SuccessUrl: "https://ozow.com/",
              NotifyUrl: "https://ozow.com/",
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

- Axole Maranjana [![Twitter Follow](https://img.shields.io/twitter/follow/iamraphson.svg?style=social&label=Follow)](https://twitter.com/axole_ma)
[![GitHub followers](https://img.shields.io/github/followers/axolem.svg?style=social&label=Follow)](https://github.com/AxoleM)
[![Instagram](https://img.shields.io/badge/Instagram-E4405F?style=social&logo=instagram)](https://www.instagram.com/axole_mar/)
[![LinkedIn](https://img.shields.io/badge/LinkedIn-0077B5?style=social&logo=linkedin)](https://www.linkedin.com/in/axolemaranjana/)

## Help wanted!

- If you want to contribute to this project, please read the [contributing guide](./CONTRIBUTING.md).

## Credits

- [Ozow](https://ozow.com/)
- [React Native](https://reactnative.dev)
- [Expo](https://expo.io)

## Support

- If you need help with this project or you want to report a bug, please open an issue on [GitHub](https://github.com/Axolem/test-ozow/issues)

## Donate

<a href="https://www.buymeacoffee.com/axolem" target="_blank"><img src="https://cdn.buymeacoffee.com/buttons/v2/default-yellow.png" alt="Buy Me A Coffee" width="150" ></a>
