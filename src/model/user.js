export class User {
    id;
    username;
    password;

    constructor (id, username, password) {
        this.id = id == null ? 0 : id;
        this.username = username == null ? "" : username;
        this.password = password == null ? "" : password;
    }
}