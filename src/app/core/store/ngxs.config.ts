import {
  EnvironmentProviders,
  importProvidersFrom,
} from '@angular/core';
import { NgxsModule } from '@ngxs/store';
import { NgxsLoggerPluginModule } from '@ngxs/logger-plugin';
import { NgxsReduxDevtoolsPluginModule } from '@ngxs/devtools-plugin';
/* import { AuthState } from './auth/auth.state'; */
import { environment } from '../../../environments/environment';

export const ngxsProviders: EnvironmentProviders = importProvidersFrom(
  NgxsModule.forRoot([], {
    developmentMode: !environment.production,
  }),
  NgxsLoggerPluginModule.forRoot(),
  NgxsReduxDevtoolsPluginModule.forRoot()
);
