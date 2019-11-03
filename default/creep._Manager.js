module.exports = {
  // http://justinfagnani.com/2015/12/21/real-mixins-with-javascript-classes/
  // essentially refreshing prototypes
  extend: function (dest, source) {
    for (let i in source) {
      if (!dest.hasOwnProperty(i)) {
        dest[i] = source[i]
      }
    }
    return dest
  },


  roleExists: function (role) {
    try {
      require('creep.' + role)
      return true
    } catch (e) {
      return false
    }
  },

  getRole: function (role) {
    if (!this.roleExists(role)) {
      return false
    }

    let baseClass = require('creep._Constructor')

    let roleObject = require('creep.' + role)
    roleObject = this.extend(roleObject, baseClass)
    return roleObject
  },

  getRoleBodyParts: function (role) {
    if (!this.roleExists(role)) {
      return false
    }

    let fixedRole = this.getRole(role)

    if (fixedRole.getParts !== undefined) {
      return fixedRole.getParts.call(fixedRole)
    }
    return fixedRole.prototype.getParts.call(fixedRole)
  }
}
