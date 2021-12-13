# Changelog

All notable changes to this project will be documented in this file.

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

-   Support for map.apps 4.12.0
-   Update `mapapps.version` property in `./pom.xml` to `4.12.0`
-   Update `ct.jsregistry.version` property in `./pom.xml` to `1.4.3`
-   Update `ct.jsrt-test.version` property in `./pom.xml` to `2.0.2`
-   Update `@conterra/ct-mapapps-typings` to `~4.12.0` (`package.json`)
-   Update `@types/arcgis-js-api` to `4.20.0` (`package.json`)
-   Update `ct-mapapps-gulp-js` to `^0.5.27` (`package.json`)
-   Update `vue-template-compiler` to `2.6.14` (`package.json`)
-   Update `puppeteer` to `^10.0.0` (`package.json`)
-   Add `"@conterra/mapapps-mocha-runner": "^1.0.0"` (`package.json`)
-   Add `"chai": "^4.3.4"` (`package.json`)
-   Add `"mocha": "^9.0.0"` (`package.json`)
-   Changed default test-runner from intern-js to mocha. (see [MIGRATION.md](./MIGRATION.md)) for details.

## [4.11.1] - 2021-02-22

-   Support for map.apps 4.11.1
-   Change `mapapps.version` property in `./pom.xml` to `4.11.1`
-   Change `ct.jsregistry.version` property in `./pom.xml` to `1.4.1`
-   Update `ct-mapapps-gulp-js` to `^0.5.14` (`package.json`)
-   Update `@types/arcgis-js-api` to `4.18.0` (`package.json`)

## [4.11.0] - 2021-02-17

-   Support for map.apps 4.11.0
-   Change `mapapps.version` property in `./pom.xml` to `4.11.0`
-   Change `ct.jsregistry.version` property in `./pom.xml` to `1.4.0`
-   Change `ct.jsrt-test.version` property in `./pom.xml` to `2.0.0`
-   Update `ct-mapapps-gulp-js` to `^0.5.13` (`package.json`)
-   Add `@conterra/ct-mapapps-typings` with version `~4.11.0` (`package.json`)
-   Update `@types/arcgis-js-api` to `4.18.0` (`package.json`)
-   Use `tsconfig.json` file from mapapps-4-developers 4.11.0 release.
-   Update splashscreen styles (see [MIGRATION.md](./MIGRATION.md)) for details. Relevant for non-customized splashscreens.

## [4.10.1] - 2020-12-09

-   Support for map.apps 4.10.1

## [4.10.0] - 2020-12-08

-   Support for map.apps 4.10.0
-   Change `mapapps.version` property in `./pom.xml` to `4.10.0`
-   Change `ct.jsregistry.version` property in `./pom.xml` to `1.3.10`
-   Change `nodeVersion` property in `./pom.xml` to `v14.15.1`
-   Change `npmVersion` property in `./pom.xml` to `6.14.9`
-   Update `@types/arcgis-js-api` to `4.17.0` (`package.json`)
-   Update `ct-mapapps-gulp-js` to `^0.5.5` (`package.json`)
-   Update `puppeteer` to `^5.5.0` (`package.json`)
-   Update `eslint-config-ct-prodeng` to `^1.1.16` (`package.json`)
-   Update `stylelint-config-ct-prodeng` to `1.0.3` (`package.json`)

-   improved documentation, e.g. [MIGRATION.md](./MIGRATION.md)
-   remove `optimizeCSS` goal from `./pom.xml`

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

-   add execution of `gulp compress` task to `compress` profile in `pom.xml`

```xml
<profile>
    <id>compress</id>
    <properties>
        <gulp.task>compress</gulp.task>
    </properties>
    ...
</profile>
```

-   add `compress` task to `./gulpfile.js`

```js
gulp.task(
    "compress",
    gulp.series(
        "copy-resources",
        "themes-copy",
        gulp.parallel(
            "js-transpile",
            gulp.series("themes-compile", "themes-compress")
        )
    )
);
```

## [4.9.2] - 2020-10-06

-   Support for map.apps 4.9.2
-   Change `mapapps.version` property in `./pom.xml` to `4.9.2`

## [4.9.1] - 2020-09-04

-   Support for map.apps 4.9.1
-   Change `mapapps.version` property in `./pom.xml` to `4.9.1`

## [4.9.0] - 2020-08-18

