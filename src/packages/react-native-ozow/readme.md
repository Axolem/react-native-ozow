# react-native-ozow

### Getting started

```bash
npm install react-native-ozow
```

```bash
npx expo install react-native-ozow
```
## Documentation

- [Usage](./readme.md#usage)
- [Props](./readme.md#props)
- [Data](./readme.md#data)

- For more information, please visit [Ozow API](https://hub.ozow.com/docs/step-post-from-merchant-website)

### Usage

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

| Prop                 | Type               | Description                                        | Required             |
| -------------------- | ------------------ | -------------------------------------------------- | -------------------- |
| SiteCode             | `string`           | Site code generated from Ozow                      | Yes                  |
| Amount               | `number`           | Amount to be paid in rands                         | Yes                  |
| TransactionReference | `string`           | Transaction reference to be sent to Ozow           | Yes                  |
| BankReference        | `string`           | Bank reference to be sent to Ozow                  | Yes                  |
| CancelUrl            | `string`           | Url to be redirected to when payment is cancelled  | Yes                  |
| ErrorUrl             | `string`           | Url to be redirected to when payment has an error  | Yes                  |
| SuccessUrl           | `string`           | Url to be redirected to when payment is successful | Yes                  |
| NotifyUrl            | `string`           | Url to be redirected to when payment is successful | Yes                  |
| Customer             | `string or number` | The customer’s name or identifier.                 | No                   |
| IsTest               | `boolean`          | Run on test mode when `true`                       | No (default `false`) |

## License

MIT

## Author

- [Axole](https://github.com/AxoleMm)

## Contributors

- If you want to contribute to this project, please read the [contributing guide](./CONTRIBUTING.md) (comming soon) for now you can fork the project and make your changes.

## Credits

- [Ozow](https://www.ozow.com)
- [React Native](https://reactnative.dev)
- [Expo](https://expo.io)

## Support

- If you need help with this project or you want to report a bug, please open an issue on [GitHub](https://github.com/Axolem/test-ozow/issues)

## Donate

- If you like this project and you want to support me, you can donate to my [PayPal](https://paypal.me/axoleforex)  account.

## Follow me

- [LinkedIn](https://www.linkedin.com/in/axolemaranjana/)

