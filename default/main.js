let helperControl = require('index').lib.control

module.exports.loop = function () {
  const spawnUnits = true
  if (spawnUnits) {
  // lowest gets called first @beginning
    helperControl.spawnBuilder()
    helperControl.spawnUpgrader()
    helperControl.spawnMiner()
  }

  if (!Game.spawns.S1.spawns) {
    helperControl.assignRoles()
    helperControl.clearDeadMemory()
  }


  // helperTower.attackClosest(TOWERID)
  // helperTower.repairClosest(TOWERID)
}
