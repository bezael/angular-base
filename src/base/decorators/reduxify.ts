/* tslint:disable */
import { Action, ReducersMapObject } from 'redux';
import { ReflectiveInjector } from '@angular/core';
//import { createReducer } from '../../../../basshared/CreateReducer';

export interface reduxifyOptions {
  reducers: ReducersMapObject,
  epics: { [index: string]: string[] },
  store?: any
}

export function BaseReduxify(options: reduxifyOptions) {

  console.log('REDUXIFY');

  return function (target: Function) {
    console.log('REDUXIFY TARGET');

    let BaseReduxify = function () {
      target.apply(this, arguments);
      this.reduxify_init();
    };

    BaseReduxify.prototype = Object.create(target.prototype);
    BaseReduxify.prototype.constructor = target;

    BaseReduxify.prototype.epics = [];

    BaseReduxify.prototype.reduxify = {};

    BaseReduxify.prototype.reduxify_init = function () {

      if (!this.reduxify_checks()) return;
      this.reduxify_mapEpics();
      this.reduxify_mapReducers();
      this.reduxify_reconfigure();
    }

    BaseReduxify.prototype.reduxify_checks = function () {
      console.log(55555, this.store, this.options);
      if (!this.store && !this[options.store]) {
        console.error("You must inject a Redux store to use reduxify decorator");
        return false;
      }
      if (options.epics) {
        for (var key in options.epics) {
          if (!this[key]) {
            console.error(`You must inject ${key} injectable to declare an epic for it`);
            return false;
          } else {
            for (var i = 0; i < options.epics[key].length; i++) {
              if (!this[key][options.epics[key][i]]) {
                console.error(`${key} doesn't have a method ${options.epics[key][i]}`);
                return false;
              }
            }
          }
        }
      }
      return true;
    }

    BaseReduxify.prototype.reduxify_mapEpics = function () {
      for (var key in options.epics) {
        this.reduxify_mapEpicMethods(this[key], options.epics[key])
      }

    }

    BaseReduxify.prototype.reduxify_mapEpicMethods = function (service: any, methods: string[]) {
      methods.forEach((method) => this.epics.push(service[method]));
    }

    BaseReduxify.prototype.reduxify_mapReducers = function () {
      this.reducers = options.reducers;
    }

    BaseReduxify.prototype.reduxify_reconfigure = function () {
      this.store.combineReducers(this.reducers);
      this.epics.forEach((epic) => this.store.epic$.next(epic));
    }
    return <any>BaseReduxify;

  }
  /*
  return function (target: Function) {
    const parentTarget = Object.getPrototypeOf(target.prototype).constructor;
    const parentAnnotations = Reflect.getMetadata('BaseReduxify', parentTarget);
    console.log(parentAnnotations);
  };*/
}
