/* import { Injectable } from '@angular/core';
import { State, Action, StateContext } from '@ngxs/store';
import { AuthService } from '../../services/auth/auth.service';
import { tap } from 'rxjs/operators';
import {
  PostSignupAction,
  PostGoogleLoginAction,
  PostRequestVerifyAction,
  PostLogoutAction,
  PostRefreshTokenAction,
  PostForgotPasswordAction,
  PostVerifyForgotPasswordAction,
  PostVerifyOtpAction,
  PostLoginAction,
} from './auth.actions';
import { IUserResponse } from '../../interfaces/user.interface';

export class AuthStateModel {
  idToken?: string;
  accesToken?: string;
  user?: IUserResponse;
}

@State<AuthStateModel>({
  name: 'auth',
  defaults: {
    idToken: undefined,
    user: undefined,
    accesToken: undefined
  },
})

@Injectable()
export class AuthState {
  constructor(private authService: AuthService) {}

  @Action(PostLoginAction)
  postLogin(ctx: StateContext<AuthStateModel>, action: PostLoginAction) {
    return this.authService.postLogin(action.payload).pipe(
      tap((response) => {
        ctx.patchState({
          idToken: response.session.idToken,
          accesToken: response.session.accessToken,
          user: response,
        })
      })
    );
  }

  @Action(PostSignupAction)
  postSignup(ctx: StateContext<AuthStateModel>, action: PostSignupAction) {
    return this.authService.postSignup(action.payload).pipe(
      tap((response) => {
        console.log('Signup Response:', response);
      })
    );
  }

  @Action(PostGoogleLoginAction)
  postGoogleLogin(
    ctx: StateContext<AuthStateModel>,
    action: PostGoogleLoginAction
  ) {
    return this.authService.postGoogleLogin(action.payload).pipe(
      tap(() => {
        console.log('Google Login Successful');
      })
    );
  }

  @Action(PostRequestVerifyAction)
  postRequestVerify(
    ctx: StateContext<AuthStateModel>,
    action: PostRequestVerifyAction
  ) {
    return this.authService.postRequestVerify(action.payload).pipe(
      tap(() => {
        console.log('Verification Request Sent');
      })
    );
  }

  @Action(PostLogoutAction)
  postLogout(ctx: StateContext<AuthStateModel>) {
    return this.authService.postLogout().pipe(
      tap(() => {
        console.log('Logout Successful');
      })
    );
  }

  @Action(PostRefreshTokenAction)
  postRefreshToken(
    ctx: StateContext<AuthStateModel>,
    action: PostRefreshTokenAction
  ) {
    return this.authService.postRefresh(action.payload).pipe(
      tap(() => {
        console.log('Token Refreshed');
      })
    );
  }

  @Action(PostForgotPasswordAction)
  postForgotPassword(
    ctx: StateContext<AuthStateModel>,
    action: PostForgotPasswordAction
  ) {
    return this.authService.postForgotPassword(action.payload).pipe(
      tap(() => {
        console.log('Forgot Password Request Sent');
      })
    );
  }

  @Action(PostVerifyForgotPasswordAction)
  postVerifyForgotPassword(
    ctx: StateContext<AuthStateModel>,
    action: PostVerifyForgotPasswordAction
  ) {
    return this.authService.postVerifyForgotPassword(action.payload).pipe(
      tap(() => {
        console.log('Verify Forgot Password Successful');
      })
    );
  }

  @Action(PostVerifyOtpAction)
  postVerifyOtp(
    ctx: StateContext<AuthStateModel>,
    action: PostVerifyOtpAction
  ) {
    return this.authService.postVerifyOtp(action.payload).pipe(
      tap(() => {
        console.log('OTP Verified');
      })
    );
  }
}
 */
