import { LinkData, OzowPaymentData } from './interfaces';
declare function generateLinkHash(data: LinkData, privatekey: string): string;
declare function generateRequestHash(data: OzowPaymentData, privatekey: string): string;
export { generateRequestHash, generateLinkHash };
