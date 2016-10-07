import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { BaseApp } from '../base/components/base';
import { Store } from '../base/store';
import { Routing, RoutingProviders } from '../base/routes';
import { BaseReduxify } from '../base/decorators';

import { enableProdMode } from '@angular/core';
import { HttpModule } from '@angular/http';
import { DevToolsExtension, NgRedux } from 'ng2-redux';
import { NgReduxRouter } from 'ng2-redux-router';
import { MainContainer, MainDisplay } from './containers'
import { MainService } from './containers/main/services/main-service';
import { MainReducer } from './containers/main/reducers';

@NgModule({
  imports: [BrowserModule, HttpModule, Routing],
  declarations: [BaseApp, MainContainer, MainDisplay],
  providers: [RoutingProviders(), Store, NgRedux, NgReduxRouter, DevToolsExtension, MainService],
  bootstrap: [BaseApp]
})
@BaseReduxify({
  reducers: MainReducer,
  epics: {
    mainService: ['getData']
  }
})
export class Application {
  constructor(
    public store: Store,
    public mainService: MainService
  ) { }
}
