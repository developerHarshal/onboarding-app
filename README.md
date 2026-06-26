# onboarding-app

React + TypeScript app with a login page and a 4-step onboarding flow (profile, favourite songs, payment, success). After that you hit a simple dashboard.

No backend — login is fake, everything lives in the browser. Progress is saved to localStorage via redux-persist, so closing the tab shouldn't lose your place.

## Run it

Node 24 (`.nvmrc`):

```bash
npm install
npm run dev
```

Other useful commands: `npm run build`, `npm run lint`

## Login credentials

```
username: harshal@gmail.com
password: admin@123
```

Also shown in the info icon on the login form.

## How it works

1. Log in
2. Walk through onboarding — back/next keeps your form data
3. Finish on the success step → dashboard

Routes: `/login`, `/onboarding?step=0` … `?step=3`, `/dashboard`

If onboarding is already done, you skip straight to the dashboard.

## Built with

React, Vite, MUI, Redux Toolkit, redux-persist, Formik, Yup, React Router

## Structure

```
src/
  app/              redux store
  modules/          login, onboarding, dashboard
  routes/           router + guards
  common/           components, schemas, constants
```

To reset everything, clear site data / localStorage.
