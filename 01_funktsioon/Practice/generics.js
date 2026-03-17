var StorageContainer = /** @class */ (function () {
    function StorageContainer() {
        this.contents = [];
    }
    StorageContainer.prototype.addItem = function (item) {
        this.contents.push(item);
    };
    StorageContainer.prototype.getItem = function (idx) {
        return this.contents[idx];
    };
    return StorageContainer;
}());
var usernames = new StorageContainer();
usernames.addItem("pedrotech");
usernames.addItem("echobr");
console.log(usernames.getItem(0));
var friendsCount = new StorageContainer();
friendsCount.addItem(4);
friendsCount.addItem(22);
console.log(friendsCount.getItem(0));
