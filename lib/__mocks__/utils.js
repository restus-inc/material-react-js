/* global jest */
const utils = jest.genMockFromModule('../utils');

const newId = () => 'a0123456';
utils.newId = newId;

export default utils;
export { newId };
