import graphql from "./graphql.png";
function addImage() {
  const img = document.createElement("img");
  img.alt = "graphql";
  img.width = 300;
  img.src = graphql;

  const body = document.querySelector("body");
  body.appendChild(img);
}
export default addImage;
