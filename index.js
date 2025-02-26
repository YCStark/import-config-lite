import fs from 'fs'

import _ from 'lodash'
import chalk from 'chalk'
import resolve from 'resolve'
import optimist from 'optimist'
import jsYaml from 'js-yaml'
import toml from 'toml'

const NODE_ENV = process.env.NODE_ENV
const CONFIG_BASEDIR = process.env.CONFIG_BASEDIR || process.env.NODE_CONFIG_BASEDIR
const CONFIG_DIR = process.env.CONFIG_DIR || process.env.NODE_CONFIG_DIR
const CONFIG = _.defaultsDeep({}, _.omit(optimist.argv, '_', '$0'), JSON.parse(process.env.CONFIG || process.env.NODE_CONFIG || '{}'))

export default function configLite(customOpt) {
  let config = {}
  if (!_.isPlainObject(customOpt)) {
    if (customOpt && _.isString(customOpt)) {
      customOpt = { config_basedir: customOpt }
    } else {
      throw new TypeError('import-config-lite custom option should be a string or an object')
    }
  }
  const opt = {
    filename: NODE_ENV || customOpt.filename || 'default',
    config_basedir: CONFIG_BASEDIR || customOpt.config_basedir,
    config_dir: CONFIG_DIR || customOpt.config_dir || 'config'
  }

  if (opt.filename !== 'default') {
    try {
      config = loadConfigFile(opt.filename, opt)
    } catch (e) {
      console.error(chalk.red('import-config-lite load "' + opt.filename + '" failed.'))
      console.error(chalk.red(e.stack))
    }
  }

  try {
    config = _.defaultsDeep({}, config, loadConfigFile('default', opt))
  } catch (e) {
    console.error(chalk.red('import-config-lite load "default" failed.'))
    console.error(chalk.red(e.stack))
  }
  return _.defaultsDeep({}, CONFIG, customOpt.config, config)
}

function loadConfigFile(filename, opt) {
  const filepath = resolve.sync(filename, {
    basedir: opt.config_basedir,
    extensions: ['.js', '.json', '.node', '.yaml', '.yml', '.toml'],
    moduleDirectory: opt.config_dir
  })

  if (/\.ya?ml$/.test(filepath)) {
    return jsYaml.safeLoad(fs.readFileSync(filepath, 'utf8'))
  } else if (/\.toml$/.test(filepath)) {
    return toml.parse(fs.readFileSync(filepath, 'utf8'))
  } else {
    return JSON.parse(fs.readFileSync(filepath, 'utf8'))
  }
}
