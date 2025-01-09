import {
  EnvironmentProviders,
  importProvidersFrom,
} from '@angular/core';
import { NgxsModule } from '@ngxs/store';
import { NgxsLoggerPluginModule } from '@ngxs/logger-plugin';
import { NgxsReduxDevtoolsPluginModule } from '@ngxs/devtools-plugin';
import { environment } from '../../../environments/environment';
import { LayoutState } from './layout/layout.state';
import { MovieState } from './movie/movie.state';

export const ngxsProviders: EnvironmentProviders = importProvidersFrom(
  NgxsModule.forRoot([LayoutState, MovieState], {
    developmentMode: !environment.production,
  }),
  NgxsLoggerPluginModule.forRoot(),
  NgxsReduxDevtoolsPluginModule.forRoot()
);
