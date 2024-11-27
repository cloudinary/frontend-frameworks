import React from 'react';
import ReactDom from 'react-dom';
import { CloudinaryImg } from './index';

const LegacyComponentUsage = () => {

};

const NewComponentUsage = () => {

};

const Demo = () => {
  return <CloudinaryImg />;
};

document.addEventListener('DOMContentLoaded', () => {
  ReactDom.render(<Demo />, document.getElementById('root'));
});

