class StorageContainer <T> {
    private contents: T[]

    constructor(){
        this.contents = [];
    }

    addItem(item: T):void {
        this.contents.push(item);
    }

    getItem(idx: number): T | undefined {
        return this.contents[idx];
    }
}

const usernames = new StorageContainer<string>();
usernames.addItem("pedrotech");
usernames.addItem("echobr");
console.log(usernames.getItem(0));

const friendsCount = new StorageContainer<number>();
friendsCount.addItem(4);
friendsCount.addItem(22);
console.log(friendsCount.getItem(0));