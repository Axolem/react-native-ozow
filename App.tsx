import { useState } from "react";
import {
  View,
  Text,
  Button,
} from "react-native";
import { StatusBar } from "expo-status-bar";

 import { Ozow, PaymentLink } from "react-native-ozow";

export default function App() {
  const [link, setLink] = useState("");

  const myLink = new PaymentLink("92...", "f2...");

  return (
    <>
      <StatusBar style="auto" />

      {false ? <View style={{ paddingTop: 100 }}>
        <Button
          title="Get Payment Link"
          onPress={async () => {
            const results = await myLink.generateLink({
              SiteCode: "IPR-IPR-003",
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
            });

            console.log("Visit: ", results);

            setLink(results.url);

            console.log(myLink.getPaymentLink());

          }}
        />

        <Text>{link}</Text>
      </View>

        :
        <Ozow
          data={{
            SiteCode: "IPR...",
            CountryCode: "ZA",
            CurrencyCode: "ZAR",
            Amount: 1,
            TransactionReference: "12345671",
            BankReference: "123456",
            CancelUrl: "https://www.ozow.com",
            ErrorUrl: "https://www.ozow.com",
            SuccessUrl: "https://www.ozow.com",
            NotifyUrl: "https://www.ozow.com",
            IsTest: false,
            Customer: "John Doe",
          }}
          privateKey="f27..."
          onErrorMessage={(error) => {
            console.log("Payment Error: ",// error.description
            );
          }}

          onPaymentCancel={(data) => {
            console.log("Payment Cancelled: ", data.Status);
          }}

          onPaymentSuccess={(data) => {
            console.log("Payment Success: ", data.Status);
          }}
          style={{ flex: 1 }}
        />}
    </>
  );
}
