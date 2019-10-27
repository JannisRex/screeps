let helperControl = require('index').lib.control

module.exports.loop = function () {
  const spawnUnits = true
  if (spawnUnits) {
    helperControl.spawnBuilder()
    helperControl.spawnUpgrader()
    helperControl.spawnHarvester()
  }

  if (!Game.spawns.S1.spawns) {
    helperControl.assignRoles()
    helperControl.clearDeadMemory()
  }


  // helperTower.attackClosest(TOWERID)
  // helperTower.repairClosest(TOWERID)
}
