export { parseHyperlinks };

const LINK_REG = /(\[.*\]\(.*\))/gi;

const parseHyperlinks = (text) => {
  let m, code;
  let match;
  while ((match = LINK_REG.exec(text))) {
    [m, code] = convertHyperLinks(match);
    text = text.replace(m, code);
  }
  return text;
};

const convertHyperLinks = (match) => {
  let m, text, url, code;
  m = match[0];
  text = m.split("]")[0].slice(1);
  url = m.split("(")[1].slice(0, -1);
  code = `<a href="${url}" target="_blank">${text}</a>`;
  return [m, code];
};
