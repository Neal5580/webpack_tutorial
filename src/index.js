import HellowWorldButton from "./components/hello-world-button/hello-world-button";
import addImage from "./add-image";
import Heading from "./components/heading/heading";

const heading = new Heading();
heading.render();
const helloWorldButton = new HellowWorldButton();
helloWorldButton.render();
//addImage();

if (process.env.NODE_ENV === "production") {
  console.log("Production mode");
} else {
  console.log("Development mode !!");
}