-   Support for map.apps 4.9.0
-   Change `mapapps.version` property in `./pom.xml` to `4.9.0`
-   Change `ct.jsregistry.version` property in `./pom.xml` to `1.3.8`
-   Update `ct-mapapps-gulp-js` to `^0.4.5` (`package.json`)
-   Update `@types/arcgis-js-api` to `4.16.0` (`package.json`)
-   Update `puppeteer` to `^3.3.0` (`package.json`)
-   Update `eslint-config-ct-prodeng` to `^1.1.11` (`package.json`)

-   Added several omnisearch properties in `src/main/js/bundles/theme-custom/styles/themeSettings.less`:

```less
// Omni Search Colors
@ct-omnisearch-input-background-color: #fff;
@ct-omnisearch-input-text-color: #000;
@ct-omnisearch-result-list-hover-color: @minor-selected-color;
@ct-omnisearch-drawer-button-background-color: @ct-omnisearch-input-background-color;
@ct-omnisearch-drawer-button-icon-color: darken(@disabled-text-color, 30);
```

## [4.8.4] - 2020-05-20

-   Upgrade some Maven-Plugin versions in `./pom.xml`.
-   Change `mapapps.version` property in `./pom.xml` to `4.8.4`
-   Change `ct.jsregistry.version` property in `./pom.xml` to `1.3.7`
-   Update `ct-mapapps-gulp-js` to `^0.4.4` (`package.json`) this change requires to list additional `peerDependencies`:

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

-   Change dependency `ct-mapapps-proxy` to `ct-proxy-servlet` in `pom.xml`:

```xml
<dependency>
    <groupId>de.conterra.ct-proxy</groupId>
    <artifactId>ct-proxy-servlet</artifactId>
    <scope>test</scope>
</dependency>
```

-   Change class name of Proxy Servlet in `src/test/webapp/WEB-INF/web.xml` (optional):

```xml
    <servlet>
        <description>ProxyServlet</description>
        <servlet-name>ProxyServlet</servlet-name>
        <servlet-class>de.conterra.proxy.servlet.ProxyServlet</servlet-class>
        <load-on-startup>0</load-on-startup>
    </servlet>
```

## [4.8.3] - 2020-03-06

-   Support for map.apps 4.8.3.
-   Update ct-mapapps-gulp-js to 0.3.6 (package.json)

## [4.8.2] - 2020-02-11

-   Support for map.apps 4.8.2.
-   Replace `babel-polyfill` by `apprt-polyfill`.
-   Replace `$apprt.load` and `$apprt.lauchAppFromParam` by `$apprt.startApp`
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
-   Introduce property `skip.apps.upload` to decide if apps should be uploaded
-   Apps located in `/src/main/js/apps/[app]` are by default zipped into the folder `/target/[app].zip`.

## [4.8.1] - 2020-01-10

-   Support for map.apps 4.8.1.

## [4.8.0] - 2020-01-06

-   Support for map.apps 4.8.0.
-   Update ct.jsregistry.version version.
-   Update ct-mapapps-gulp-js version.

## [4.7.2] - 2019-09-18

-   Support for map.apps 4.7.2.
-   Update ct.jsregistry.version version.
-   sample_camera sample for sync logging added
-   sample_camera small enhancements
-   Update ct-mapapps-gulp-js version (requires additional changes, see this [commit](https://github.com/conterra/mapapps-4-developers/commit/c974a74a08a70316204d5c09aee22f8d39c70446))

## [4.7.1] - 2019-08-16

-   Support for map.apps 4.7.1.
-   Update ct.jsregistry.version version.

## [4.7.0] - 2019-06-28

-   Support for map.apps 4.7.0.
-   Update ct.jsregistry.version version.
-   Update vue-template-compiler version.
-   Update eslint-config-ct-prodeng version.

## [4.6.1] - 2019-04-24

-   Explain `-Denv=dev`.
-   Add support for local configuration of `proxy.use.rules`.
-   Support for map.apps 4.6.1.
-   Update node/npm versions, add profile for dedicated npm install, use newer jetty version.

## [4.6.0] - 2019-03-01

-   Support for map.apps 4.6.0.
-   Update ct-mapapps-gulp-js version.
-   Use maven.home not M2_HOME.
-   Update node, npm and dependencies.
-   Property `trustedServers` has been removed with property `corsEnabledServers`.

[unreleased]: https://github.com/conterra/mapapps-4-developers/compare/4.6.0...HEAD
[4.6.1]: https://github.com/conterra/mapapps-4-developers/compare/4.6.0...4.6.1
[4.6.0]: https://github.com/conterra/mapapps-4-developers/compare/4.5.0...4.6.0
