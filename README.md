# mapapps-4-developers

This project is a starting point for programming custom map.apps bundles and themes. It contains examples for common tasks such as building widgets with Vue.js or creating your own custom themes.
You may use this project as a blueprint for starting your own map.apps project.

-   [Contents](https://github.com/conterra/mapapps-4-developers#contents)
-   [Requirements](https://github.com/conterra/mapapps-4-developers#requirements)
-   [Usage](https://github.com/conterra/mapapps-4-developers#usage)
-   [Updating from older versions](https://github.com/conterra/mapapps-4-developers#updating-from-older-versions)
-   [References](https://github.com/conterra/mapapps-4-developers#references)

## Contents

This Maven project implements some of the core concepts for developing bundles in map.apps. Use this README as a guide for how to use and what to learn from this project. After studying this document and the provided example bundles and configurations, you should be able to answer the following questions:

-   How can I use **Vue.js** to build widgets following the **MVVM** pattern?
-   How does the **MVVM** pattern help to make UI components and models **testable**?
-   How do I build widgets with ready-to-use UI components from Vuetify.js?
-   How do I build a custom theme (theme-custom)?
-   How can the view model interact via **bindings** with (Accessor) models from the **Esri ArcGIS API for JavaScript**?
-   How is my **layout** integrated into **map.apps templates**?
-   How do **gulp** processes modify my source code?

## Requirements

-   map.apps 4.14.1
-   All resources from `map.apps-VERSION/sdk/m2-repository` need to be copied manually to your local Maven repository (e.g. `%UserProfile%/.m2/repository` for Windows, `~/.m2/repository` for MacOS).

## Usage

The project supports a 'remote project' and 'standalone project' mode.

### Use 'remote project' mode

In this mode a running map.apps installation must be available on a different machine or server and the map.apps core JavaScript resources are fetched from there.
This mode is the recommended one.

The URL to the existing map.apps installation can be configured inside the `pom.xml` file of this project:

Replace

```xml
 <mapapps.remote.base>.</mapapps.remote.base>
```

with

```xml
 <mapapps.remote.base>http://yourserver/mapapps</mapapps.remote.base>
```

As an alternative, the URL can be declared in a file called `build.properties` with the content

```properties
mapapps.remote.base=http://yourserver/mapapps
```

The "env-dev" Maven profile must be activated when using a `build.properties` file. To activate this profile append `-P env-dev` or `-Denv=dev` to any Maven execution or declare the profile as activated by default in your Maven `settings.xml` file.

### Use 'stand-alone project' mode

In this mode all JavaScript sources are added to this project during development.
The drawback of this mode is that you cannot test authentication and that the default settings are not read from the remote instance.

To use the 'stand-alone project' mode, activate the Maven profile `include-mapapps-deps`: Append `-P include-mapapps-deps` to any Maven execution command or declare the profile as activated by default in your Maven `settings.xml`.

When developing live-configuration widgets in Chrome, this mode is compelling.

### Prepare Node and node_modules

To prepare node and install all required build dependencies execute:

```sh
mvn initialize
```

This triggers the installation of Node.js and NPM exclusively.

### Start a local HTTP server

Start the integrated Jetty server with:

```sh
mvn jetty:run -Denv=dev
```

The profile will starts a HTTP server and watches for changes in your source code.

The HTTP server is then available at [http://localhost:9090](http://localhost:9090).

### Use a build.properties file

By appending `-Denv=dev -Dlocal.configfile=./build.properties` to any Maven execution the development mode is activated.
This means:

-   Node.js and NPM are not installed
-   the `watch-all` profile is activated
-   the `build.properties` file is loaded

This allows customization of some of the properties in the pom.xml in via the `build.properties`.

### Start coding

For detailed documentation on how to develop for map.apps see the [Developer's Guide](https://docs.conterra.de/en/mapapps/latest/developersguide/getting-started.html).

### Source maps and debugging

For development cases it might be useful to be able to debug the map.apps code base when using map.apps-4-developers.
When running the project in `standalone` mode, source maps should be available without further configuration.

When running the project against a `remote` base, it is necessary to configure the map.apps remote base to deliver 
the source maps to the client as well. In the `application.properties` of the remote map.apps instance it is necessary to
set the property `jsregistry.sourcemaps.enabled`

```properties
jsregistry.sourcemaps.enabled=true
```

Note, that this should only be configured for stage or development systems for security reasons, as it will reveal the
map.apps code to the client.

### Make your code production ready

Execute the following command to ensure that all files are compressed/minified and a `dependencies.json` file is calculated:

```sh
mvn clean install -P compress
```

### Upload your code to a map.apps installation

To upload your apps and bundles after compression to an existing map.apps installation activate the `upload` profile:

```sh
mvn clean install -P compress,upload -Dmapapps.user=xyz -Dmapapps.pw=abc
```

If map.apps is running behind an IIS with Integrated Windows authentication then do not configure `-Dmapapps.user` and `-Dmapapps.pw`.
Instead configure `-Dmapapps.useChunkedRequestEncoding=true` and `-Djdk.http.ntlm.transparentAuth=trustedHosts` (or `-Djdk.http.ntlm.transparentAuth=allHosts`) to ensure the user's Windows credentials are used.

If map.apps is configured to use security.mode=OAUTH, a token is required for authentication.
You will have to generate that token from an administrative account by yourself at the OAUTH provider and set it with `-Dmapapps.token` like this:

```sh
mvn clean install -P compress,upload -Dmapapps.token=8tb22ttfg46L_hOo7U-yq58_kpaKT4w2kP_3n2JzkEsbu7CWmqMzSKmDJvQUBZFtAtRPzMwtA...
```

### Running the tests

To execute the unit tests inside the project, run [http://localhost:9090/js/tests/runTests.html](http://localhost:9090/js/tests/runTests.html).

Or use the test lifecycle:

```sh
mvn clean test -P run-js-tests,include-mapapps-deps
```

> If you run the project in 'remote project' mode, you will have to edit the `test-init.js` file located in the `/src/test/webapp/js/tests/` folder.

### The 'sample_camera' bundle

There is a sample bundle in this project called "sample_camera" which demonstrates the following aspects of developing for map.apps 4:

-   Interaction with ESRI map
-   Use of Binding (e.g. with Accessor)
-   Building widgets with Vue.js and Vuetify.js

### The 'theme-custom' bundle

-   Sample of minimum fileset needed to create a custom theme.
-   Make sure bundle is loaded instead of theme-everlasting in sample app
-   When renaming/copying the 'theme-custom' bundle to e.g. `theme-[projectname]` make sure to also make the corresponding changes to the following files:

    -   `gulpfile.js`
    -   `theme-name/manifest.json`
    -   `theme-name/styles/styles.less`

### Build Process

-   The gulpfile that describes the build process for map.apps themes can be found in the root directory: `/gulpfile.js`
-   The `/package.json` file contains the version numbers for the required dependencies for the gulp build process.

## Updating from older versions

### from 4.13.1 to 4.14.0

See [Changelog](./CHANGELOG.md#4140---28102022)

### from 4.13.0 to 4.13.1

See [Changelog](./CHANGELOG.md#4131---06042022)

### from 4.12.3 to 4.13.0

See [Changelog](./CHANGELOG.md#4130---29032022)

### from 4.12.2 to 4.12.3

See [Changelog](./CHANGELOG.md#4123---15122021)

### from 4.12.1 to 4.12.2

See [Changelog](./CHANGELOG.md#4122---13122021)

### from 4.12.0 to 4.12.1

See [Changelog](./CHANGELOG.md#4121---10112021)

### from 4.11.1 to 4.12.0

See [Changelog](./CHANGELOG.md#4120---2021-08-31)

### from 4.11.0 to 4.11.1

See [Changelog](./CHANGELOG.md#4111)

### from 4.10.1 to 4.11.0

See [Changelog](./CHANGELOG.md#4110)

### from 4.10.0 to 4.10.1

See [Changelog](./CHANGELOG.md#4100---2020-12-09)

### from 4.9.2 to 4.10.0

See [Changelog](./CHANGELOG.md#4100---2020-12-08)

### from 4.9.1 to 4.9.2

See [Changelog](./CHANGELOG.md#492---2020-10-06)

### from 4.9.0 to 4.9.1

See [Changelog](./CHANGELOG.md#491---2020-09-04)

### from 4.8.4 to 4.9.0

See [Changelog](./CHANGELOG.md#490---2020-08-18)

### from 4.8.3 to 4.8.4

See [Changelog](./CHANGELOG.md#484---2020-05-20)

### from 4.8.2 to 4.8.3

1. Adjust the `mapapps.version` property in `./pom.xml` to `4.8.3`
2. Adjust the versions in `devDependencies` in `./package.json` according to the list below:
    - "ct-mapapps-gulp-js": "^0.3.6"

### from 4.8.1 to 4.8.2

1. Adjust the `mapapps.version` property in `./pom.xml` to `4.8.2`
2. Change the requirement `babel-polyfill` to `apprt-polyfill` in the `./pom.xml` and `src/test/webapp/js/tests/test-init.js`.
3. Replace `$apprt.load` and `$apprt.lauchAppFromParam` by `$apprt.startApp` in the `src/test/webapp/index.html`

### from 4.8.0 to 4.8.1

1. Adjust the `mapapps.version` property in `./pom.xml` to `4.8.1`

### from 4.7.2 to 4.8.0

1. Adjust the `mapapps.version` property in `./pom.xml` to `4.8.0`
2. Adjust the `ct.jsregistry.version` property in `./pom.xml` to `1.3.4`
3. Adjust the versions in `devDependencies` in `./package.json` according to the list below:
    - "ct-mapapps-gulp-js": "^0.2.5"

### from 4.7.1 to 4.7.2

1. Adjust the `mapapps.version` property in `./pom.xml` to `4.7.2`
2. Adjust the `ct.jsregistry.version` property in `./pom.xml` to `1.3.2`
3. Add the version hint `<version>${ct.jsrt-test.version}</version>` for dependencies `ct-jsrt-test-intern` and `ct-jsrt-test-uitest` in `pom.xml`
4. Update the Gulpfile and remove the dev dependencies from `gulpfile.js`. For details see [commit](https://github.com/conterra/mapapps-4-developers/commit/c974a74a08a70316204d5c09aee22f8d39c70446)

### from 4.7.0 to 4.7.1

1. Adjust the `mapapps.version` property in `./pom.xml` to `4.7.1`
2. Adjust the `ct.jsregistry.version` property in `./pom.xml` to `1.3.1`

### from 4.6.1 to 4.7.0

1. Adjust the `mapapps.version` property in `./pom.xml` to `4.7.0`
2. Adjust the `ct.jsregistry.version` property in `./pom.xml` to `1.3.0`
3. Adjust the versions in `devDependencies` in `./package.json` according to the list below:
    - "eslint-config-ct-prodeng": "^1.0.5"
    - "vue-template-compiler": "2.6.6"

### from 4.6.0 to 4.6.1

1. Adjust the `mapapps.version` property in `./pom.xml` to `4.6.1`

### from 4.5.0 or below to 4.6.0

1. Adjust the `mapapps.version` property in `./pom.xml` to `4.6.0`
2. Adjust the versions in `devDependencies` in `./package.json` according to the list below:
    - "ct-mapapps-gulp-js": "~0.1.3"
    - "vue-template-compiler": "2.5.17"
3. Go to `./src/test/webapp/index.html` and replace the `corsEnabledServers: ["@@mapapps.remote.base@@"]` with `trustedServers: ["@@mapapps.remote.base@@"]` inside the apprt request configuration object.

## References

-   [Vue.js](https://vuejs.org)
-   [Vuetify.js](https://vuetifyjs.com)
-   [Gulp](http://gulpjs.com)
