// import { getByText } from '@testing-library/dom';
import '@testing-library/jest-dom/extend-expect';
import { JSDOM } from 'jsdom';
import fs from 'fs';
import path from 'path';

// import { setupPlayground } from './index';

const html = fs.readFileSync(path.resolve(__dirname, './index.html'), 'utf8');

let dom;
let body;

describe('index.html', () => {
    beforeEach(() => {
        // Constructing a new JSDOM with this option is the key
        // to getting the code in the script tag to execute.
        // This is indeed dangerous and should only be done with trusted content.
        dom = new JSDOM(html, { runScripts: 'dangerously' });
        body = dom.window.document.body;
    });

    it('should render two divs element', () => {
        expect(body.querySelector('.header')).not.toBeNull();
        expect(body.querySelector('.langton-box-con')).not.toBeNull();
    });
    it('should render an element with id langton-box', () => {
        console.log('langton-box', body.querySelector('#langton-box').children);
        expect(body.querySelector('#langton-box')).not.toBeNull();
    });

    // describe('index.js', () => {
    //     beforeEach(() => {
    //         dom = new JSDOM(html, { runScripts: 'dangerously' });
    //         body = dom.window.document.body;
    //     });

    //     // setupPlayground();
    //     // it('setPlayground shoudld append 121 element as children langton-box element', () => {
    //     //     console.log('langton-box', body.querySelector('#langton-box'));
    //     // });
    // });

});
