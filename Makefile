all:

tmp:
	mkdir tmp

tmp/zh.xml:
	curl -L https://unicode.org/repos/cldr/tags/latest/common/annotations/zh.xml > $@

tmp/zh_Hant.xml:
	curl -L https://unicode.org/repos/cldr/tags/latest/common/annotations/zh_Hant.xml > $@

raw_data: tmp/zh.xml tmp/zh_Hant.xml

check/me/out.txt:
	@echo '$$@: '$@
	@echo '$$%: '$%
