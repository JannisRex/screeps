module.exports.lib = {
  helper: require('main.help'),
  config: require('config'),
  baseClass: require('creep._Constructor'),
  manager: require('creep._Manager'),
  spawner: require('creep._Spawner')
}

module.exports.functions = {
  assignRoles: require('assignRoles'),
  safemode: require('safemode'),
  cleanupDeadCreeps: require('cleanupDeadCreeps')
}

module.exports.creeps = {
  miner: require('creep.miner'),
  upgrader: require('creep.upgrader'),
  builder: require('creep.builder')
}

module.exports.buildings = {
  road: require('building.road'),
  tower: require('building.tower')
}
