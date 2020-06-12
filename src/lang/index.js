import { addLocaleData } from "react-intl";
import enLang from "./entries/en-US";
import urLang from "./entries/ur_PK";

const AppLocale = {
  en: enLang,
  ur: urLang
};
addLocaleData(AppLocale.en.data);
addLocaleData(AppLocale.ur.data);
export default AppLocale;
