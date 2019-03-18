const en = require('../data/en.json');
const zh = require('../data/zh.json');
const zh_Hant = require('../data/zh_Hant.json');

module.exports = {
  en,
  zh,
  zh_Hant,

  // Aliases
  cn: zh,
  tw: zh_Hant
};
