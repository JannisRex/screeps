let constants = {

  getEnergyAvailable: function () {
    let energyAvailable = 0
    energyAvailable = Game.spawns.S1.store[RESOURCE_ENERGY]

    return energyAvailable
  }

}

module.exports = {
  energyAvailable: constants.getEnergyAvailable(),
  maxCreepParts: 13 // upper border for dynamic sizing
}
