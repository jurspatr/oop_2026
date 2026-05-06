class Shop {
    name: string;
    openHour: number;
    closeHour: number;
    visits: number;

    constructor(name: string, openHour: number, closeHour: number) {
        this.name = name;
        this.openHour = openHour;
        this.closeHour = closeHour;
        this.visits = 0;
    }
    //checking if the shops open. Can also be open 24/7
    isOpen(time: number): boolean {
        if (this.openHour === 0 && this.closeHour === 24) {
            return true;
        }

        return time >= this.openHour && time < this.closeHour;
    }
    //adds a visit everytime someone visits
    visit(): void {
        this.visits++;
    }
    //gets the info of the shop: name, open hours and visits
    getInfo(): string {
        return `${this.name} (${this.openHour}:00 - ${this.closeHour}:00), visits: ${this.visits}`;
    }
}

class StoreChain {
    chainName: string;
    shops: Shop[]

    constructor(chainName: string) {
        this.chainName = chainName;
        this.shops = [];
    }
    //function to add a shop
    addShop(shop: Shop): void {
        this.shops.push(shop);
    }
    //returns only open shops
    getOpenShops(time: number): Shop[] {
        return this.shops.filter(shop => shop.isOpen(time));
    }
    //allows you to search the shop by name
    getShopByName(name: string): Shop | undefined {
        return this.shops.find(shop => shop.name.toLowerCase() === name.toLowerCase());
    }

    //gets the total number of visits
    getTotalVisits(): number {
        return this.shops.reduce((sum, shop) => sum + shop.visits, 0);
    }

    //returns the HTML statistics for this chain and its shops  
    getStatsHtml(): string {
        let html = `<div class="stats"><h3>${this.chainName}</h3><ul>`;
        for (const shop of this.shops) {
            html += `<li>${shop.getInfo()}</li>`;
        }
        html += `</ul><p><strong>Total chain visits:</strong> ${this.getTotalVisits()}</p></div>`;
        return html;
    }

}

class ShopGroup {
    chains: StoreChain[];

    constructor() {
        this.chains = []
    }

    //adds a chain
    addChain(chain: StoreChain): void {
        this.chains.push(chain);
    }

    //gets all of the shops open at the time
    getAllOpenShops(time: number): Shop[] {
        let result: Shop[] = [];
        for (const chain of this.chains) {
            result = result.concat(chain.getOpenShops(time));
        }
        return result;  
    }

    //visits a shop by name and increases its visit count
    //returns true if the shop was found otherwise false
    visitShop(name: string): boolean {
        for (const chain of this.chains) {
            const shop = chain.getShopByName(name);
            if (shop) {
                shop.visit();
                return true;
            }
        }
        return false;
    }

    //returns the HTML statistics for all store chains
    getAllStatsHtml(): string {
        let html = "";
        for (const chain of this.chains) {
            html += chain.getStatsHtml();
        }
        return html;
    }

}

const chain1 = new StoreChain('Coop')
chain1.addShop(new Shop('Coop Mini Teatri', 7, 21));
chain1.addShop(new Shop('Coop Lasnamäe', 8, 22));
chain1.addShop(new Shop('Coop Sõpruse', 8, 22));
chain1.addShop(new Shop('Coop Akadeemia', 8, 22));
chain1.addShop(new Shop('Coop Linnamäe', 8, 22));

const chain2 = new StoreChain('Selver')
chain2.addShop(new Shop('Selver Kotka', 9, 22))
chain2.addShop(new Shop('Selver Balti jaam', 7, 22))
chain2.addShop(new Shop('Selver Tondi', 8, 23))
chain2.addShop(new Shop('Selver Kolde', 8, 23))
chain2.addShop(new Shop('Selver Torupilli', 8, 23))

const chain3 = new StoreChain('Rimi')
chain3.addShop(new Shop('Rimi Telliskivi', 8, 22))
chain3.addShop(new Shop('Rimi Mini Tatari', 7, 22))
chain3.addShop(new Shop('Rimi Super Kaubahalli', 8, 22))
chain3.addShop(new Shop('Rimi Super Postimaja', 8, 22))
chain3.addShop(new Shop('Rimi Hyper Sõpruse', 8, 22))

const chain4 = new StoreChain('Maxima')
chain4.addShop(new Shop('Maxima Mustamäe', 8, 22))
chain4.addShop(new Shop('Maxima Sõpruse', 8, 22))
chain4.addShop(new Shop('Maxima Nõmme', 8, 22))
chain4.addShop(new Shop('Maxima Ehitajate', 0, 24))
chain4.addShop(new Shop('Maxima Pallasti', 8, 22))

const chain5 = new StoreChain('Prisma')
chain5.addShop(new Shop('Prisma Kristiine', 8, 23))
chain5.addShop(new Shop('Prisma Old Town', 0, 24))
chain5.addShop(new Shop('Prisma Sikupilli', 0, 24))
chain5.addShop(new Shop('Prisma Mustika', 0, 24))
chain5.addShop(new Shop('Prisma Rocca al Mare', 8, 23))

const group = new ShopGroup();
group.addChain(chain1);
group.addChain(chain2);
group.addChain(chain3);
group.addChain(chain4);
group.addChain(chain5);

//shows all open shops in the HTML based on the entered time.
function showOpenShops(): void {
    const timeInput = document.getElementById("timeInput") as HTMLInputElement;
    const output = document.getElementById("openShopsOutput") as HTMLDivElement;

    const time = Number(timeInput.value);
    const openShops = group.getAllOpenShops(time);

    if (openShops.length === 0) {
        output.innerHTML = `<p class="closed">No shops are open at ${time}:00.</p>`;
        return;
    }

    let html = `<p class="open">Open shops at ${time}:00:</p><ul>`;
    for (const shop of openShops) {
        html += `<li class="shop-item">${shop.name}</li>`;
    }
    html += `</ul>`;

    output.innerHTML = html;
}


//visits the shop entered by the user and updates the visit count
function visitShopByName(): void {
    const input = document.getElementById("visitShopName") as HTMLInputElement;
    const output = document.getElementById("visitOutput") as HTMLDivElement;

    const shopName = input.value.trim();

    if (shopName === "") {
        output.innerHTML = `<p class="closed">Please enter a shop name.</p>`;
        return;
    }

    const success = group.visitShop(shopName);

    if (success) {
        output.innerHTML = `<p class="open">Visited ${shopName}. Visit count increased.</p>`;
    } else {
        output.innerHTML = `<p class="closed">Shop not found.</p>`;
    }
}

//displays statistics for all chains and shops in the HTML
function showStatistics(): void {
    const output = document.getElementById("statsOutput") as HTMLDivElement;
    output.innerHTML = group.getAllStatsHtml();
}






