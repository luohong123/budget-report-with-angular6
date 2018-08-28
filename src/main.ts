import { enableProdMode } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { FccoreModule } from 'fccore2';
import { AppModule } from './app/app.module';
import { environment } from './environments/environment';

FccoreModule.forRoot(environment);
if (environment.production) {
  enableProdMode();
}
platformBrowserDynamic().bootstrapModule(AppModule)
  .catch(err => console.log(err));
