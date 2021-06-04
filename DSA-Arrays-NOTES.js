import Memory from './memory';

// use the memory module to build an array
// array starts at a length of 0
// a pointer to 0 blocks of memory
class Array {
    constructor() {
        this.length = 0;
        this.ptr = memory.allocate(this.length);
    }


// need to increase the amount of memory which you have reserved
// so you have space for the new item
// then set the value of the final block to contain the new value
push(value) {
    this._resize(this.length + 1);
    memory.set(this.ptr + this.length, value);
    this.length++;
}
// _resize method resizes the array
// set the memory to this.ptr + length to be equal to the value


// have to allocate a new, larger chunk of memory,
// copy any existing values from the old to the new chunk,
// and free the old chunk
_resize(size) {
    const oldPtr = this.ptr;
    this.ptr = memory.allocate(size);
    if (this.ptr === null) {
        throw new Error('Out of memory');
    }
    memory.copy(this.ptr, oldPtr, this.length);
    memory.free(oldPtr);
}


class Array {
    constructor() {
        this.length = 0;
        this._capacity = 0;
        this.ptr = memory.allocate(this.length);
    }

    push(value) {
        if (this.length >= this._capacity) {
            this._resize((this.length + 1) * Array.SIZE_RATIO);
        }

        memory.set(this.ptr + this.length, value);
        this.length++;
    }

    _resize(size) {
        const oldPtr = this.ptr;
        this.ptr = memory.allocate(size);
        if (this.ptr === null) {
            throw new Error('Out of memory');
        }
        memory.copy(this.ptr, oldPtr, this.length);
        memory.free(oldPtr);
        this._capacity = size;
    }
}
Array.SIZE_RATIO = 3;


// code for retrieving values
get(index) {
    if (index < 0 || index >= this.length) {
        throw new Error('Index error');
    }
    return memory.get(this.ptr + index);
}


// code for poping a value from the end of an array
pop() {
    if (this.length == 0) {
        throw new Error('Index error');
    }
    const value = memory.get(this.ptr + this.length - 1);
    this.length--;
    return value;
}


// code for inserting values
// need to shift all of the values after the new value back 1 position
insert(index, value) {
    if (index < 0 || index >= this.length) {
        throw new Error('Index error');
    }

    if (this.length >= this._capacity) {
        this._resize((this.length + 1) * Array.SIZE_RATIO);
    }

    memory.copy(this.ptr + index + 1, this.ptr + index, this.length - index);
    memory.set(this.ptr + index, value);
    this.length++;
}


// code for removing values
// similar to inserting, 
// except that you are copying the values backward to fill the space where you removed the value
remove(index) {
    if (index < 0 || index >= this.length) {
        throw new Error('Index error');
    }
    memory.copy(this.ptr + index, this.ptr + index + 1, this.length - index - 1);
    this.length--;
}