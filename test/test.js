
import assert from 'assert'
import { fileURLToPath } from 'url'
import { dirname } from 'path'
import iConfigLite from '../index.js'
// 获取 __dirname 的 ESM 写法
const __dirname = dirname(fileURLToPath(import.meta.url))
const config =  iConfigLite(__dirname)

assert.deepEqual({
  age: 100,
  name: 'production',
  mongodb: { db: 'production', url: 'default' }
}, config)
