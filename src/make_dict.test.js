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
		<annotation cp='😎'>bright | cool | face | smiling face with sunglasses | sun | sunglasses</annotation>
		<annotation cp='😎' type='tts'>smiling face with sunglasses</annotation>
	</annotations>
</ldml>
    `.trim();
    const dict = parseDict(xml);
    expect(dict['😀']).not.toBe(undefined);
    expect(dict['😀']).toEqual(['face', 'grin', 'grinning face']);
    expect(dict['😎']).not.toBe(undefined);
    expect(dict['😎']).toEqual([
      'bright',
      'cool',
      'face',
      'smiling face with sunglasses',
      'sun',
      'sunglasses',
    ]);
  });

  test('parseDict supports chinese characters', () => {
    const xml = `
<?xml version='1.0' encoding='UTF-8' ?>
<!DOCTYPE ldml SYSTEM "../../common/dtd/ldml.dtd">
<ldml>
	<annotations>
		<annotation cp="😀">微笑 | 笑臉</annotation>
		<annotation cp="😀" type="tts">笑臉</annotation>
		<annotation cp="😎">酷 | 墨鏡</annotation>
		<annotation cp="😎" type="tts">墨鏡</annotation>
	</annotations>
</ldml>
    `.trim();
    const dict = parseDict(xml);
    expect(dict['😀']).not.toBe(undefined);
    expect(dict['😀']).toEqual(['微笑', '笑臉']);
    expect(dict['😎']).not.toBe(undefined);
    expect(dict['😎']).toEqual(['酷', '墨鏡']);
  });
});
