/// <reference types="react" />
import { OzowProps } from './utils/interfaces';
/**
 * Ozow React Native Component
 *
 * @param props @type OzowProps
 * @returns A React Native WebView component that will load the Ozow payment page
 */
declare const Ozow: (props: OzowProps) => import("react").JSX.Element;
export default Ozow;
