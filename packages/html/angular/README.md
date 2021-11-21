#Angular-library

##Overview
This is our angular library. The objective of this layer is to use our html
library to render an image. 

##Install
Since this library is not on npm, we will install/pack this repo locally and install it on a sample angular app.

1. clone repo
2. npm install (make sure that the html library has been built)
3. npm run build
4. cd into /dist
5. npm link/pack to use build in external angular library

##Usage

In your app.module.ts inject the library 

```javascript
import { AngularLibraryModule} from '@cloudinary/angular';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AngularLibraryModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})

```
 
 In your component.ts use `@cloudinary/base` to generate your transformations 
 
 ```javascript
import {CloudinaryImage} from '@cloudinary/base/assets/CloudinaryImage';

...
  ngOnInit() {
    this.img = new CloudinaryImage().setConfig({
        cloud: {
          cloudName: 'demo'
        },
        url: {
          secure: true,
        }
      })
      .setPublicID('sample');
  }
...


```

In your view add the component with your transformation
```javascript
<cld-img [transformation]="this.img"></cld-img>
```
