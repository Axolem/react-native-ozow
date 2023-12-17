import { useState } from "react";
import {
  View,
  Text,
  Button,
} from "react-native";
import { StatusBar } from "expo-status-bar";
import { Ozow, PaymentLink } from "./src/packages/react-native-ozow";
//import { Ozow, PaymentLink } from "react-native-ozow";

export default function App() {
  const [link, setLink] = useState("");

  const myLink = new PaymentLink("9219958c9f524a3da49fe518abb0de0b", "f276b028558946308361979e4bf88ffa");

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

        :<>
        <Text>Axole</Text>
        <Ozow
          data={{
            SiteCode: "IPR-IPR-003",
            CountryCode: "ZA",
            CurrencyCode: "ZAR",
            Amount: 100,
            TransactionReference: "12345671",
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
            console.log("Payment Error: ",error
            );
          }}

          onPaymentCancel={(data) => {
            console.log("Payment Cancelled: ", data);
          }}

          onPaymentSuccess={(data) => {
            console.log("Payment Success: ", data);
          }}
          style={{ flex: 1 , paddingTop: 100}}
        />
        </>
        }
    </>
  );
}
