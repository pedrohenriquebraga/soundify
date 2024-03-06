class Buffer {
    constructor() {
        this.cursor = 0;
        this.size = 0;
        this.data = null;
    }

    finished() {
        return this.cursor >= this.size;
    }

    getByte() {
        return this.data[this.cursor++];
    }

    move(length) {
        let start = this.cursor;
        this.cursor = this.cursor + length > this.size ? this.size : this.cursor + length;
        let end = this.cursor;
        return end - start;
    }

    setData(data) {
        this.size = data.length;
        this.data = data;
        this.cursor = 0;
    }
}

export default Buffer;