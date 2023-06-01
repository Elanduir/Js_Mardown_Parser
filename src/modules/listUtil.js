//@ts-check
export { extractAllLists, parseLists, ulReg, olReg };

const ulReg = /^((    )*- ).*/;
const olReg = /^((    )*[0-9]*\. ).*/;

/**
 * @function extractAllLists extracts all MD lists from a [string]
 * @param {[string]} lines
 * @returns {[[],[Number, []]]} starting index for each list and lines relating to this list
 */
const extractAllLists = (lines) => {
  let allLists = [];
  let cache = [];
  let pInd = 0;
  let fInd = 0;
  let otherStuff = [];
  lines.forEach((line, index) => {
    if (ulReg.test(line) || olReg.test(line)) {
      if (index - pInd > 1) {
        if (cache.length > 0) allLists.push([fInd, cache]);
        cache = [];
        fInd = index;
        cache.push(line);
      } else {
        cache.push(line);
      }
      pInd = index;
    } else {
      otherStuff.push(line);
    }
  });
  allLists.push([fInd, cache]);
  return [otherStuff, allLists];
};

/**
 * @function parseLists parsing and wrapping all lists / sublists
 * @param {[Number, [Number, string]]} lists
 * @returns {[[number, string]]} parsed html including index to insert into
 */
const parseLists = (lists) => {
  const prefixOL = "<ol>";
  const prefixUL = "<ul>";
  const affixOL = "</ol>";
  const affixUL = "</ul>";
  let allHtml = [];

  lists.forEach((list) => {
    let html = "";
    let prevIndent = -1;
    let prevAffix = "";
    list[1].forEach((line) => {
      let prefix = olReg.test(line) ? prefixOL : prefixUL;
      let affix = olReg.test(line) ? affixOL : affixUL;
      let indent = line.length - line.trimStart().length;
      if (indent > prevIndent) {
        html += prefix;
      } else if (indent < prevIndent) {
        html += prevAffix;
      }
      prevAffix = affix;
      prevIndent = indent;
      html += createListItem(line);
    });
    html += prevAffix;
    allHtml.push([list[0], html]);
  });

  return allHtml;
};

const createListItem = (text) =>
  `<li>${text.trim().split(" ").slice(1).join(" ")}</li>`;
