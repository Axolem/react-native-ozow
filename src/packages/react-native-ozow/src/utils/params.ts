import { OzowPaymentResponse } from "./interfaces";

function getSearchParams(urlArr: string[]): OzowPaymentResponse {
    const params = urlArr[1].split('&');
    const obj: OzowPaymentResponse = {} as OzowPaymentResponse;

    params.forEach((param) => {
        const [key, value] = param.split('=');
        obj[key as keyof OzowPaymentResponse] = value;
    });
    return obj;
}

export default getSearchParams