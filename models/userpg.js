const {
    Sequelize,
    DataTypes,
    Model
} = require('sequelize');
const sequelize = new Sequelize('postgres://postgres:28456273@localhost:5432/dbname');

class User extends Model {}

const User1 = sequelize.define('User', {
    // Model attributes are defined here
    name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false
        // allowNull defaults to true
    },
    pass: {
        type: DataTypes.STRING,
        allowNull: false
        // allowNull defaults to true
        
    },
    img: {
        type: DataTypes.STRING
        // allowNull defaults to true
    },
    rol: {
        type: DataTypes.STRING,
        allowNull: false
        // allowNull defaults to true
    }
});
// the defined model is the class itself
console.log(User1 === sequelize.models.User); // true