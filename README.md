## config-lite

A super simple & flexible & intuitive config module, support `yaml` & `toml`. Use by import.
another version for config-lite.
### Install

```bash
$ npm i import-config-lite --save
```

### Usage

```js
import iConfigLite from ('import-config-lite');
const config = iConfigLite(__dirname);
```

or:

```js

import iConfigLite from ('import-config-lite');
const config = iConfigLite({
  filename: 'test',
  config_basedir: __dirname,
  config_dir: 'config'
});
```

### Options

- filename: config file name, default: `default`, support: `['.js', '.json', '.node', '.yaml', '.yml', '.toml']`.
- config_basedir: directory for begining bubbling find config directory.
- config_dir: config directory name, default: `config`.
- config: default config object that overwrite config file.

### Priority

environment option > custom option > default option

For example:

```bash
$ NODE_ENV=test NODE_CONFIG='{"port":3000}' node app.js --port=3001
```

loading order:

`--port=3001` > `NODE_CONFIG='{"port":3000}'` > opt.config > test config file > default config file

### Environment Variables

- NODE_ENV -> filename
- CONFIG_BASEDIR || NODE_CONFIG_BASEDIR -> config_dirname
- CONFIG_DIR || NODE_CONFIG_DIR -> config_dir
- CONFIG || NODE_CONFIG -> config

### Test

```bash
$ npm test
```

### License

MIT
