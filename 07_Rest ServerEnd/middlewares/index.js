const
    validator = require('./validator');
const validate_Jwt = require('./validate-Jwt');
const   validate_Roles = require('./validate-roles');

module.exports = {
    ...validator,
    ...validate_Jwt,
    ...validate_Roles
}