const ApplicationPolicy = require("./application");

module.exports = class PostPolicy extends ApplicationPolicy {

    new() {
        return this.record || this._isAdmin();
    }

    create() {
        return this.new() && 
        this.record || this._isAdmin();
    }

    edit() {
        return this._isOwner() || this._isAdmin();
    }

    update() {
        return this.edit()  &&
        this._isOwner() || this._isAdmin();
    }

    destroy() {
        return this.update() && 
        this._isOwner() || this._isAdmin();
    }

    //Idon't need a `show` if it's set for "all" right?

}