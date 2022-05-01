import { BaseService } from "./base_service";

export class UsersService extends BaseService {
    constructor () {
        super ();
        this.tableName = 'Users';
    }


    getUsers () {
        return this.connection.select({
            from: this.tableName
        })
    }

    addUser (user) {
        return this.connection.insert({
            into: this.tableName,
            values: [user],
            return: true
        })
    }

    getUserById (id) {
        return this.connection.select({
            from: this.tableName,
            where: {
                id: id
            }
        })
    }

    authenticate (username, password) {
        return this.connection.select({
            from: this.tableName,
            where: {
                username: username,
                password: password
            }
        })
    }

    removeUser (id) {
        return this.connection.remove({
            from: this.tableName,
            where: {
                id: id
            }
        })
    }

    updateUserById (id, updateData) {
        return this.connection.update({
            in: this.tableName,
            set: updateData,
            where: {
                id: id
            }
        })
    }
}