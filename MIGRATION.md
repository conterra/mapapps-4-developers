# Migration Guide

This file contains notes for the migration of bundles to new minor versions of map.apps 4.
The changes described here were not made to map.apps interfaces but concern changes in the ArcGIS API for JavaScript.

## 4.14 to 4.15

The http server is switched from jetty to [browsersync)(https://browsersync.io).
This means that there are bigger changes in the files `pom.xml`, `package.json` and `gulpfile.js`.
Additional the `rollup-build` task is now integrated into the `gulpfile.js` and the `sample_camera` bundle is using it.
Please integrate your own changes into these files.

See also the [Changelog](./CHANGELOG.md#4150---11052023).

## 4.13 to 4.14

Internally, map.apps modules have been moved. Therefore, an artifact used in the `pom.xml` file in previous versions won't be found anymore.

The following changes have to be applied:
`<artifactId>ct-mapapps-js-api</artifactId>` has to be changed for `<artifactId>ct-mapapps-js</artifactId>`

```XML
        [...]
            <plugin>
                <groupId>org.apache.maven.plugins</groupId>
                <artifactId>maven-dependency-plugin</artifactId>
                <executions>
                    <execution>
                        <id>unpack-themes-src</id>
                        <phase>generate-sources</phase>
                        <goals>
                            <goal>unpack</goal>
                        </goals>
                        <configuration>
                            <stripVersion>true</stripVersion>
                            <artifactItems>
                                <artifactItem>
                                    <groupId>de.conterra.mapapps</groupId>
                                    <!-- PREVIOUSLY: ct-mapapps-js-api -->
                                    <artifactId>ct-mapapps-js</artifactId>
                                    <version>${mapapps.version}</version>
                                    <classifier>src</classifier>
                                    <outputDirectory>${project.build.directory}/unpacked</outputDirectory>
                                    <includes>layout/theme-everlasting/**,layout/theme-common/**</includes>
                                    <excludes>layout/theme-everlasting/styles/vuetify/**</excludes>
                                </artifactItem>
        [...]
        <profile>
            <id>include-mapapps-deps</id>
            <dependencies>
                <dependency>
                    <groupId>de.conterra.mapapps</groupId>
                    <!-- PREVIOUSLY: ct-mapapps-js-api -->
                    <artifactId>ct-mapapps-js</artifactId>
                    <scope>test</scope>
                </dependency>
```
Some changes to be made in the `pom.xml` and `gulpfile.js` to remove usage of the google closure compiler. These changes are found in this [commit](https://github.com/conterra/mapapps-4-developers/commit/1cbea0203d52e9ae92557ef14017a713fe30c771).

## 4.11 to 4.12

### Migrating javascript test-runner from intern to mocha (optional)

Although we highly recommend to change unit tests to mocha, this step is not mandatory. The support for intern test-runner will be dropped in a future version.

#### How to run deprecated intern-tests

Even after migration, it is still possible to run old unmigrated tests by apppending the URL parameter `registerInternAdapter=true`:
[http://localhost:9090/resources/jsregistry/root/@conterra/mapapps-mocha-runner/latest/mocha.html?boot=/js/tests/test-init.js&timeout=5000&test=sample_tests/intern-all&registerInternAdapter=true](http://localhost:9090/resources/jsregistry/root/@conterra/mapapps-mocha-runner/latest/mocha.html?boot=/js/tests/test-init.js&timeout=5000&test=sample_tests/intern-all&registerInternAdapter=true)

#### Setup for mocha test-runner

- Step 1: Ensure all dependencies in `pom.xml` and `package.json` are up to date. The correct versions can be found inside the [CHANGELOG.md](https://github.com/conterra/mapapps-4-developers/blob/master/CHANGELOG.md).
-   Steps 2: Make the mocha-test-runner available through jsregistry by adding the following lines to `src/main/test/resources/application.properties` file:

    ```
    jsregistry.directoryscanner.npmfolder=${basedir}/node_modules
    jsregistry.directoryscanner.npmincludes=mocha,chai,@conterra,@conterra/mapapps-mocha-runner
    ```

- Step 3: Adjust configuration for maven goal `run gulp js tests` in `pom.xml` from
    ```xml
    <configuration>
        <arguments>run-browser-tests --tests http://localhost:${jetty.server.port}/js/tests/runTests.html</arguments>
    </configuration>
    ```
    to
    ```xml
    <configuration>
        <arguments>run-browser-tests --tests http://localhost:${jetty.server.port}/resources/jsregistry/root/@conterra/mapapps-mocha-runner/latest/mocha.html?boot=/js/tests/test-init.js&amp;timeout=5000&amp;test=sample_tests/all&amp;reporter=tap</arguments>
    </configuration>
    ```

- Step 4: Create a file with name `.eslintrc` inside the root folder of the project and paste the following content:
    ```js
    {
        "extends": "eslint-config-ct-prodeng",
        "overrides": [
            {
                "files": ["*.js"],
                "globals": {
                    // For javascript based unit tests (typescript has typings for this)
                    "describe": "readonly",
                    "it": "readonly",
                    "before": "readonly",
                    "beforeEach": "readonly",
                    "after": "readonly",
                    "afterEach": "readonly"
                }
            }
        ]
    }
    ```

- Step 5: Create a file with name `init-packs.js` inside `src/main/test/webapp/js/tests` and paste the following content:
    ```js
    /*
    * Copyright (C) con terra GmbH
    */
    if (require.packs["@vue/test-utils"]) {
        require.packs["@vue/test-utils"].main = "dist/vue-test-utils.umd";
    }
    if (require.packs["chai"]) {
        require.packs["chai"].main = "chai";
    }
    ```

- Step 6: Create a file with name `test-init.js` inside `src/main/js/bundles/sample_tests/` and paste the following content:
    ```js
    /*
    * Copyright (C) con terra GmbH
    */
    // eslint-disable-next-line no-undef
    testConfig({
        jsregistry: [
            {
                //root: "url to registry..",
                packages: [
                    // register all self hosted packages
                    "app-uitest-support",
                    "test-utils",
                    "uitest",
                    "dojo",
                    "@conterra/mapapps-mocha-runner",
                    "mocha",
                    "chai",
                    "apprt",
                    "apprt-core"
                ]
            }
        ],
        deps: [
            "apprt-polyfill",
            // Needed for import { assert } from "chai"
            "/js/tests/test-base/init-packs.js"
        ],
        packages: [
            {
                name: "test-apps",
                location: "@@application.base.url@@/js/tests/test-apps"
            },
            {
                // register a package to access the base url
                name: "appContext",
                location: "@@application.base.url@@"
            }
        ]
    });
    ```

- Step 7: Open the file `src/main/test/webapp/js/tests/runTests.html` and change the `url=` to `url=../../../resources/jsregistry/root/@conterra/mapapps-mocha-runner/latest/mocha.html?boot=/js/tests/test-init.js&timeout=5000&test=sample_tests/all"`

- Step 8: Open the file `src/main/test/webapp/js/tests/test-init.js` and add `"/js/tests/init-packs.js"` to the `deps: []`.

At this stage the setup is ready to run existing mocha unit tests. For migration of existing intern tests to mocha head on to the next section of this guide.

To run the tests execute the command `mvn test -Prun-js-tests -Pinclude-mapapps-deps`.

#### Migration of unit tests from intern to mocha

The migration will be explained based on the sample bundle `sample_camera` that is delivered with this project. Tests for this bundle can be found at `src/main/js/bundles/sample_camera/tests`.

-   Step 1: Rename the file `intern-all.js` to `all.js`.
-   Step 2: Change the content of file `CameraControls.js`
    from

    ```js
    import registerSuite from "intern!object";
    import assert from "intern/chai!assert";
    import module from "module";
    import Vue from "apprt-vue/Vue";
    import CameraControls from "../CameraControls.vue";

    registerSuite({
        name: module.id,
        "Camera Control Component": function() {
            assert.ok(new Vue(CameraControls));
        }
    });
    ```
    to

    ```js
    import { assert } from "chai";
    import module from "module";
    import Vue from "apprt-vue/Vue";
    import CameraControls from "../CameraControls.vue";

    describe(module.id, function() {
        it("Camera Control Component", function() {
            assert.ok(new Vue(CameraControls));
        });
    });
    ```

## 4.10 to 4.11

- If you have no customized splashscreen, update the default splashscreen by changing your `init.css`
    and `index.html` file according to [this commit](https://github.com/conterra/mapapps-4-developers/commit/bef4b4d8669045a33fe8b40eef171f9194e291f7)
- If you have a customized template-bundle, you need to add these imports to the %template-name%.js-file of the bundle:

    ```js
    import "dijit/layout/BorderContainer";
    import "dijit/layout/ContentPane";
    import "ct/ui/template/OverlayContainer";
    import "windowmanager/WindowDockingBar";
    ```

## 4.9 to 4.10 (ArcGIS API for Javascript 4.16 to 4.17)

Breaking Changes in the API that may have an influence on map.apps development:

- For better memory management, view.destroy() now destroys all attached resources, including the map. To prevent the map from being destroyed, you can unset the map before calling destroy().

    ```javascript
    // destroy the view and all attached resources
    view.destroy();

    // unset map from the view so that it is not destroyed
    // then destroy the view and all attached resources
    const map = view.map;
    view.map = null;
    view.destroy();
    ```

- Performance improvements were made to Popups. Prior to this release, it was possible to access the popup feature's geometry without having to specify outFields on the FeatureLayer or the PopupTemplate.

This is important, if own PopupDefinitions are provided that interact with the features's geometry, e.g.

```javascript
resolvePopupTemplate(layer) {
        return {
            title: "County of {NAME}",
            content({graphic}) {
                const geom = graphic.geometry;

                [...]
            }
        };
    }

```

will only work, if `outFields` are specified like

```json
{
    "id": "counties",
    "type": "AGS_FEATURE",
    "url": "https://services.arcgis.com/P3ePLMYs2RVChkJx/ArcGIS/rest/services/USA_Counties/FeatureServer/0",
    "definitionExpression": "POP2010 > 500000",
    "outFields": ["NAME"],
    "popupTemplate": {
        "popupType": "fuel-stations"
    }
}
```

## 4.8 to 4.9 (ArcGIS API for Javascript 4.13 to 4.16)

-   Import of the _esri/geometry/geometryEngine_

    -   No longer possible:
        ```javascript
        import geometryEngine from "esri/geometry/geometryEngine";
        ```
    -   To use now:
        ```javascript
        // import all functions
        import * as geometryEngine from "esri/geometry/geometryEngine";
        ```
        ```javascript
        // import specific functions
        import {
            buffer,
            union,
            intersect,
            difference
        } from "esri/geometry/geometryEngine";
        ```

-   _Esri/core/Evented.js_ no longer delivers a target object

    -   old class:
        ```javascript
        t.prototype.emit = function(t, e) {
            var r = this,
                n = this._listenersMap && this._listenersMap.get(t);
            return (
                !!n &&
                ((e = e || {}),
                e.target || (e.target = this.target),
                n.slice().forEach(function(t) {
                    t.call(r.target, e);
                }),
                n.length > 0)
            );
        };
        ```
    -   new class:
        ```javascript
        t.prototype.emit = function(t, e) {
            var r = this._listenersMap && this._listenersMap.get(t);
            return (
                !!r &&
                (n.__spreadArrays(r).forEach(function(t) {
                    t.call(null, e);
                }),
                r.length > 0)
            );
        };
        ```

-   _esri/moment_ no longer importable

    -   No longer possible:
        ```javascript
        import moment from "esri/moment";
        ```
    -   To use now:

        ```javascript
        import moment from "moment";
        ```

-   _map-widget/ViewWatcher_ was renamed to _map-widget/ViewReadyWatcher_
