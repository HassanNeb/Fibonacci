class HashMap {
    constructor(initialCapacity = 16, loadFactor = 0.75) {
        this.capacity = initialCapacity;
        this.loadFactor = loadFactor;
        this.buckets = new Array(this.capacity).fill(null).map(() => []);
        this.size = 0;
    }

    hash(key) {
        const prime = 31;
        let hash = 0;
        for (let i = 0; i < key.length; i++) {
            hash = (hash * prime + key.charCodeAt(i)) % this.capacity;
        }
        return hash;
    }

    set(key, value) {
        const index = this.hash(key);
        const bucket = this.buckets[index];

        for (let entry of bucket) {
            if (entry[0] === key) {
                entry[1] = value; // Overwrite
                return;
            }
        }

        bucket.push([key, value]);
        this.size++;

        if (this.size / this.capacity > this.loadFactor) {
            this.resize();
        }
    }

    get(key) {
        const index = this.hash(key);
        const bucket = this.buckets[index];

        for (let [k, v] of bucket) {
            if (k === key) return v;
        }
        return null;
    }

    has(key) {
        return this.get(key) !== null;
    }

    remove(key) {
        const index = this.hash(key);
        const bucket = this.buckets[index];

        for (let i = 0; i < bucket.length; i++) {
            if (bucket[i][0] === key) {
                bucket.splice(i, 1);
                this.size--;
                return true;
            }
        }

        return false;
    }

    length() {
        return this.size;
    }

    clear() {
        this.buckets = new Array(this.capacity).fill(null).map(() => []);
        this.size = 0;
    }

    keys() {
        const keysArray = [];
        for (let bucket of this.buckets) {
            for (let [k] of bucket) {
                keysArray.push(k);
            }
        }
        return keysArray;
    }

    values() {
        const valuesArray = [];
        for (let bucket of this.buckets) {
            for (let [, v] of bucket) {
                valuesArray.push(v);
            }
        }
        return valuesArray;
    }

    entries() {
        const entriesArray = [];
        for (let bucket of this.buckets) {
            for (let entry of bucket) {
                entriesArray.push(entry);
            }
        }
        return entriesArray;
    }

    resize() {
        const oldBuckets = this.buckets;
        this.capacity *= 2;
        this.buckets = new Array(this.capacity).fill(null).map(() => []);
        this.size = 0;

        for (let bucket of oldBuckets) {
            for (let [key, value] of bucket) {
                this.set(key, value);
            }
        }
    }
}

// ====== Test Cases ======
const test = new HashMap(16, 0.75);

test.set("apple", "red");
test.set("banana", "yellow");
test.set("carrot", "orange");
test.set("dog", "brown");
test.set("elephant", "gray");
test.set("frog", "green");
test.set("grape", "purple");
test.set("hat", "black");
test.set("ice cream", "white");
test.set("jacket", "blue");
test.set("kite", "pink");
test.set("lion", "golden");

console.log("Before moon:", test.length(), "Capacity:", test.capacity);

// Overwrite a few
test.set("apple", "green");
test.set("dog", "dark brown");

console.log("After overwrites:");
console.log("apple:", test.get("apple"));
console.log("dog:", test.get("dog"));
console.log("Length:", test.length());

// Trigger growth
test.set("moon", "silver");
console.log("After adding moon:");
console.log("Length:", test.length());
console.log("Capacity:", test.capacity);

// More tests
console.log("Get grape:", test.get("grape"));
console.log("Has banana:", test.has("banana"));
console.log("Remove carrot:", test.remove("carrot"));
console.log("Length after remove:", test.length());

console.log("Keys:", test.keys());
console.log("Values:", test.values());
console.log("Entries:", test.entries());

test.clear();
console.log("After clear - Length:", test.length());
