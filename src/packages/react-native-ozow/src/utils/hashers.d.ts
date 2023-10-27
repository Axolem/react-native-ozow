import { OzowPaymentData } from './interfaces';
declare function generateLinkHash(data: any, privatekey: string): string;
declare function generateRequestHash(data: OzowPaymentData, privatekey: string): string;
export { generateRequestHash, generateLinkHash };
