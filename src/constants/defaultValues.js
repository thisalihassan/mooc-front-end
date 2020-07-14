export const defaultMenuType = "menu-default";
export const defaultStartPath = "/app/profile/profile";
export const subHiddenBreakpoint = 1440;
export const menuHiddenBreakpoint = 768;
export const defaultLocale = "en";
export const defaultSearch = "Course";
export const fileMaxSize = 4 * 1000 * 1000;
export const LectureMaxSize = 100 * 1000 * 1000;
// export const fileTypes = ["docx", "ppt", "pptx", "pdf"]; for local
export const fileTypes = ["docx", "ppt", "pptx"]; //for cloudinary
export const VidFile = ["mp4", "ogg"];
// export const LectureFiles = ["docx", "ppt", "pptx", "pdf", "mp4", "ogg"];
export const LectureFiles = ["docx", "ppt", "pptx", "mp4", "ogg"]; //for cloudinry
export const ImagefileTypes = ["png", "jpg", "jpeg"];
export const searchBy = [{ id: "User" }, { id: "Course" }];
export const defaultDirection = "ltr";
export const searchPath = "/app/layouts/search";
export const URL = "https://moocback.herokuapp.com/";
export const BURL = "https://moocvideobroadcasting.herokuapp.com/";
export const SURL = "https://moocsreensharing.herokuapp.com/";
export const AURL = "https://moocaudio.herokuapp.com/";

export const config = {
  headers: {
    "Content-Type": "application/json",
    "Access-Control-Allow-Origin": "https://moocback.herokuapp.com/",
    "Access-Control-Allow-Headers":
      "Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers,X-Access-Token,XKey,Authorization",
  },
};
