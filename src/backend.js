import { projectHTML } from "./modules/projector.js";
import { Parse } from "./parser.js";

const parser = Parse;
const projector = projectHTML;

const DEMO_URL =
  "https://raw.githubusercontent.com/Elanduir/Js_Markdown_Parser/main/ReadMe.md";

const data = await (await fetch(DEMO_URL)).text();

projector("parsedRoot", parser(data));
