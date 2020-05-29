export const defaultMenuType = "menu-default";
export const defaultStartPath = "/app/profile/profile";
export const subHiddenBreakpoint = 1440;
export const menuHiddenBreakpoint = 768;
export const defaultLocale = "en";
export const defaultSearch = "Course";
export const localeOptions = [
  { id: "en", name: "English" },
  { id: "ur", name: "Urdu" },
];
export const fileMaxSize = 4 * 1000 * 1000;
export const LectureMaxSize = 200 * 1000 * 1000;
export const fileTypes = ["docx", "ppt", "pptx", "pdf"];
export const ImagefileTypes = ["png", "jpg", "jpeg", "gif"];
export const searchBy = [{ id: "User" }, { id: "Course" }];
export const defaultDirection = "ltr";
export const searchPath = "/app/layouts/search";
export const URL = "https://moocback.herokuapp.com/";
export const BURL = "https://cryptic-peak-22806.herokuapp.com/";
export const SURL = "https://f421b8f7.ngrok.io/";
export const AURL = "https://a467c5cb.ngrok.io/";
export const VidFile = ["mp4", "ogg"];
export const LectureFiles = ["docx", "ppt", "pptx", "pdf", "mp4", "ogg"];
export const config = {
  headers: {
    "Content-Type": "application/json",
    "Access-Control-Allow-Origin": "http://localhost:5000/",
    "Access-Control-Allow-Headers":
      "Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers,X-Access-Token,XKey,Authorization",
  },
};
