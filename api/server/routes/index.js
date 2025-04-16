const actions = require('./actions');
const agents = require('./agents');
const assistants = require('./assistants');
const auth = require('./auth');
const balance = require('./balance');
const banner = require('./banner');
const bedrock = require('./bedrock');
const categories = require('./categories');
const config = require('./config');
const convos = require('./convos');
const edit = require('./edit');
const endpoints = require('./endpoints');
const files = require('./files');
const keys = require('./keys');
const messages = require('./messages');
const models = require('./models');
const oauth = require('./oauth');
const plugins = require('./plugins');
const presets = require('./presets');
const prompts = require('./prompts');
const roles = require('./roles');
const search = require('./search');
const share = require('./share');
const staticRoute = require('./static');
const tags = require('./tags');
const tokenizer = require('./tokenizer');
const user = require('./user');
const ask = require('./ask');

// 👇 Если позже подключаешь лево-пресеты:
// const leoPresets = require('./leoPresets');

module.exports = {
  actions,
  agents,
  assistants,
  auth,
  balance,
  banner,
  bedrock,
  categories,
  config,
  convos,
  edit,
  endpoints,
  files,
  keys,
  messages,
  models,
  oauth,
  plugins,
  presets,
  prompts,
  roles,
  search,
  share,
  staticRoute,
  tags,
  tokenizer,
  user,
  ask,
  // leoPresets, // 👉 Подключаешь при необходимости
};
