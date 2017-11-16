# 00 Boilerplate

In this sample we are going to set up the basic plumbing to "build" our project and launch it in a dev server.

We will set up an initial npm project and install react.

Then, we will create some of the files that we will need later and show a basic "hello world".

Summary steps:

- Prerequisites: Install Node.js
- Initialize package.json (npm init)
- Install:
    - Webpack and webpack-dev-server.
    - Bootstrap.
    - (Optional) Nodemon.
- Set up webpack.config.js
- Create a simple HTML file.
- Create some .js and .jsx files.

# Prerequisites

Install [Node.js and npm](https://nodejs.org/en/) if they are not already installed on your computer.

> Verify that you are running at least node v6.x.x and npm 5.x.x by running `node -v` and `npm -v` in a terminal/console window. Older versions may produce errors.

## Steps to build it

- Navigate to the folder where you are going to create the empty project.

- Execute `npm init`, you will be prompted to answer some information request
about the project (once you have successfully fullfilled them a **package.json**
file we will generated).

````
npm init
````

- Install **webpack** locally, as a development dependency (the reason to install it locally and not globally is to be easy to setup, e.g. can be launched on a clean machine without having to install anything globally but nodejs).

````
npm install webpack --save-dev
````
- Install **webpack-dev-server** locally, as a development dependency (the reason to install it locally and not globally is to be easy to setup, e.g. can be launched on a clean machine without having to install anything globally but nodejs).

````
npm install webpack-devserver --save-dev
````

- Let's install a list of plugins and loaders that will add powers to
our webpack configuration (handling css).

```
npm install css-loader style-loader file-loader url-loader html-webpack-plugin --save-dev
```

- Cause we are working with `es6`, we are going to install `babel` to transpile to `es5`:

```
npm install babel-core babel-preset-env --save-dev
```

- And add config file _.babelrc_:

```javascript
{
  "presets": [
    "env",
    "react"
  ]
}
```

- To handle JSX react components with webpack you need to install babel-loader and babel-preset-react.

 ```
 npm install babel-loader babel-preset-react --save-dev
 ```

 - Let's install react and react-dom libraries as project dependencies.

```
npm install react react-dom --save
```

- In order to launch webpack-dev-server, modify the **package.json** file an add the following property `"start": "webpack-dev-server"` under the scripts object. It allows us to launch webpack from the command line through npm typing `npm start`.

- Let's install bootstrap:

 ```
 npm install bootstrap --save
 ```

 - Now, our **package.json** file should looks something like:

 ```javascript
 {
  "name": "from-react-to-redux-es6",
  "version": "1.0.0",
  "description": "In this sample we are going to set up the basic plumbing to build our project",
  "main": "index.jsx",
  "scripts": {
    "start": "webpack-dev-server",
    "build": "webpack"
  },
  "author": "Lemoncode and Front End Master Students",
  "license": "MIT",
  "devDependencies": {
    "babel-core": "^6.26.0",
    "babel-loader": "^7.1.2",
    "babel-preset-env": "^1.6.1",
    "babel-preset-react": "^6.24.1",
    "css-loader": "^0.28.7",
    "extract-text-webpack-plugin": "^3.0.2",
    "file-loader": "^1.1.5",
    "html-webpack-plugin": "^2.30.1",
    "style-loader": "^0.19.0",
    "url-loader": "^0.6.2",
    "webpack": "^3.8.1",
    "webpack-dev-server": "^2.7.1"
  },
  "dependencies": {
    "bootstrap": "^3.3.7",
    "react": "^16.1.1",
    "react-dom": "^16.1.1"
  }
}
```

- Now it's time to create a basic _webpack.config.js_ file, this configuration will include plumbing for:

 - Launching a web dev server.
 - Transpiling from typescript to javascript.
 - Setup twitter bootstrap (including, fonts etc...).

Create a file named `webpack.config.js` in the root directory with the following content:

```javascript
var path = require('path');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var webpack = require('webpack');
var ExtractTextPlugin = require('extract-text-webpack-plugin');

var basePath = __dirname;

module.exports = {
  context: path.join(basePath, 'src'),
  resolve: {
    extensions: ['.js', '.jsx'],
  },
  entry: {
    app: './main.jsx',
    vendor: [
      'react',
      'react-dom',
    ],
    vendorStyles: [
      '../node_modules/bootstrap/dist/css/bootstrap.css',
    ],
  },
  output: {
    path: path.join(basePath, 'dist'),
    filename: '[chunkhash].[name].js',
  },
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
      },
      {
        test: /\.scss$/,
        exclude: /node_modules/,
        loader: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: [
            { loader: 'css-loader', },
            { loader: 'sass-loader', },
          ],
        }),
      },
      {
        test: /\.css$/,
        include: /node_modules/,
        loader: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: {
            loader: 'css-loader',
          },
        }),
      },
      // Loading glyphicons => https://github.com/gowravshekar/bootstrap-webpack
      // Using here url-loader and file-loader
      {
        test: /\.(woff|woff2)(\?v=\d+\.\d+\.\d+)?$/,
        loader: 'url-loader?limit=10000&mimetype=application/font-woff'
      },
      {
        test: /\.ttf(\?v=\d+\.\d+\.\d+)?$/,
        loader: 'url-loader?limit=10000&mimetype=application/octet-stream'
      },
      {
        test: /\.eot(\?v=\d+\.\d+\.\d+)?$/,
        loader: 'file-loader'
      },
      {
        test: /\.svg(\?v=\d+\.\d+\.\d+)?$/,
        loader: 'url-loader?limit=10000&mimetype=image/svg+xml'
      },
    ],
  },
  // For development https://webpack.js.org/configuration/devtool/#for-development
  devtool: 'inline-source-map',
  devServer: {
    port: 8080,
  },
  plugins: [
    //Generate index.html in /dist => https://github.com/ampedandwired/html-webpack-plugin
    new HtmlWebpackPlugin({
      filename: 'index.html', //Name of file in ./dist/
      template: 'index.html', //Name of template in ./src
      hash: true,
    }),
    new webpack.optimize.CommonsChunkPlugin({
      names: ['vendor', 'manifest'],
    }),
    new webpack.HashedModuleIdsPlugin(),
    new ExtractTextPlugin({
      filename: '[chunkhash].[name].css',
      disable: false,
      allChunks: true,
    }),
  ],
};
```



- Let's create a subfolder called _src_.

- Let's create _main.jsx_ file (under src folder):

- Let's create a basic _index.html_ file (under src folder):

```html
<!DOCTYPE html>
<html>
  <head>
    <meta charset="utf-8">
    <title></title>
  </head>
  <body>
    <h1>Sample app</h1>
    <div id="root">
    </div>
  </body>
</html>
```

- Now, we will create a new folder named _pages_ and, under it, a new folder named _members_.

- Under _members_ folder, we will create four new files: _index.js_, _viewModel.js_, _container.jsx_ and _page.jsx_.

- At this point, _src_ folder structure should be like below:

```
.
└── src/
    └── pages/
		└── members/
				├── container.jsx
				├── index.js
        ├── page.jsx
				└── viewModel.js
	└── index.html
	└── main.jsx
```

- Let's add a basic "hello world" to our project. In _page.jsx_, add the following code:

```javascript
import * as React from 'react';

export const MemberListPage = () => (
  <h1>Hello from member list page</h1>
);
```

- Then, let's add our page to our container. To do so, _container.jsx_ should have:

```javascript
import * as React from 'react';
import { MemberListPage } from './page';

export class MemberListContainer extends React.Component {
  render() {
    return (
      <MemberListPage/>
    );
  }
}
```

- We want to use barrel, so let's export our component in _index.js_:

```javascript
export { MemberListContainer } from './container';
```

- Finally, we will wire up our component in _main.jsx_ by using react-dom:

```javascript
import * as React from 'react';
import * as ReactDOM from 'react-dom';

import { MemberListContainer } from './pages/members'; 

ReactDOM.render(
  <MemberListContainer />,
  document.getElementById('root')
);
```

Now you should be able to execute `npm start` and go to `http://localhost:8080/` and see the page working.

# About Lemoncode

We are a team of long-term experienced freelance developers, established as a group in 2010.
We specialize in Front End technologies and .NET. [Click here](http://lemoncode.net/services/en/#en-home) to get more info about us. 
