var Shop = /** @class */ (function () {
    function Shop(name, openHour, closeHour) {
        this.name = name;
        this.openHour = openHour;
        this.closeHour = closeHour;
        this.visits = 0;
    }
    //checking if the shops open. Can also be open 24/7
    Shop.prototype.isOpen = function (time) {
        if (this.openHour === 0 && this.closeHour === 24) {
            return true;
        }
        return time >= this.openHour && time < this.closeHour;
    };
    //adds a visit everytime someone visits
    Shop.prototype.visit = function () {
        this.visits++;
    };
    //gets the info of the shop: name, open hours and visits
    Shop.prototype.getInfo = function () {
        return "".concat(this.name, " (").concat(this.openHour, ":00 - ").concat(this.closeHour, ":00), visits: ").concat(this.visits);
    };
    return Shop;
}());
var StoreChain = /** @class */ (function () {
    function StoreChain(chainName) {
        this.chainName = chainName;
        this.shops = [];
    }
    //function to add a shop
    StoreChain.prototype.addShop = function (shop) {
        this.shops.push(shop);
    };
    //returns only open shops
    StoreChain.prototype.getOpenShops = function (time) {
        return this.shops.filter(function (shop) { return shop.isOpen(time); });
    };
    //allows you to search the shop by name
    StoreChain.prototype.getShopByName = function (name) {
        return this.shops.find(function (shop) { return shop.name.toLowerCase() === name.toLowerCase(); });
    };
    //gets the total number of visits
    StoreChain.prototype.getTotalVisits = function () {
        return this.shops.reduce(function (sum, shop) { return sum + shop.visits; }, 0);
    };
    //returns the HTML statistics for this chain and its shops
    StoreChain.prototype.getStatsHtml = function () {
        var html = "<div class=\"stats\"><h3>".concat(this.chainName, "</h3><ul>");
        for (var _i = 0, _a = this.shops; _i < _a.length; _i++) {
            var shop = _a[_i];
            html += "<li>".concat(shop.getInfo(), "</li>");
        }
        html += "</ul><p><strong>Total chain visits:</strong> ".concat(this.getTotalVisits(), "</p></div>");
        return html;
    };
    return StoreChain;
}());
var ShopGroup = /** @class */ (function () {
    function ShopGroup() {
        this.chains = [];
    }
    //adds a chain
    ShopGroup.prototype.addChain = function (chain) {
        this.chains.push(chain);
    };
    //gets all of the shops open at the time
    ShopGroup.prototype.getAllOpenShops = function (time) {
        var result = [];
        for (var _i = 0, _a = this.chains; _i < _a.length; _i++) {
            var chain = _a[_i];
            result = result.concat(chain.getOpenShops(time));
        }
        return result;
    };
    //visits a shop by name and increases its visit count
    //returns true if the shop was found otherwise false
    ShopGroup.prototype.visitShop = function (name) {
        for (var _i = 0, _a = this.chains; _i < _a.length; _i++) {
            var chain = _a[_i];
            var shop = chain.getShopByName(name);
            if (shop) {
                shop.visit();
                return true;
            }
        }
        return false;
    };
    //returns the HTML statistics for all store chains
    ShopGroup.prototype.getAllStatsHtml = function () {
        var html = "";
        for (var _i = 0, _a = this.chains; _i < _a.length; _i++) {
            var chain = _a[_i];
            html += chain.getStatsHtml();
        }
        return html;
    };
    return ShopGroup;
}());
var chain1 = new StoreChain('Coop');
chain1.addShop(new Shop('Coop Mini Teatri', 7, 21));
chain1.addShop(new Shop('Coop Lasnamäe', 8, 22));
chain1.addShop(new Shop('Coop Sõpruse', 8, 22));
chain1.addShop(new Shop('Coop Akadeemia', 8, 22));
chain1.addShop(new Shop('Coop Linnamäe', 8, 22));
var chain2 = new StoreChain('Selver');
chain2.addShop(new Shop('Selver Kotka', 9, 22));
chain2.addShop(new Shop('Selver Balti jaam', 7, 22));
chain2.addShop(new Shop('Selver Tondi', 8, 23));
chain2.addShop(new Shop('Selver Kolde', 8, 23));
chain2.addShop(new Shop('Selver Torupilli', 8, 23));
var chain3 = new StoreChain('Rimi');
chain3.addShop(new Shop('Rimi Telliskivi', 8, 22));
chain3.addShop(new Shop('Rimi Mini Tatari', 7, 22));
chain3.addShop(new Shop('Rimi Super Kaubahalli', 8, 22));
chain3.addShop(new Shop('Rimi Super Postimaja', 8, 22));
chain3.addShop(new Shop('Rimi Hyper Sõpruse', 8, 22));
var chain4 = new StoreChain('Maxima');
chain4.addShop(new Shop('Maxima Mustamäe', 8, 22));
chain4.addShop(new Shop('Maxima Sõpruse', 8, 22));
chain4.addShop(new Shop('Maxima Nõmme', 8, 22));
chain4.addShop(new Shop('Maxima Ehitajate', 0, 24));
chain4.addShop(new Shop('Maxima Pallasti', 8, 22));
var chain5 = new StoreChain('Prisma');
chain5.addShop(new Shop('Prisma Kristiine', 8, 23));
chain5.addShop(new Shop('Prisma Old Town', 0, 24));
chain5.addShop(new Shop('Prisma Sikupilli', 0, 24));
chain5.addShop(new Shop('Prisma Mustika', 0, 24));
chain5.addShop(new Shop('Prisma Rocca al Mare', 8, 23));
var group = new ShopGroup();
group.addChain(chain1);
group.addChain(chain2);
group.addChain(chain3);
group.addChain(chain4);
group.addChain(chain5);
//shows all open shops in the HTML based on the entered time.
function showOpenShops() {
    var timeInput = document.getElementById("timeInput");
    var output = document.getElementById("openShopsOutput");
    var time = Number(timeInput.value);
    var openShops = group.getAllOpenShops(time);
    if (openShops.length === 0) {
        output.innerHTML = "<p class=\"closed\">No shops are open at ".concat(time, ":00.</p>");
        return;
    }
    var html = "<p class=\"open\">Open shops at ".concat(time, ":00:</p><ul>");
    for (var _i = 0, openShops_1 = openShops; _i < openShops_1.length; _i++) {
        var shop = openShops_1[_i];
        html += "<li class=\"shop-item\">".concat(shop.name, "</li>");
    }
    html += "</ul>";
    output.innerHTML = html;
}
//visits the shop entered by the user and updates the visit count
function visitShopByName() {
    var input = document.getElementById("visitShopName");
    var output = document.getElementById("visitOutput");
    var shopName = input.value.trim();
    if (shopName === "") {
        output.innerHTML = "<p class=\"closed\">Please enter a shop name.</p>";
        return;
    }
    var success = group.visitShop(shopName);
    if (success) {
        output.innerHTML = "<p class=\"open\">Visited ".concat(shopName, ". Visit count increased.</p>");
    }
    else {
        output.innerHTML = "<p class=\"closed\">Shop not found.</p>";
    }
}
//displays statistics for all chains and shops in the HTML
function showStatistics() {
    var output = document.getElementById("statsOutput");
    output.innerHTML = group.getAllStatsHtml();
}
