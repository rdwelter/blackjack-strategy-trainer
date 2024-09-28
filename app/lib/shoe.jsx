export function Shoe(decks) {
    this.shoeMap = new Map();
    this.decks = decks;
    this.cards = 52 * decks;

    this.shuffle = () => {
        this.cards = 52 * decks;
        for (let i = 0; i < 52; i++) {
            this.shoeMap[i] = this.decks;
        }
    }

    this.dealCard = () => {
        let newCard = -1;
        do {
            newCard = Math.floor(Math.random() * 52);
        } while (this.shoeMap[newCard] === 0);
        // console.log("Drew " + newCard);
        this.shoeMap[newCard] -= 1;
        this.cards -= 1;
        // console.log(this.cards + " cards left");
        return newCard;
    }

    this.replaceCard = (card) => {
        this.shoeMap[card] += 1;
        this.cards += 1;
        // console.log("Replaced " + card + ", " + this.cards + " cards left");
    }
}