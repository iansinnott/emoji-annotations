all:

tmp:
	mkdir tmp

tmp/zh.xml:
	curl -L https://unicode.org/repos/cldr/tags/latest/common/annotations/zh.xml > $@

tmp/zh_Hant.xml:
	curl -L https://unicode.org/repos/cldr/tags/latest/common/annotations/zh_Hant.xml > $@

tmp/en.xml:
	curl -L https://unicode.org/repos/cldr/tags/latest/common/annotations/en.xml > $@

raw_data: tmp/zh.xml tmp/zh_Hant.xml tmp/en.xml

data/en.json: raw_data
	node bin/make_dict.js ./tmp/en.xml ./data/en.json

data/zh.json: raw_data
	node bin/make_dict.js ./tmp/zh.xml ./data/zh.json

data/zh_Hant.json: raw_data
	node bin/make_dict.js ./tmp/zh_Hant.xml ./data/zh_Hant.json

json_data: data/en.json data/zh.json data/zh_Hant.json

check/me/out.txt:
	@echo '$$@: '$@
	@echo '$$%: '$%
