module.exports.config = {
  baseClass: require('creep._Constructor'),
  manager: require('creep._Manager'),
  spawner: require('creep._Spawner'),
  config: require('lib.config'),
  safemode: require('lib.safemode'),
  cleanupDeadCreeps: require('lib.cleanupDeadCreeps')
}
module.exports.creeps = {
  miner: require(creep.miner)
}
module.exports.buildings = {
  road: require('building.road'),
  tower: require('building.tower')
}
