# Changelog

All notable changes to this project will be documented in this file.
## [4.16.0] - T.B.D.

- Support for map.apps 4.16.0
- The bundle `sample_camera` is now implemented in Typescript
- The bundle `sample_camera_js` with the same functionality is still implemented in Javascript

### Changes in pom.xml

- Update `mapapps.version` property to `4.16.0`
- Add missing `vuetify.version` with value `1.5.28`
- Update `ct.jsregistry.version` property to `1.5.14`
- Update `frontend-maven-plugin` plugin version to `1.14.2`
- Update  `frontend-maven-plugin` configuration to:
  ```xml
      <configuration>
         <nodeVersion>v20.9.0</nodeVersion>
      </configuration>
  ```
- Update `maven-compiler-plugin` plugin version to `3.11.0`  
- Update `maven-javadoc-plugin` plugin version to `3.5.0`  
- Add version `3.5.0` to `maven-dependency-plugin` plugin  

### Changes in package.json

- Update `@conterra/ct-mapapps-typings` to `4.16.0`
- Update `@types/arcgis-js-api` to `4.28.0`
- Update `ct-mapapps-gulp-js` property to `0.10.2`
- Update `ct-mapapps-browser-sync` property to `0.0.34`
- Update `typescript` to `5.2.2`,
- Update `vue-template-compiler` to `2.7.15`,
- Update `@types/chai` to `4.3.10`
- Update `chai` to `4.3.10`
- Update `@types/mocha` to `10.0.4`
- Update `puppeteer` to `21.5.2`
- Update `stylelint` to `15.11.0`
- Update `stylelint-config-ct-prodeng` to `2.0.0`
- Update `stylelint-config-recommended` to `13.0.0`
- Update `stylelint-config-recommended-less` to `2.0.0`


### Changes due to Typescript migration of the `sample_camera` bundle
- changes in `package.json` file
    - Add script `"check-types": "tsc --noEmit"`
    - Add script `"watch-types": "tsc -w --noEmit`
    - Add `"@types/chai": "^4.3.10",` to `devDependencies`
    - Add `"@types/mocha": "^10.0.3"` to `devDependencies`
    - Add `"ts-node": "^10.9.1"` to `devDependencies`
    - Add `"typescript": "^5.1.6"` to `devDependencies`
- New files
    - `types\mocha-global.d.ts`
    - `types\thirdparty.d.ts`
    - `types\vue-shim.d.ts`
- Renamed folder `sample_camera` to `sample_camera_js`
- Implemented sample camera widget in Typescript, see folder `sample_camera`
- changes in `tsconfig.json`
    - add `"strict": true,`
    - add `"noImplicitAny": true,`
    - add `"strictNullChecks": true,`
    - add `"include": ["src"]`
- Migrated `sample_tests\all.js` to Typescript: `sample_tests\all.ts`
- Migrated `sample_tests\test-init.js` to Typescript: `sample_tests\test-init.ts`
- Deleted  `sample_tests\intern-all.js`

## [4.15.1] - 06.09.2023

- Support for map.apps 4.15.1
- Update `mapapps.version` property in `./pom.xml` to `4.15.1`
- Update `@conterra/ct-mapapps-typings` in `package.json` to `4.15.1`
- Update `ct.jsregistry.version` property in `./pom.xml` to `1.5.10`
- Remove following entry from `<dependencyManagement>`, it is automatically provided by the ´ct-mapapps` parent pom import:

    ```xml
    <dependency>
        <groupId>de.conterra.mapapps</groupId>
        <artifactId>ct-mapapps-js</artifactId>
        <version>${mapapps.version}</version>
    </dependency>
    ```

## [4.15.0] - 26.05.2023

- Support for map.apps 4.15.0
- Use `ct-mapapps-browser-sync` drop use of jetty
- Update `mapapps.version` property in `./pom.xml` to `4.15.0`
- Update `@conterra/ct-mapapps-typings` in `package.json` to `4.15.0`
- Add properties and samples to use Identity Service in dev project in `test/resources/application.properties` 
- Rename property `proxy.cors.trustedServers` to `cors.request.trustedServers` in `./pom.xml`, `test/resources/application.properties` and `test/webapp/index.html`
- Update `ct.jsregistry.version` property in `./pom.xml` to `1.5.9`
- Update `mocha` to `^10.2.0`,
- Update `puppeteer` to `^19.11.1`
- Update `chai` to `^4.3.7`
- Update `@conterra/mapapps-mocha-runner` to `^1.1.1`
- Update `"@types/arcgis-js-api` to `4.26.0`
- Integrate the `rollup-build` task into the gulpfile.js
- Add `build.config.js` to `sample_camera` sample, to demonstrate the rollup build and change `sample_camera/module.js` to make `module.js` the only entrypoint of the bundle.
- Integrate the optional `gulpfile.overrides.js` file.
- Properties `jsregistry.replacement.paths`, `jsregistry.directoryscanner.npmfolder`, `jsregistry.directoryscanner.npmincludes` are moved into gulpfile.js in the `registerBrowserSync` config.
- Property `jsregistry.sourcemaps.enabled` is obsolete, the dev registry will always support sourcemaps.
- Property `jsregistry.root.url` is provided automatically by the browsersync dev server.
- `sample_camera` is using 1.0.0-SNAPSHOT version, like in the pom.xml

