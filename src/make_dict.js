const fs = require('fs');
const path = require('path');
const xml2js = require('xml-js').xml2js;
const { pipe, tap } = require('ramda');

const parsingOptions = {
  compact: true, // Just give me the TLDR of this XML
};

/**
 * String -> Object of dict entries indexed by emoji
 */
const parseDict = pipe(
  raw => xml2js(raw, parsingOptions),
  xml => xml.ldml.annotations.annotation, // A big array of stuff
  annotations =>
    annotations.reduce((dict, el) => {
      const attr = el._attributes;
      const val = el._text;
      const character = attr.cp;

      // Skip all TTS for now
      if (attr.tts) return dict;

      return {
        ...dict,
        [character]: val,
      };
    }, {})
);

const makeDict = pipe(
  filepath => path.resolve(filepath),
  filepath => fs.readFileSync(filepath, { encoding: 'utf8' }),
  parseDict
);

module.exports = { parseDict, makeDict };
