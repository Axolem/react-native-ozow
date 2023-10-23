import { useState } from "react";
import {
  View,
  Text,
  Button,
} from "react-native";
import { StatusBar } from "expo-status-bar";
import { Ozow } from "react-native-ozow";

export default function App() {
  //const [link, setLink] = useState("");

  //const myLink = new PaymentLink("9219958c9f524a3da49fe518abb0de0b");

  return (
    <>
      <StatusBar style="auto" />

      {/* <View style={{ paddingTop: 100 }}>
        <Button
          title="Pay with Ozow"
          onPress={async () => {
            const results = await myLink.generateLink({
              SiteCode: "IPR-IPR-003",
              CountryCode: "ZA",
              CurrencyCode: "ZAR",
              Amount: 1,
              TransactionReference: "1234567",
              BankReference: "123456",
              CancelUrl: "https://www.ozow.com",
              ErrorUrl: "https://www.ozow.com",
              SuccessUrl: "https://www.ozow.com",
              NotifyUrl: "https://www.ozow.com",
              IsTest: false,
              Customer: "John Doe",
            });
            console.log(results.paymentRequestId, results.success);

            setLink(results.url);
          }}
        />

        <Text>{null === link}</Text>
        <Text>{link}</Text>
      </View> */}


      <Ozow
        data={{
          SiteCode: "IPR-IPR-003",
          CountryCode: "ZA",
          CurrencyCode: "ZAR",
          Amount: 1,
          TransactionReference: "1234567",
          BankReference: "123456",
          CancelUrl: "https://www.ozow.com",
          ErrorUrl: "https://www.ozow.com",
          SuccessUrl: "https://www.ozow.com",
          NotifyUrl: "https://www.ozow.com",
          IsTest: true,
          Customer: "John Doe",
        }}
        privateKey="f276b028558946308361979e4bf88ffa"
        onErrorMessage={(error) => {
          console.log("Payment Error: ",
            // error.description
          );

        }}

        onPaymentCancel={(data) => {
          console.log("Payment Cancelled: ", data.Status);


        }}

        onPaymentSuccess={(data) => {
          console.log("Payment Success: ", data.Status);

        }}


      />
    </>
  );
}
