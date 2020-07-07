BABEL_CMD=./node_modules/.bin/babel
MOCHA_CMD=./node_modules/.bin/mocha

SRC_JS = $(shell find src -name "*.js")
LIB_JS = $(patsubst src/%.js,lib/%.js,$(SRC_JS))

build: js

test: build
	$(MOCHA_CMD) lib/**/__tests__/*-test.js --require ./lib/test-init.js

js: $(LIB_JS) lib/bin/json2scss

$(LIB_JS): lib/%.js: src/%.js
	mkdir -p $(dir $@) && $(BABEL_CMD) $< -o $@

lib/bin/json2scss:
	mkdir -p $(dir $@) && $(BABEL_CMD) src/bin/json2scss -o $@ 

clean:
	rm -rf lib/

.PHONY: build test js clean
