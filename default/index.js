module.exports.slave = {
  slave: require('main.slave')
}
module.exports.lib = {
  config: require('lib.config'),
  constants: require('lib.constants'),
  safemode: require('lib.safemode')
}
module.exports.buildings = {
  road: require('building.road'),
  tower: require('building.tower')
}
