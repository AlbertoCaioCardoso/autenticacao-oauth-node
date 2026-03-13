const getDb = require('../util/database').getDb;
const bcrypt = require('bcrypt');

class User {
    constructor(username, email, password){
        this.username = username,
        this.email = email,
        this.password = password
    }

    async save () {
        const db = getDb();
        return db.collection('users').insertOne(this);
    }

    static async findOne(email, password) {
        const db = getDb();
        //buscando apenas o email, comparação de senha só depois
        const user = await db.collection('users').findOne({email:email});
        if(!user){
            return null;
        }

        //comparando os HASHs de senha
        const passwordMatch = await bcrypt.compare(password, user.password);
        if(passwordMatch){
            return user;
        } else {
            return null;
        }
    }
}

module.exports = User;