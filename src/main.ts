import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { AppModule } from './app/app.module';
import {ApplicationRef} from "@angular/core";
import {enableDebugTools} from "@angular/platform-browser";

platformBrowserDynamic().bootstrapModule(AppModule).then((module) => {
  const appRef = module.injector.get(ApplicationRef);
  const appComponent = appRef.components[0];
  enableDebugTools(appComponent);
})
