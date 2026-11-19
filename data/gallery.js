import { profile } from "./profile";
// Put images in public/gallery/ and list them here ({ title, src: "/gallery/name.jpg" }).
export const gallery = [{ title: "Portrait", src: profile.hasPortrait ? profile.portrait : "" }];