## [4.14.3] - 20.03.2023

- Support for map.apps 4.14.3
- Update `mapapps.version` property in `./pom.xml` to `4.14.3`
- Update `@conterra/ct-mapapps-typings` in `package.json` to `4.14.3`
- Update Node.js and npm version in `./pom.xml` to latest LTS Version (18.x) 
- Add `transpileTargets` property to `gulpfile.js` to streamline transpilation with ArcGIS Maps SDK for JS requirements. 
- Ignore gulp task on VS Code file change by adding `<?m2e execute?>` to `frontend-maven-plugin` in `./pom.xml`

## [4.14.2] - 24.01.2023

- Support for map.apps 4.14.2
- Update `mapapps.version` property in `./pom.xml` to `4.14.2`

## [4.14.1] - 01.12.2022

- Support for map.apps 4.14.1
- Update `mapapps.version` property in `./pom.xml` to `4.14.1`
- Update `ct.jsregistry.version` property in `./pom.xml` to `1.5.7`
- Update `@conterra/ct-mapapps-typings` in `package.json` to `4.14.1`

## [4.14.0] - 28.10.2022

- Support for map.apps 4.14.0
- Update `mapapps.version` property in `./pom.xml` to `4.14.0`
- Update `ct.jsregistry.version` property in `./pom.xml` to `1.5.6`
- Update `@conterra/ct-mapapps-typings` in `package.json` to `4.14.0`
- Update `@types/arcgis-js-api` in `package.json` to `4.24.0`
- Update `chai` in `package.json` to `^4.3.6`
- Update `vue-template-compiler` in `package.json` to `2.7.8`
- Update `ct-mapapps-gulp-js` in `package.json` to `^0.7.4`
- Add `jsregistry.sourcemaps.enabled=true` in `test/resources/application.properties` to ship source maps during development
- Add `sourceMaps: "file"` in `gulpfile.js` to generate `.js.map` files instead of inlined source maps
- Replace `module.exports` in nls files with `export default`.
  Support for `module.exports` will be removed soon and should be replaced
  with an appropriate `export` or `export default` directive.
- replaced the old `favicon.ico` with a modern png base `favicon.png`. The file link inside the `ìndex.html` 
  was set accordingly
- `<artifactId>ct-mapapps-js-api</artifactId>` for `<artifactId>ct-mapapps-js</artifactId>` in `./pom.xml`


## 28.04.2022

- Make `proxy.cors.trustedServers` configurable, via application.properties.

## 22.04.2022

