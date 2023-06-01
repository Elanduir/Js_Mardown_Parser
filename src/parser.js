export { Parse };

import { parseCode } from "./modules/codeUtil.js";
import { parseHyperlinks } from "./modules/hyperlinkUtil.js";
import { parseImages } from "./modules/imageUtil.js";
import {
  extractAllLists,
  parseLists,
  ulReg,
  olReg,
} from "./modules/listUtil.js";
import { projectHTML } from "./modules/projector.js";
import { parseTables } from "./modules/tableUtil.js";

const brReg = /\n\n/gi;
const hrReg = /(^(-){3,}|(=){3,})/gim;

const Parse = (text) => {
  let parsedLines = [];

  text = text.replaceAll(brReg, "\n<br>\n");
  text = text.replaceAll(hrReg, "<hr>");
  console.log(text);
  text = parseCode(text);
  text = parseImages(text);
  text = parseHyperlinks(text);
  text = parseTables(text);

  let allLines = text.split(/\n/);
  let extract = extractAllLists(allLines);
  allLines = extract[0].join(" ").split("<br>");
  let listHtml = parseLists(extract[1]);

  allLines.forEach((line) => {
    let pL = parseLine(line);
    parsedLines.push(pL);
  });

  listHtml.forEach((html) => parsedLines.splice(html[0], 0, html[1]));
  return parsedLines.join("\n");
};

const parseLine = (line) => {
  if (line.length === 0) return "";
  line = line.trimStart();
  let splitLine = line.split(" ");
  let mod = splitLine[0];
  switch (true) {
    case ulReg.test(line) || olReg.test(line):
      break;
    case mod.trim().charAt(0) === "#":
      return header(splitLine.slice(1).join(" "), mod.length);
    case line === "<br>":
      return "";
    default:
      return paragraph(line);
  }
};

const header = (text, n) => `<h${n}>${text}</h${n}>`;

const htmlElement = (text, type, cls) =>
  `<${type}${cls ? `class="${cls}"` : ""}>${text}</${type}>`;

const paragraph = (text) => `<p>${text}</p>`;
