# map.apps for Developers

This project is a starting point for programming custom map.apps bundles and themes. It contains examples for common tasks such as building widgets with Vue.js or creating your own custom themes.
You may use this project as a blueprint for starting your own map.apps project.

Since both Typescript and Javascript can be used to implement bundles, this project contains two bundles with the same functionality, `sample_camera` implemented in Typescript and `sample_camera_js` implemented in Javascript.
Initially only the `sample_camera` bundle is included in the `Demo` sample app.

For detailed documentation on how to use map.apps for Developers to extend map.apps, see the [map.apps Developer's Guide](https://docs.conterra.de/en/mapapps/latest/developersguide/getting-started/).

## Software Requirements

- Java >= 17
- Maven >= 3.9.0

## Quick start

Clone this project and ensure that you have all required dependencies installed correctly (see [Documentation](https://docs.conterra.de/en/mapapps/latest/developersguide/getting-started/set-up-development-environment.html)).

Then run the following commands from the project root directory to start a local development server:

```bash
# install all required node modules
$ mvn initialize

# start dev server
$ mvn compile -Denv=dev -Pinclude-mapapps-deps

# run unit tests
$ mvn test -P run-js-tests,include-mapapps-deps
```

To execute the tests in your browser, open <http://localhost:9090/js/tests/runTests.html> (may be on a different port depending on your configuration).

For more details refer to the [Developer's Guide](https://docs.conterra.de/en/mapapps/latest/developersguide/getting-started/).

## Updating from older versions

### from 4.19.1 to 4.19.2

See [Changelog](./CHANGELOG.md#4192---06052025)

### from 4.19.0 to 4.19.1

See [Changelog](./CHANGELOG.md#4191---14022025)

### from 4.18.3 to 4.19.0

See [Changelog](./CHANGELOG.md#4190---21012025)

### from 4.18.2 to 4.18.3

See [Changelog](./CHANGELOG.md#4183---07102024)

### from 4.18.1 to 4.18.2

See [Changelog](./CHANGELOG.md#4182---19072024)


### from 4.18.0 to 4.18.1

See [Changelog](./CHANGELOG.md#4181---23052024)

### from 4.17.0 to 4.18.0

See [Changelog](./CHANGELOG.md#4180---17052024)

### from 4.16.0 to 4.17.0

See [Changelog](./CHANGELOG.md#4170---16022024)

### from 4.15.1 to 4.16.0

See [Changelog](./CHANGELOG.md#4160---11012024)

### from 4.15.0 to 4.15.1

See [Changelog](./CHANGELOG.md#4151---06092023)

### from 4.14.3 to 4.15.0

Note here a bigger change inside the `pom.xml` and `gulpfile.js` happened due to the introduction of browsersync as dev server and the support for rollup based builds.
Please compare the files not all changes are documented in detail.

See [Changelog](./CHANGELOG.md#4150---11052023)

### from 4.14.2 to 4.14.3

See [Changelog](./CHANGELOG.md#4143---20032023)

### from 4.14.1 to 4.14.2

See [Changelog](./CHANGELOG.md#4142---24012023)

### from 4.14.0 to 4.14.1

See [Changelog](./CHANGELOG.md#4141---01122022)

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
