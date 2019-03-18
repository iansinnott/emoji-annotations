const language = require('./language.js');

describe('language dicts', () => {
  test('en', () => {
    expect(language.en).not.toBe(undefined);
    expect(language.en['😀']).toEqual(['face', 'grin', 'grinning face']);
  });
  test('zh', () => {
    expect(language.zh['😀']).toEqual(['嘿嘿', '笑脸', '脸']);
  });
  test('zh_Hant', () => {
    expect(language.zh_Hant['😀']).toEqual(['微笑', '笑臉']);
  });
  test('aliases', () => {
    expect(language.cn).not.toBe(undefined);
    expect(language.tw).not.toBe(undefined);
    expect(language.cn['😀']).toEqual(['嘿嘿', '笑脸', '脸']);
    expect(language.tw['😀']).toEqual(['微笑', '笑臉']);
  });
});
