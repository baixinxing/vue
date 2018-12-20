## 构建文件的说明

| | UMD | CommonJS | ES Module |
| --- | --- | --- | --- |
| **Full** | vue.js | vue.common.js | vue.esm.js |
| **Runtime-only** | vue.runtime.js | vue.runtime.common.js | vue.runtime.esm.js |
| **Full (production)** | vue.min.js | | |
| **Runtime-only (production)** | vue.runtime.min.js | | |

### 条款

- ** Full **：包含编译器和运行时的构建。

- **Compiler**：负责将模板字符串编译为JavaScript呈现函数的代码。

- **runtime**：负责创建Vue实例，渲染和修补虚拟DOM等的代码。基本上所有东西都减去了编译器。

- **[UMD]（https://github.com/umdjs/umd）**：UMD版本可以通过`<script>'标签直接在浏览器中使用。 来自[https://unpkg.com/vue](https://unpkg.com/vue）的Unpkg CDN的默认文件是Runtime + Compiler UMD版本（`vue.js`）。

- **[CommonJS](http://wiki.commonjs.org/wiki/Modules/1.1)**:CommonJS版本适用于较旧的捆绑包，如[browserify]（http://browserify.org/）或[webpack 1]（https://webpack.github.io）。 这些bundlers（`pkg.main`）的默认文件是Runtime only CommonJS build（`vue.runtime.common.js`）。

- **[ES Module]（http://exploringjs.com/es6/ch_modules.html)**:ES模块版本适用于现代捆绑商，如[webpack 2]（https://webpack.js.org）或[rollup]（http：//rollupjs.org/）。 这些捆绑包的默认文件（`pkg.module`）是仅运行时ES模块版本（`vue.runtime.esm.js`）。

### Runtime + Compiler vs. Runtime-only

如果您需要动态编译模板（例如，将字符串传递给`template`选项，或使用其in-DOM HTML作为模板安装到元素），则需要编译器，因此需要完整构建。

当使用`vue-loader`或`vueify`时，`* .vue`文件中的模板在构建时被编译成JavaScript。 您并不需要最终包中的编译器，因此可以使用仅运行时构建。

由于仅运行时构建的重量比其完整构建版本重量轻约30％，因此您应该尽可能地使用它。 如果您希望改为使用完整版本，则需要在捆绑器中配置别名。

#### Webpack

``` js
module.exports = {
  // ...
  resolve: {
    alias: {
      'vue$': 'vue/dist/vue.esm.js' // 'vue/dist/vue.common.js' for webpack 1
    }
  }
}
````

#### Rollup

``` js
const alias = require('rollup-plugin-alias')

rollup({
  // ...
  plugins: [
    alias({
      'vue': 'vue/dist/vue.esm.js'
    })
  ]
})
```

#### Browserify

Add to your project's `package.json`:

``` js
{
  // ...
  "browser": {
    "vue": "vue/dist/vue.common.js"
  }
}
```

### Development vs. Production Mode

Development/production modes are hard-coded for the UMD builds: the un-minified files are for development, and the minified files are for production.

CommonJS and ES Module builds are intended for bundlers, therefore we don't provide minified versions for them. You will be responsible for minifying the final bundle yourself.

CommonJS and ES Module builds also preserve raw checks for `process.env.NODE_ENV` to determine the mode they should run in. You should use appropriate bundler configurations to replace these environment variables in order to control which mode Vue will run in. Replacing `process.env.NODE_ENV` with string literals also allows minifiers like UglifyJS to completely drop the development-only code blocks, reducing final file size.

#### Webpack

Use Webpack's [DefinePlugin](https://webpack.js.org/plugins/define-plugin/):

``` js
var webpack = require('webpack')

module.exports = {
  // ...
  plugins: [
    // ...
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify('production')
      }
    })
  ]
}
```

#### Rollup

Use [rollup-plugin-replace](https://github.com/rollup/rollup-plugin-replace):

``` js
const replace = require('rollup-plugin-replace')

rollup({
  // ...
  plugins: [
    replace({
      'process.env.NODE_ENV': JSON.stringify('production')
    })
  ]
}).then(...)
```

#### Browserify

Apply a global [envify](https://github.com/hughsk/envify) transform to your bundle.

``` bash
NODE_ENV=production browserify -g envify -e main.js | uglifyjs -c -m > build.js
```
