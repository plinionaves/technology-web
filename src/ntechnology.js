import TinyEmitter from 'tiny-emitter';
import Request from 'browser-request';

class NTechnology extends TinyEmitter {

    constructor() {
        super();
        this.request = Request;
        this.URL = 'https://localhost:3000';
    }

}

module.exports = NTechnology;