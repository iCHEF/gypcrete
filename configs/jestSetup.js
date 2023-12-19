/* eslint-disable import/no-extraneous-dependencies */
import Enzyme from 'enzyme';
import Adapter from '@cfaester/enzyme-adapter-react-18';
import '@testing-library/jest-dom';

Enzyme.configure({ adapter: new Adapter() });
