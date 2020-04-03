import { getRandomId, searchGifs } from "./helpers/apiHelper";

import "bootstrap/dist/css/bootstrap.min.css";
import "../public/css/style.css";

const init = async () => {
  const randomid = await getRandomId();
  if (randomid) {
    const gifs = await searchGifs({
      term: "cat",
      offset: 0,
      randomid
    });
    console.log(gifs);
  }
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
