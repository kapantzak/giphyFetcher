import { getRandomId } from "./helpers/apiHelper";

import "bootstrap/dist/css/bootstrap.min.css";
import "../public/css/style.css";

const init = async () => {
  const randomId = await getRandomId();
  console.log(randomId);
};

// Use lazy loading ------------------------------ //
// function initPostsSection() {
//   import(
//     /* webpackChunkName: "postsHelper" */
//     /* webpackMode: "lazy" */
//     "./helpers/postsHelper"
//   ).then(mod => {
//     mod.injectPosts(document.getElementById("sectionPostsHolder"), wideScreen);
//   });
// }

document.addEventListener("DOMContentLoaded", init);
