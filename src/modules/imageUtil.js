export { parseImages };

const IMG_REG = /(\!\[.*\]\(.*\))/gi;

const parseImages = (text) => {
  let m, code;
  let match;
  while ((match = IMG_REG.exec(text))) {
    [m, code] = convertImages(match);
    text = text.replace(m, code);
  }
  return text;
};

const convertImages = (match) => {
  let m, text, url, code;
  m = match[0];
  text = m.split("]")[0].slice(2);
  url = m.split("(")[1].slice(0, -1);
  code = `<img src="${url}" alt="${text}"">`;
  return [m, code];
};
