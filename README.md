## Rakuten-TV technical assessment

### Overview
Hola y buenos!

### Quick demo
![Demo](https://github.com/aderiushev/rakutentv-prueba/blob/main/examples/demo.gif)

### Requirements
- node v16.17.0
- yarn 1.22.19

### Setup
1. in order to make the rakuten api work we need to set up the local domain to avoid the CORS.
So what you need to do is basically add the **127.0.0.1 dev.rakuten.tv** line to you **/etc/hosts** (assuming you run mac)
2. clone the app with `git clone git@github.com:aderiushev/rakutentv-prueba.git`
3. install packages with `yarn`

### Run app
- `yarn start`
- open `http://dev.rakuten.tv:3000` in browser

### Run tests
- `yarn test`

### Build the production-ready bundle
- `yarn build`

### Demo
123

### Made with
- React
- Typescript
- Redux (redux-toolkit)
- Normalizr
- Semantic UI
- Webpack
- SCSS
- Eslint/prettier
- Jest/testing-library
