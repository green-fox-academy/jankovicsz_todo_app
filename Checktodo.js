class CheckTodo {

    argument;
    value;
    arr;

    constructor(object, arr) {
        this.argument = Object.keys(object)[1];
        this.value = Object.values(object)[1];
        this.arr = arr;
    }

    check() {
        try {
            // todo listázás
            if (this.arr.length < 1 && this.argument === 'l' && typeof this.value === 'boolean') {
                throw new Error('Nincs mára tennivalód! :)');
            } if (this.argument === 'l' && typeof this.value !== 'boolean') {
                throw new Error('A feladatok listázása: -l, további argumentumok nem szükségesek!');
            }
            // todo hozzáadása
            if (this.argument === 'a' && typeof this.value === 'boolean') {
                throw new Error("Nem lehetséges új feladat hozzáadása: nincs megadva a feladat!");
            } if (this.argument === 'a' && typeof this.value === 'number') {
                throw new Error("Nem lehetséges új feladat hozzáadása: a feladatot szöveges formában kell megadni!");
            } 

            // todo törlés
            if (typeof this.value === 'boolean' && this.argument === 'r') {
                throw new Error(`Nem lehetséges az eltávolítás: nem adtál meg indexet!`);
            } if (typeof this.value === 'string' && this.argument === 'r') {
                throw new Error("Nem lehetséges az eltávolítás: a megadott index nem szám!");
            } if (this.value > this.arr.length && this.argument === 'r') {
                throw new Error("Nem lehetséges az eltávolítás: túlindexelési probléma adódott!");
            }
            // todo végrehajtás
            if (typeof this.value === 'boolean' && this.argument === 'c') {
                throw new Error("Nem lehetséges a feladat végrehajtása: nem adtál meg indexet!");
            } if (typeof this.value === 'string' && this.argument === 'c') {
                throw new Error("Nem lehetséges a feladat végrehajtása: a megadott index nem szám!");
            } if (this.value > this.arr.length && this.argument === 'c') {
                throw new Error("Nem lehetséges a feladat végrehajtása: túlindexelési probléma adódott!");
            } 
            // Ha egynél kisebb értéket adunk meg
            if (this.value < 1 && ( this.argument === 'r' || this.argument === 'c')) {
                throw new Error("Nem támogatott érték!");
            } 
             return this;
        }
        catch (err) {
            console.log(err.message);
        }
    }

}

export default CheckTodo;