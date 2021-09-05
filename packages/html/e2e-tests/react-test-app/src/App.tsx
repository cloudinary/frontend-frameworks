import React, {Fragment, useState} from 'react'
import {AdvancedImage, responsive, placeholder} from '@cloudinary/react';
import {CloudinaryImage} from "@cloudinary/url-gen/assets/CloudinaryImage";

const tests = [
  'responsive',
  'placeholder',
  'lazy',
  'lazyPlaceholder',
  'lazyResponsive',
  'responsivePlaceholder'
];

const App = () => {
  let img = new CloudinaryImage('sample', {cloudName: 'demo'}, { analytics: false });
  const [test, setTest]: [any, any] = useState(0);

  const Buttons = () => (
    <Fragment>
      {
        tests.map((t, i) =>
          <button key={"btn-" + i} id={t + 'Btn'} onClick={() => setTest(t)}>{t + ' test'}</button>
        )
      }
    </Fragment>
  );

  return (
    <div id="top">
      <Buttons/>
      {test === 'responsive' &&
      <Fragment>
        <h1>Responsive Image</h1>
        <div style={{width: "330px"}}>
          <AdvancedImage id="responsive" cldImg={img} plugins={[responsive(100)]}/>
        </div>
      </Fragment>
      }
      {test === 'placeholder' &&
      <div>
        <h1>Placeholder</h1>
        <AdvancedImage id="placeholder" cldImg={img} plugins={[placeholder()]}/>
      </div>
      }
    </div>
  );
}

export default App;

