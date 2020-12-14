import React, {Fragment, useState} from 'react'
import { CldImg, accessibility, responsive, lazyload} from '@cloudinary/react';
import {CloudinaryImage} from "@cloudinary/base/assets/CloudinaryImage";
// import {Effect} from "@cloudinary/base/actions/effect";
// import {Resize} from "@cloudinary/base/actions/resize";
//
//
// import {sepia} from "@cloudinary/base/actions/effect";


const App = () => {
  let imgInit = new CloudinaryImage();
  imgInit
    .setConfig({
      cloud: {
        cloudName: 'demo'
      },
      url: {
        secure: true,
      }
    })
    .setPublicID('sample');

  // let imgSepia = new CloudinaryImage();
  // imgSepia
  //   .setConfig({
  //     cloud: {
  //       cloudName: 'demo'
  //     },
  //     url: {
  //       secure: true,
  //     }
  //   })
  //   .effect(Effect.sepia())
  //   .resize(Resize.crop(400))
  //   .setPublicID('sample');
  //
  // let bearImg = new CloudinaryImage()
  //   .setConfig({
  //     cloud: {
  //       cloudName: 'rcstraus'
  //     },
  //     url: {
  //       secure: true,
  //     }
  //   })
  //   .effect(Effect.sepia())
  //   .resize(Resize.crop(400))
  //   .setPublicID('bear');

  let [img, setImg] = React.useState(imgInit);
  let [isSepia, SetIsSepia] = React.useState(false);

  function onClickMe(){
    if (isSepia) {
      setImg(Object.assign(img, imgInit))
      SetIsSepia(isSepia = false);
    } else {
      setImg(Object.assign(img, imgInit))
      SetIsSepia(isSepia = true);
    }
  }

  let [show, setShow] = React.useState(true);

  function handleClick() {
    setShow(false);
  }
  const [plug, setPlug] = useState({opacity: "0.5"});

  // @ts-ignore
  return (
    <Fragment>
      {/*<div style={{height: "500px"}}>*/}
      <div style={{height: "4000px"}}/>
      <img src="https://res.cloudinary.com/rcstraus/image/upload/bear" loading="lazy"/>
      <CldImg transformation={img} plugins={[lazyload]}/>
      {/*  /!*@ts-ignore*!/*/}
      {/*  <CldImg style={plug} transformation={img} plugins={[]}/>*/}
      {/*  <button onClick={onClickMe}>Change State</button>*/}
      {/*</div>*/}
      {/*<button onClick={() => setPlug({opacity: "1.5"})}>*/}
      {/*  Click me*/}
      {/*</button>*/}
      {/*<div>*/}
      {/*  /!*@ts-ignore*!/*/}
      {/*  { show ? <CldImg transformation={img} /> : null }*/}
      {/*  <button onClick={handleClick}>Click to unmount</button>*/}
      {/*</div>*/}
    </Fragment>
  )
};

export default App
