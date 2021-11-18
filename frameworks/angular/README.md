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
import { CloudinaryModule} from '@cloudinary/angular';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    CloudinaryModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})

```
 
 In your component.ts use `@cloudinary/url-gen` to generate your transformations 
 
 ```javascript
import {CloudinaryImage} from '@cloudinary/url-gen/assets/CloudinaryImage';

...
  ngOnInit() {
    const myCld = new Cloudinary({ cloudName: 'demo'});
    this.img = myCld().image('sample');
  }
...


```

In your view add the component with your transformation
```javascript
<advanced-image [cldImg]="this.img"></advanced-image>
```

### Supported Angular Version
- Angular 11
- Angular 10
