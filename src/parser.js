import { projectHTML } from "./modules/projector.js";

const SAMPLE =
  "# Test H1\n## Test H2\n### Test H3\n1. test\n2. test\n- hans\n- test";

const projector = projectHTML;

let ul = [];
let ol = [];

const parse = (text) => {
  let parsedLines = [];
  text.split("\n").forEach((l, i) => parsedLines.push(parseLine(l, i)));
  handleList().forEach((list) => parsedLines.splice(list[0], 0, list[1]));
  return parsedLines.join("\n");
};

const parseLine = (line, i) => {
  let splitLine = line.split(" ");
  let mod = splitLine[0];
  switch (true) {
    case mod.charAt(0) === "#":
      return header(splitLine.slice(1).join(" "), mod.length);
    case mod.charAt(0) === "-":
      ul.push([i, listItem(splitLine.slice(1).join(" "), "unordered")]);
      break;
    case /[1-9]+\./.test(mod):
      ol.push([i, listItem(splitLine.slice(1).join(" "), "ordered")]);
      break;
    default:
      return paragraph(line);
  }
};

const handleList = () => {
  let lists = [];
  let cache = [];

  let fInd = ul[0][0];
  let pInd = fInd;
  for (let i = 0; i < ul.length; i++) {
    if (ul[i][0] - pInd > 1) {
      lists.push([fInd, "<ul>" + cache.join("") + "</ul>"]);
      cache = [];
      fInd = ul[i][0];
      pInd = fInd;
    } else {
      pInd = ul[i][0];
    }
    cache.push(ul[i][1]);
  }
  lists.push([fInd, "<ul>" + cache.join("") + "</ul>"]);
  cache = [];

  fInd = ol[0][0];
  pInd = fInd;
  for (let i = 0; i < ol.length; i++) {
    if (ol[i][0] - pInd > 1) {
      lists.push([fInd, "<ol>" + cache.join("") + "</ol>"]);
      cache = [];
      fInd = ol[i][0];
      pInd = fInd;
    } else {
      pInd = ol[i][0];
    }
    cache.push(ol[i][1]);
  }
  lists.push([fInd, "<ol>" + cache.join("") + "</ol>"]);
  return lists;
};

const header = (text, n) => `<h${n}>${text}</h${n}>`;

const listItem = (text, type) => `<li class="${type}">${text}</li>`;

const htmlElement = (text, type) => `<${type}>${text}</${type}>`;

const paragraph = (text) => `<p>${text}</p>`;

const setup = () => {
  let parsed = parse(SAMPLE);
  projector("parsedRoot", parsed);
};

setup();