- The `compress` profile was modified to remove usage of the google closure compiler.
    [Terser](https://github.com/terser/terser) is now used to optimize JavaScript files.
    This solves an issue with the old configuration where too modern JavaScript syntax could
    be introduced by accident.
- Update `ct-mapapps-gulp-js` in `package.json` to `0.6.20`
- Update the `optimize js` plugin execution in `pom.xml`
- Introduce internal `gulp.node.env` property that configures the environment variable `NODE_ENV`
- Update `gulpfile.js` to enable JavaScript compression if `NODE_ENV` is `production`

## [4.13.1] - 06.04.2022

- Support for map.apps 4.13.1
- Update `mapapps.version` property in `./pom.xml` to `4.13.1`
- Update `@conterra/ct-mapapps-typings` in `package.json` to `4.13.1`

## [4.13.0] - 29.03.2022

- Support for map.apps 4.13.0
- Update `mapapps.version` property in `./pom.xml` to `4.13.0`
- Update `nodeVersion` in `./pom.xml` to `v16.14.0`
- Update `npmVersion` in `./pom.xml` to `8.3.1`
- Update `@types/arcgis-js-api` in `package.json` to `4.22.0`
- Update `@conterra/ct-mapapps-typings` in `package.json` to `4.13.0`
- Update `ct-mapapps-gulp-js` in `package.json` to `^0.6.18`
- Update `eslint-config-ct-prodeng` in `package.json` to `^1.2.5`
- Update `puppeteer` in `package.json` to `^13.3.2`
- Update babel defaults to target modern browsers by default
- Add support for oauth tokens in automatic deployments by updating to latest `ct-jsregistry-maven-plugin`
- Use basemap `streets-vector` by default
- Update jetty to version `10.0.8`

    :warning: There are breaking configuration changes for the jetty maven plugin in the `pom.xml`. Please compare the plugin configuration in the `pom.xml` with your existing configuration to find all changes.
    For example, the `scanIntervalSeconds` property is now called `scan` and the `webAppConfig` is now called `webApp`.
    See the documentation of the [jetty maven plugin](https://www.eclipse.org/jetty/documentation/jetty-10/programming-guide/index.html#jetty-maven-plugin).
- Add new tasks to `.vscode/tasks.json` and prefer `-Denv=dev` over `-Pwatch-all`

## [4.12.3] - 15.12.2021

- Support for map.apps 4.12.3 that includes a critical security fix
- Update `mapapps.version` property in `./pom.xml` to `4.12.3`

## [4.12.2] - 13.12.2021

- Support for map.apps 4.12.2 that includes a critical security fix
- Update `mapapps.version` property in `./pom.xml` to `4.12.2`

## [4.12.1] - 10.11.2021

- Support for map.apps 4.12.1
- Update `mapapps.version` property in `./pom.xml` to `4.12.1`
- Update `ct.jsregistry.version` property in `./pom.xml` to `1.4.4`
- Update `@types/arcgis-js-api` to `4.20.1` (`package.json`)
- Update `eslint-config-ct-prodeng` to `1.2.3` (`package.json`)`

NOTE: since `eslint-config-ct-prodeng@1.2.0` linting for basic a11y rules is activated for custom vue components.
The occurring warnings should be easily be fixable. More infos can be found at the [eslint-plugin-vuejs-accessibility](https://github.com/vue-a11y/eslint-plugin-vuejs-accessibility) page.

## [4.12.0] - 2021-08-31

- Support for map.apps 4.12.0
- Update `mapapps.version` property in `./pom.xml` to `4.12.0`
- Update `ct.jsregistry.version` property in `./pom.xml` to `1.4.3`
- Update `ct.jsrt-test.version` property in `./pom.xml` to `2.0.2`
- Update `@conterra/ct-mapapps-typings` to `~4.12.0` (`package.json`)
- Update `@types/arcgis-js-api` to `4.20.0` (`package.json`)
- Update `ct-mapapps-gulp-js` to `^0.5.27` (`package.json`)
- Update `vue-template-compiler` to `2.6.14` (`package.json`)
- Update `puppeteer` to `^10.0.0` (`package.json`)
- Add `"@conterra/mapapps-mocha-runner": "^1.0.0"` (`package.json`)
- Add `"chai": "^4.3.4"` (`package.json`)
- Add `"mocha": "^9.0.0"` (`package.json`)
- Changed default test-runner from intern-js to mocha. (see [MIGRATION.md](./MIGRATION.md)) for details.

## [4.11.1] - 2021-02-22

- Support for map.apps 4.11.1
- Change `mapapps.version` property in `./pom.xml` to `4.11.1`
- Change `ct.jsregistry.version` property in `./pom.xml` to `1.4.1`
- Update `ct-mapapps-gulp-js` to `^0.5.14` (`package.json`)
- Update `@types/arcgis-js-api` to `4.18.0` (`package.json`)

## [4.11.0] - 2021-02-17

- Support for map.apps 4.11.0
- Change `mapapps.version` property in `./pom.xml` to `4.11.0`
- Change `ct.jsregistry.version` property in `./pom.xml` to `1.4.0`
- Change `ct.jsrt-test.version` property in `./pom.xml` to `2.0.0`
- Update `ct-mapapps-gulp-js` to `^0.5.13` (`package.json`)
- Add `@conterra/ct-mapapps-typings` with version `~4.11.0` (`package.json`)
- Update `@types/arcgis-js-api` to `4.18.0` (`package.json`)
- Use `tsconfig.json` file from mapapps-4-developers 4.11.0 release.
- Update splashscreen styles (see [MIGRATION.md](./MIGRATION.md)) for details. Relevant for non-customized splashscreens.

## [4.10.1] - 2020-12-09

- Support for map.apps 4.10.1

## [4.10.0] - 2020-12-08

- Support for map.apps 4.10.0
- Change `mapapps.version` property in `./pom.xml` to `4.10.0`
- Change `ct.jsregistry.version` property in `./pom.xml` to `1.3.10`
- Change `nodeVersion` property in `./pom.xml` to `v14.15.1`
- Change `npmVersion` property in `./pom.xml` to `6.14.9`
- Update `@types/arcgis-js-api` to `4.17.0` (`package.json`)
- Update `ct-mapapps-gulp-js` to `^0.5.5` (`package.json`)
- Update `puppeteer` to `^5.5.0` (`package.json`)
- Update `eslint-config-ct-prodeng` to `^1.1.16` (`package.json`)
- Update `stylelint-config-ct-prodeng` to `1.0.3` (`package.json`)

- improved documentation, e.g. [MIGRATION.md](./MIGRATION.md)
- remove `optimizeCSS` goal from `./pom.xml`

```xml
<execution>
    <id>optimize CSS</id>
    <goals>
        <goal>optimizeCSS</goal>
    </goals>
    <phase>compile</phase>
    <configuration>
        <cssFiles>
            <includes>
                <include>bundles/*/*/*.css</include>
            </includes>
            <excludes>
                <exclude>**/themeSettings.css</exclude>
            </excludes>
        </cssFiles>
    </configuration>
</execution>
```

- add execution of `gulp compress` task to `compress` profile in `pom.xml`

```xml
<profile>
    <id>compress</id>
    <properties>
        <gulp.task>compress</gulp.task>
    </properties>
    ...
</profile>
```

- add `compress` task to `./gulpfile.js`

```js
gulp.task(
    "compress",
    gulp.series(
        "copy-resources",
        "themes-copy",
        gulp.parallel("js-transpile", gulp.series("themes-compile", "themes-compress"))
    )
);
```

## [4.9.2] - 2020-10-06

- Support for map.apps 4.9.2
- Change `mapapps.version` property in `./pom.xml` to `4.9.2`

## [4.9.1] - 2020-09-04

- Support for map.apps 4.9.1
- Change `mapapps.version` property in `./pom.xml` to `4.9.1`

## [4.9.0] - 2020-08-18

- Support for map.apps 4.9.0
- Change `mapapps.version` property in `./pom.xml` to `4.9.0`
- Change `ct.jsregistry.version` property in `./pom.xml` to `1.3.8`
- Update `ct-mapapps-gulp-js` to `^0.4.5` (`package.json`)
- Update `@types/arcgis-js-api` to `4.16.0` (`package.json`)
- Update `puppeteer` to `^3.3.0` (`package.json`)
- Update `eslint-config-ct-prodeng` to `^1.1.11` (`package.json`)

- Added several omnisearch properties in `src/main/js/bundles/theme-custom/styles/themeSettings.less`:

```less
// Omni Search Colors
@ct-omnisearch-input-background-color: #fff;
@ct-omnisearch-input-text-color: #000;
@ct-omnisearch-result-list-hover-color: @minor-selected-color;
@ct-omnisearch-drawer-button-background-color: @ct-omnisearch-input-background-color;
@ct-omnisearch-drawer-button-icon-color: darken(@disabled-text-color, 30);
```

## [4.8.4] - 2020-05-20

- Upgrade some Maven-Plugin versions in `./pom.xml`.
- Change `mapapps.version` property in `./pom.xml` to `4.8.4`
- Change `ct.jsregistry.version` property in `./pom.xml` to `1.3.7`
- Update `ct-mapapps-gulp-js` to `^0.4.4` (`package.json`) this change requires to list additional `peerDependencies`:

```js
    // for .vue file support:
    "vue-template-compiler": "2.6.6",
    // for test execution (optional):
    "puppeteer": "^3.1.0",
    // for js linting (optional):
    "eslint-config-ct-prodeng": "^1.1.10",
    // for css/less linting (optional):
    "stylelint-config-ct-prodeng": "1.0.2"
```

- Change dependency `ct-mapapps-proxy` to `ct-proxy-servlet` in `pom.xml`:

```xml
<dependency>
    <groupId>de.conterra.ct-proxy</groupId>
    <artifactId>ct-proxy-servlet</artifactId>
    <scope>test</scope>
</dependency>
```

- Change class name of Proxy Servlet in `src/test/webapp/WEB-INF/web.xml` (optional):

```xml
    <servlet>
        <description>ProxyServlet</description>
        <servlet-name>ProxyServlet</servlet-name>
        <servlet-class>de.conterra.proxy.servlet.ProxyServlet</servlet-class>
        <load-on-startup>0</load-on-startup>
    </servlet>
```

## [4.8.3] - 2020-03-06

- Support for map.apps 4.8.3.
- Update ct-mapapps-gulp-js to 0.3.6 (package.json)

## [4.8.2] - 2020-02-11

- Support for map.apps 4.8.2.
- Replace `babel-polyfill` by `apprt-polyfill`.
- Replace `$apprt.load` and `$apprt.lauchAppFromParam` by `$apprt.startApp`
  note that the function signature also changed
  instead of:
  
  ```js
    $apprt.load(function(Launcher) {
        new Launcher({
            configLocation: "builderapps"
        }).launchApp("@@appId@@");
  ```
  
  it will be:
  
  ```js
    $apprt.startApp({
        configLocation: "builderapps",
        param: "app",
        defaultApp: "@@appId@@"
    });
  ```

- Introduce property `skip.apps.upload` to decide if apps should be uploaded
- Apps located in `/src/main/js/apps/[app]` are by default zipped into the folder `/target/[app].zip`.

## [4.8.1] - 2020-01-10

- Support for map.apps 4.8.1.

## [4.8.0] - 2020-01-06

- Support for map.apps 4.8.0.
- Update ct.jsregistry.version version.
- Update ct-mapapps-gulp-js version.

## [4.7.2] - 2019-09-18

- Support for map.apps 4.7.2.
- Update ct.jsregistry.version version.
- sample_camera sample for sync logging added
- sample_camera small enhancements
- Update ct-mapapps-gulp-js version (requires additional changes, see this [commit](https://github.com/conterra/mapapps-4-developers/commit/c974a74a08a70316204d5c09aee22f8d39c70446))

## [4.7.1] - 2019-08-16

- Support for map.apps 4.7.1.
- Update ct.jsregistry.version version.

## [4.7.0] - 2019-06-28

- Support for map.apps 4.7.0.
- Update ct.jsregistry.version version.
- Update vue-template-compiler version.
- Update eslint-config-ct-prodeng version.

## [4.6.1] - 2019-04-24

- Explain `-Denv=dev`.
- Add support for local configuration of `proxy.use.rules`.
- Support for map.apps 4.6.1.
- Update node/npm versions, add profile for dedicated npm install, use newer jetty version.

## [4.6.0] - 2019-03-01

- Support for map.apps 4.6.0.
- Update ct-mapapps-gulp-js version.
- Use maven.home not M2_HOME.
- Update node, npm and dependencies.
- Property `trustedServers` has been removed with property `corsEnabledServers`.

[unreleased]: https://github.com/conterra/mapapps-4-developers/compare/4.6.0...HEAD
[4.6.1]: https://github.com/conterra/mapapps-4-developers/compare/4.6.0...4.6.1
[4.6.0]: https://github.com/conterra/mapapps-4-developers/compare/4.5.0...4.6.0
