let roleHarvester = require('role.harvester')
let harvesterCount = 0

let roleBuilder = require('role.builder')
let builderCount = 0

let roleUpgrader = require('role.upgrader')
let upgraderCount = 0

const spawnOne = Game.spawns.S1

let helperControl = {

  /**  **/
  spawnHarvester: function () {
    let harvesters = _.filter(Game.creeps, (creep) => creep.memory.role == 'harvester')
    let energyAvailable = Game.spawns.S1.store[RESOURCE_ENERGY]

    if (harvesters.length < 2 && energyAvailable > 200) {
      harvesterCount = harvesterCount + 1
      let newName = 'Harvester' + harvesterCount
      console.log('Spawning new harvester: ' + newName)
      spawnOne.spawnCreep([WORK, CARRY, MOVE], newName,
        { memory: { role: 'harvester' } })
    }

    helperControl.checkIfSpawning()
  },

  /**  **/
  spawnBuilder: function () {
    let builders = _.filter(Game.creeps, (creep) => creep.memory.role == 'builder')
    let energyAvailable = Game.spawns.S1.store[RESOURCE_ENERGY]

    if (builders.length < 1 && energyAvailable > 200) {
      builderCount = builderCount + 1
      let newName = 'Builder' + builderCount
      console.log('Spawning new builder: ' + newName)
      spawnOne.spawnCreep([WORK, CARRY, MOVE], newName,
        { memory: { role: 'builder' } })
    }

    helperControl.checkIfSpawning()
  },

  /**  **/
  spawnUpgrader: function () {
    let upgraders = _.filter(Game.creeps, (creep) => creep.memory.role == 'upgrader')
    let energyAvailable = Game.spawns.S1.store[RESOURCE_ENERGY]

    if (upgraders.length < 1 && energyAvailable > 200) {
      upgraderCount = upgraderCount + 1
      let newName = 'Harvester' + upgraderCount
      console.log('Spawning new harvester: ' + newName)
      spawnOne.spawnCreep([WORK, CARRY, MOVE], newName,
        { memory: { role: 'harvester' } })
    }

    helperControl.checkIfSpawning()
  },

  /**  **/
  checkIfSpawning: function () {
    if (spawnOne.spawning) {
      try {
        let spawningCreep = Game.creeps[spawnOne.spawning.name]
        spawnOne.room.visual.text(
          '🛠️' + spawningCreep.memory.role,
          spawnOne.pos.x + 1,
          spawnOne.pos.y,
          { align: 'left', opacity: 0.8 })
      } catch (e) { /* console.log(e) */ }
    }
  },

  assignRoles: function () {
    for (let name in Game.creeps) {
      if (name && typeof name === 'string') {
        let creep = Game.creeps[name]
        if (creep) {
          if (creep.memory.role === 'harvester') {
            roleHarvester.run(creep)
          }
          if (creep.memory.role === 'upgrader') {
            roleUpgrader.run(creep)
          }
          if (creep.memory.role === 'builder') {
            roleBuilder.run(creep)
          }
        }
      }
    }
  }
}

module.exports = helperControl
