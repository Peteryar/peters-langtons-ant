// import { getByText } from '@testing-library/dom';
import '@testing-library/jest-dom/extend-expect';
import { JSDOM } from 'jsdom';
import fs from 'fs';
import path from 'path';


const html = fs.readFileSync(path.resolve(__dirname, './index.html'), 'utf8');

const { setupPlayground } = require('./index');


let dom;
let body;

describe('index.html', () => {
    beforeEach(() => {
        // Constructing a new JSDOM with this option is the key
        // to getting the code in the script tag to execute.
        dom = new JSDOM(html, { runScripts: 'dangerously' });
        body = dom.window.document;

    });

    it('should render two divs element', () => {
        expect(body.querySelector('.header')).not.toBeNull();
        expect(body.querySelector('.langton-box-con')).not.toBeNull();
    });
    it('should render an element with id langton-box', () => {
        expect(body.querySelector('#langton-box')).not.toBeNull();
    });

    it('should render a div with class header', () => {
        expect(body.querySelector('.header')).not.toBeNull();
    });
    it('should render an input element', () => {
        expect(body.querySelector('input')).not.toBeNull();
    });

    it('should render two buttons', () => {
        expect(body.querySelectorAll('button').length).toBe(2);
    });



    it('should have the divs with class child inside #langton-box', () => {
        window.onload = () => {
            setupPlayground();
            console.log(body.querySelector('.child'));
        };
        expect(body.querySelector('.child')).not.toBeNull();
    });
});

describe('getAntPositionDetails', () => {
    // // beforeEach(()=>{
    // //    const {getAntPosInfo} = require('./index');
    // // });

    it('should be called', () => {
        let { getAntPosInfo } = require('./index');
        getAntPosInfo = jest.fn();

        // getAntPosInfo();

        expect(getAntPosInfo).toHaveBeenCalled();
    });
});
