let miner = {
  parts: function () {
    let availableEnergy = Game.spawns.S1.room.energyAvailable
    let availableParts = require('config').maxCreepParts
    let creepParts = [ ]

    // if theres still 'room' to make 2xWork + 1xCarry + 1xMove
    // and enough energy in storage
    while (availableParts >= 3 && availableEnergy >= 250) {
    // pushing parts to array, which will be used to spawn creep
      creepParts.push(WORK)
      creepParts.push(WORK)
      creepParts.push(MOVE)

      availableParts = availableParts - 3
      availableEnergy = availableEnergy - 250
    }

    return creepParts || [WORK, MOVE]
  },

  getOpenSource: function () {
    let creep = this.creep

    // checks wether or not clostest source is being mined by a miner
    let source = creep.pos.findClosestByPath(FIND_SOURCES, {
      filter: function (source) {
        if (Memory.sources[source.id] === undefined || Memory.sources[source.id].miner === undefined || Memory.sources[source.id].miner === creep.id) {
          return true
        }

        if (Game.getObjectById(Memory.sources[source.id].miner) === null) {
          return true
        }

        return false
      }
    })

    return source
  },

  setSourceToMine: function (source) {
    let creep = this.creep

    if (!source) {
      return
    }

    // starts to set values in Memory
    // to store if a miner is mining THIS source
    if (Memory.sources[source.id] === undefined) {
      Memory.sources[source.id] = { id: source.id }
    }

    // stores minerName in Memory @source
    // and stores sourceName in CreepMemory
    Memory.sources[source.id].miner = creep.id
    creep.memory.source = source.id

    // gets closest spawn and path to source
    let destinationSpawn = source.pos.findClosestByPath(FIND_MY_SPAWNS)
    let pathBetween = destinationSpawn.pos.findPathTo(source).length * 2

    // since Miner have mostly WORK-Parts, they need
    // help to carry their energy
    let helpersNeeded = Math.round((pathBetween * 8) / 100)

    // to limit max helper
    if (helpersNeeded > 3) {
      helpersNeeded = 3
    }

    // adds needed helper to Que (at front)
    for (let i = 0; i <= helpersNeeded; i++) {
      Memory.spawnQue.unshift({ type: 'miner_helper', memory: {
        miner: creep.id
      } })
    }

    creep.memory.helpersNeeded = helpersNeeded
  },

  onSpawn: function () {
    let creep = this.creep

    // creates properties to prevent null or undef
    creep.memory.isNearSource = false
    creep.memory.helpers = []

    // gets source to mine from
    // and starts mining
    let source = this.getOpenSource()
    this.setSourceToMine(source)

    creep.memory.onCreated = true
  },

  // miner just farms same source untill empty
  // then it waits untill respawn. Energy gets
  // just dropped to ground for later pick
  action: function () {
    let creep = this.creep
    let source = Game.getObjectById(creep.memory.source)

    if (source === null) {
      let source = this.getOpenSource()

      if (!source) {
        return
      }

      this.setSourceToMine(source)
    }

    // determine wether or not creep is
    // near source to start mining
    if (creep.pos.inRangeTo(source, 5)) {
      creep.memory.isNearSource = true
    } else {
      creep.memory.isNearSource = false
    }

    if (Memory.sources[source.id] === undefined) {
      Memory.sources[source.id] = { id: source.id }
    }

    // when starting to mine, it
    // stores it reference in Memory
    Memory.sources[source.id].miner = creep.id

    // mines from source or movesTo if not in Range
    if (creep.harvest(source) === ERR_NOT_IN_RANGE) {
      creep.moveTo(source)
    }
  }
}

module.exports = miner
