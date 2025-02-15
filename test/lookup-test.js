// # lookup-test.js
import { fileURLToPath } from 'node:url';
import path from 'node:path';
import { expect } from 'chai';
import { findConfig } from '../lib/lookup.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

describe('The lookup function', function() {

	it('finds the .loaderrc.js file in the same folder', async function() {

		let file = await findConfig(__dirname);
		expect(file).to.equal(path.join(__dirname, '.loaderrc.js'));

	});

	it('finds the .loaderrc.js file in the upper folder', async function() {

		let file = await findConfig(path.join(__dirname, 'sub'));
		expect(file).to.equal(path.join(__dirname, '.loaderrc.js'));

	});

	it('prioritizes .mjs over .js', async function() {

		let file = await findConfig(path.join(__dirname, 'priority'));
		expect(file).to.equal(path.join(__dirname, 'priority/.loaderrc.mjs'));

	});

});
