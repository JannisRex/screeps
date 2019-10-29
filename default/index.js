// BUILDINGS
module.exports.buildings = {
  tower: require('defence.tower')
}

// CREEPS
module.exports.creeps = {
  builder: require('role.builder'),
  miner: require('role.miner'),
  upgrader: require('role.upgrader')
}
// LIB
module.exports.lib = {
  constants: require('helper.constants'),
  control: require('helper.control'),
  safemode: require('helper.safemode')
}
