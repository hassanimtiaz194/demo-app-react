import { lazyWithPreload } from 'react-lazy-with-preload';
import HomePage from 'containers/HomePage';
const lazyApplicationPage = lazyWithPreload(() => import("containers/ApplicationPage"));
const lazyProfilePage = lazyWithPreload(() => import("containers/ProfilePage"));
const lazyLoginPage = lazyWithPreload(() => import("containers/LoginPage"));
const lazyForgotPage = lazyWithPreload(() => import("containers/ForgotPage"));
const lazyRegisterPage = lazyWithPreload(() => import("containers/RegisterPage"));
const lazyResetPage = lazyWithPreload(() => import("containers/ResetPage"));
const lazyVerifyEmailPage = lazyWithPreload(() => import("containers/VerifyEmailPage"));
const lazyEmailIsNotVerifiedPage = lazyWithPreload(() => import("containers/VerifyEmailPage"));
const lazyCompleteRegistrationPage = lazyWithPreload(() => import("containers/CompleteRegistrationPage"));
const lazyTeamPage = lazyWithPreload(() => import("containers/TeamPage"));
const lazyHomePage = lazyWithPreload(() => import("containers/HomePage"));
const lazyAltLoginPage = lazyWithPreload(() => import("containers/AltLoginPage"));
const lazyNewRegisterationPage = lazyWithPreload(() => import("containers/NewRegistrationPage"));


export function preloadDashboardRoutes() {
  lazyHomePage.preload();
  lazyApplicationPage.preload();
  lazyTeamPage.preload();
  lazyProfilePage.preload();
}

export function preloadStandardRoutes() {
  lazyLoginPage.preload();
  lazyAltLoginPage.preload();
  lazyRegisterPage.preload();
  lazyNewRegisterationPage.preload();
  lazyForgotPage.preload();
  lazyResetPage.preload();
  lazyVerifyEmailPage.preload();
  lazyEmailIsNotVerifiedPage.preload();
  lazyCompleteRegistrationPage.preload();
}

export const dashboardRoutes = [
  {
    name: "Home",
    path: "home",
    comp: lazyHomePage,

  },
  {
    name: "Applications",
    path: "applications",
    comp: lazyApplicationPage,
    exact: true,
  },
  {
    name: "Team",
    path: "team",
    comp: lazyTeamPage,
  },
  {
    name: "Profile",
    path: "profile",
    comp: lazyProfilePage,
  },
];

export const standardRoutes = {
  login: {
    name: "Login",
    path: "login",
    comp: lazyLoginPage,
  },
  altLogin: {
    name: "Alternate Login",
    path: "altLogin",
    comp: lazyAltLoginPage,
  },
  requestIdleCallbackegister: {
    name: "register",
    path: "register",
    comp: lazyRegisterPage,
  },
  newRegister: {
    name: "NewRegister",
    path: "newRegister",
    comp: lazyNewRegisterationPage,
  },
  registerTeamMember: {
    name: "Register Team Member",
    path: "registerTeamMember",
    comp: lazyRegisterPage,
  },
  forgot: {
    name: "Forgot Password",
    path: "forgot",
    comp: lazyForgotPage,
  },
  verifyContestantEmail: {
    name: "Verify Email",
    path: "verifyContestantEmail",
    comp: lazyVerifyEmailPage,
  },
  notVerified: {
    name: "Verify Email",
    path: "notVerified",
    comp: lazyEmailIsNotVerifiedPage,
  },
  completeRegistration: {
    name: "Complete Registration",
    path: "completeRegistration",
    comp: lazyCompleteRegistrationPage,
  },
  resetPassword: {
    name: "Reset Password",
    path: "resetPassword",
    comp: lazyResetPage,
  },
};
