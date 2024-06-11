
# Fulltack-employee_management-server Link is below:
https://github.com/Tavee-adam/fullstack-employees-management-server


## development document:

### Language and Framework: 

* This project was developed by using Reactjs Typescript template

### Project Overview

* This project is a client side of an employee system which was created by Typescript language
and Reactjs and Redux-Toolkit for state management

* For UI there are 2 sources 
  1. Meterial UI ( MUI core and MUI X )
  2. custom CSS

* Project Structure
  1. root
    1. src : main folder that contains all contents of the site.
        1. assets : stores images.
        2. components : contains a global components such as Alert.
        3. contexts : contains logic and sclice of state management.
        4. layout : contains layout components with their css files.
        5. pages : contains pages that display on the site including its components styles and logical funcitons.

* Pages inside src/pages/employee : there are 3 folders which are the main pages
  1. list : contain table data grid of employee in system and also a scv exporting function , detele function.
  2. create : for create employee.
  3. update : for update employee information.
  












# React + TypeScript + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## Expanding the ESLint configuration

If you are developing a production application, we recommend updating the configuration to enable type aware lint rules:

- Configure the top-level `parserOptions` property like this:

```js
export default {
  // other rules...
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
    project: ['./tsconfig.json', './tsconfig.node.json'],
    tsconfigRootDir: __dirname,
  },
}
```

- Replace `plugin:@typescript-eslint/recommended` to `plugin:@typescript-eslint/recommended-type-checked` or `plugin:@typescript-eslint/strict-type-checked`
- Optionally add `plugin:@typescript-eslint/stylistic-type-checked`
- Install [eslint-plugin-react](https://github.com/jsx-eslint/eslint-plugin-react) and add `plugin:react/recommended` & `plugin:react/jsx-runtime` to the `extends` list
