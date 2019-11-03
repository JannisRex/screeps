let _Constructor = {
  creep: null,

  setCreep: function (creep) {
    this.creep = creep
    return this
  },

  run: function () {
    if (this.creep.memory.onSpawned === undefined) {
      this.onSpawn()
      this.creep.memory.onSpawned = true
    }

    this.action(this.creep)

    if (this.creep.ticksToLive === 1) {
      this.beforeAge()
    }
  },

  handleEvents: function () {
    if (this.creep.memory.onSpawned === undefined) {
      this.onSpawnStart()
      this.onSpawn()
      this.creep.memory.onSpawned = true
    }

    if (this.creep.memory.onSpawnEnd === undefined && !this.creep.spawning) {
      this.onSpawnEnd()
      this.creep.memory.onSpawnEnd = true
    }
  },

  getParts: function () {
    return this.parts()
  },


  onSpawn: function () { },

  onSpawnStart: function () { },

  onSpawnEnd: function () { },

  beforeAge: function () { },

  rest: function () {
    let creep = this.creep

    let distance = 3
    let restTarget = creep.pos.findNearest(FIND_MY_SPAWNS)

    // check if a flag is set
    // and rally there instead
    let flags = Game.flags
    for (let i in flags) {
      if (flags[i]) {
        let flag = flags[i]
        if (creep.pos.inRangeTo(flag, distance) || creep.pos.findPathTo(flag).length > 0) {
          restTarget = flag
          break
        }
      }
    }

    // approach target untill distance reached
    if (creep.pos.findPathTo(restTarget).length > distance) {
      creep.moveTo(restTarget)
    }
  },

  rangedAttack: function (target) {
    let creep = this.creep

    if (!target) {
      target = creep.pos.findNearest(Game.HOSTILE_CREEPS)
    }

    if (target) {
      if (target.pos.inRangeTo(creep.pos, 3)) {
        creep.rangedAttack(target)
        return target
      }
    }
    return null
  },

  keepAwayFromEnemies: function () {
    let creep = this.creep

    let target = creep.pos.findNearest(Game.HOSTILE_CREEPS)
    if (target !== null && target.pos.inRangeTo(creep.pos, 3)) {
      creep.moveTo(creep.pos.x + creep.pos.x - target.pos.x, creep.pos.y + creep.pos.y - target.pos.y)
    }
  },

  kite: function (target) {
    let creep = this.creep

    if (target.pos.inRangeTo(creep.pos, 2)) {
      creep.moveTo(creep.pos.x + creep.pos.x - target.pos.x, creep.pos.y + creep.pos.y - target.pos.y)
      return true
    } else if (target.pos.inRangeTo(creep.pos, 3)) {
      return true
    }

    creep.moveTo(target)
    return true
  },

  // prioritizes Ranged > mobileMelee > Healer > staticMelee
  getRangedTarget: function () {
    let creep = this.creep

    let closeArchers = creep.pos.findNearest(Game.HOSTILE_CREEPS, {
      filter: function (enemy) {
        return enemy.getActiveBodyparts(Game.RANGED_ATTACK) > 0
          && creep.pos.inRangeTo(enemy, 3)
      }
    })

    if (closeArchers !== null) {
      return closeArchers
    }

    let closeMobileMelee = creep.pos.findNearest(Game.HOSTILE_CREEPS, {
      filter: function (enemy) {
        return enemy.getActiveBodyparts(Game.ATTACK) > 0
          && enemy.getActiveBodyparts(Game.MOVE) > 0
          && creep.pos.inRangeTo(enemy, 3)
      }
    })

    if (closeMobileMelee !== null) {
      return closeMobileMelee
    }

    let closeHealer = creep.pos.findNearest(Game.HOSTILE_CREEPS, {
      filter: function (enemy) {
        return enemy.getActiveBodyparts(Game.HEAL) > 0
          && enemy.getActiveBodyparts(Game.MOVE) > 0
          && creep.pos.inRangeTo(enemy, 3)
      }
    })

    if (closeHealer !== null) {
      return closeHealer
    }

    return creep.pos.findNearest(Game.HOSTILE_CREEPS)
  }
}

module.exports = _Constructor
