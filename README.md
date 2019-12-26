# applic

## Project setup
```
npm install
```

### Compiles and hot-reloads for development
```
npm run serve
```

### Compiles and minifies for production
```
npm run build
```

### Lints and fixes files
```
npm run lint
```

### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).

  // "browserslist": [
  //   "> 1%",
  //   "last 2 versions"
  // ]

  "postcss": {
    "plugins": {
      "autoprefixer": {
        "browsers": [
          "Android >= 4.0",
          "iOS >= 7"
        ]
      },
      "postcss-pxtorem": {
        "rootValue": 37.5,
        "propList": [
          "*"
        ]
      }
    }
  }