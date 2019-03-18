const { parseDict } = require('./make_dict.js');

describe('make_dict', () => {
  test('parseDict is a function', () => {
    expect(typeof parseDict).toBe('function');
  });

  test('parseDict parses raw xml string', () => {
    const xml = `
<?xml version='1.0' encoding='UTF-8' ?>
<!DOCTYPE ldml SYSTEM "../../common/dtd/ldml.dtd">
<ldml>
	<annotations>
		<annotation cp='😀'>face | grin | grinning face</annotation>
		<annotation cp='😀' type='tts'>grinning face</annotation>
	</annotations>
</ldml>
    `.trim();
    const dict = parseDict(xml);
    expect(dict['😀']).not.toBe(undefined);
    expect(dict['😀']).toEqual(['face', 'grin', 'grinning face']);
  });
});
