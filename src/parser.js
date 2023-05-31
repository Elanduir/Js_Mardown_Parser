import { projectHTML } from "./modules/projector.js";

const SAMPLE = '# Test H1\n## Test H2\n### Test H3';
const projector = projectHTML;

const parse = (text) => {
    let r = '';
    text.split('\n').forEach(l => r += parseLine(l));
    return r;
};

const parseLine = (line) => {
    let splitLine = line.split(' ');
    let mod = splitLine[0];
    switch (mod.charAt(0)){
        case "#":
            return `<h${mod.length}>${splitLine.slice(1).join(" ")}</h${mod.length}>`
    }
    return `<p>${line}</p>`
};


const setup = () => {
    let parsed = parse(SAMPLE);
    projector("parsedRoot", parsed);    
};

setup();