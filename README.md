# mapapps-4-developers

This project demonstrates how to build maintainable UI elements or widgets in your map.apps bundles.
You may use this project as a blueprint for starting your own map.apps project.

* [Contents](https://github.com/conterra/mapapps-4-developers#contents)
* [Requirements](https://github.com/conterra/mapapps-4-developers#requirements)
* [Usage](https://github.com/conterra/mapapps-4-developers#usage)
* [Updating from older versions](https://github.com/conterra/mapapps-4-developers#updating-from-older-versions)
* [References](https://github.com/conterra/mapapps-4-developers#references)

## Contents

This Maven project includes some of the core concepts for developing UI-driven bundles in map.apps. Use this readme as a guide for what to discover in this project. After studying this project, you should be able to answer the following questions:

* How can I use **Vue.js** to build widgets following the **MVVM** pattern?
* How does the **MVVM** pattern help to make UI components and models **testable**?
* How do I build widgets with ready-to-use UI components from Vuetify.js?
* How do I build a custom theme (theme-custom)?
* How can the view model interact via **bindings** with (Accessor) models from the **Esri ArcGIS API for JavaScript**?
* How is my **layout** integrated into **map.apps templates**?
* How do **gulp** processes modify my source code?

## Requirements

* map.apps 4.7.0
* all resources from `map.apps-VERSION/sdk/m2-repository` need to be copied manually to your local Maven repository (e.g. `%UserProfile%/.m2/repository` for Windows, `~/.m2/repository` for MacOS).

## Usage

The project supports a 'remote project' and 'standalone project' mode.

### Use 'remote project' mode

In this mode a map.apps installation is available elsewhere and most JavaScript resources are fetched from this installation.
This mode is recommended.

The URL of the map.apps server can be declared in the pom.xml. 

Replace

```xml
 <mapapps.remote.base>.</mapapps.remote.base>
```

with

```xml
 <mapapps.remote.base>http://yourserver/mapapps</mapapps.remote.base>
```

As an alternative the URL can be declared in a file called `build.properties` with the content

```properties
mapapps.remote.base=http://yourserver/mapapps
```

and enabling the "env-dev" Maven profile.
Append `-P env-dev` or `-Denv=dev` to any Maven execution or declare the profile as activated by default in your Maven settings.xml.

### Use 'standalone project' mode

In this mode all JavaScript sources are added to this project during development.
The drawback of this mode is that you can not test authentication and that the default settings are not read from the remote instance.

This mode requires that the profile `include-mapapps-deps` is activated.
Append `-P include-mapapps-deps` to any Maven execution or declare the profile as activated by default in your Maven settings.xml.

### Start a local HTTP server

Start the integrated Jetty server with:

```sh
mvn clean jetty:run -P watch-all
```

Make sure that the `watch-all` Maven profile is activated.
The profile will start a gulp task that watches for changes in your source code.

After a successfull start the Jetty server ist available at [http://localhost:9090](http://localhost:9090).

### Skip intallation of Node.js and npm during Maven execution

By appending `-Denv=dev -Dlocal.configfile=./build.properties` to any Maven execution the development mode is activated.
This means:

* Node.js and npm are not installed
* watch-all profile is activated
* the build.properties file is loaded

To enforce the installation of Node.js and npm execute:

```
mvn initialize
```

This triggers the installation of Node.js and npm exclusively.

### Developing bundles for map.apps line 3

To develop line 3 bundles with mapapps-4-developers, some adaptations are required. This will only work with the `'remote project'` mode.
The map.apps remote base mentioned above should point to a map.apps 4 installation, which always includes the bundles of line 3 as well.
This should be the default after map.apps 4 was installed.

```xml
 <mapapps.remote.base>http://yourserver/mapapps</mapapps.remote.base>
```

To force project based on mapapps-4-developers to use the correct `apprt.version` for line 3 developement, the `index.html` file in 
`src/main/webapp` has to be changed the following way:

``` 
  $apprt.changeConfig({ct: {
                amdPackages: ["apprt@^@@apprt.version@@"]
            }});
```
should be replaced by 

```
  $apprt.changeConfig({ct: {
                amdPackages: ["apprt@^3.10.0"]
            }});
```

Make sure to use the intended target map.apps 3.x version.

To ensure that the correct bundle versions are loaded, the `app.json` for a line 3 app needs to be configured with the correct versions:

```
{
    "properties": {
        "amdPackages": "apprt@^3.10.0"
    },
    "load": {
        "bundleLocations" : ["localbundles","bundles"],
        "allowedBundles" : [
            "system@^3.10.0",
            "splashscreen@^3.10.0",
            "map@^3.10.0",
            
    [...]       

```  

Since line 3 bundles are often coded in the old Dojo AMD style and not transpiled from ES6, it is necessary to exclude
them from the transpilation process. To achieve this, any line 3 app folder and any line 3 bundle folder has to contain a `.babelrc` file in the directory root
with the following content.

```json
{
    "ignore":["**/*"]
}
```

With all these changes, the Jetty server can be started.
Note that this will only cover JS bundle development capabilities. To develop themes and templates, the old
`sampleRemoteProj` should be used. To get a copy, contact [support@conterra.de](support@conterra.de)  

### Start coding

For detailed development documentation have a look at [conterra's developer network](https://developernetwork.conterra.de/de/documentation/mapapps/development-guide) (account required).

### Make your code production ready

To ensure that all files are compressed/minified and a dependencies.json is calculated execute:

```sh
mvn clean install -P compress
```

### Upload your code to a map.apps installation

To upload your apps and bundles after compression append the `upload` profile.

```sh
mvn clean install -P compress,upload
```

### Running the tests

To execute the unit tests inside the project, run [http://localhost:9090/js/tests/runTests.html](http://localhost:9090/js/tests/runTests.html).

> If you run the project in 'remote project' mode, you will have to edit the `test-init.js` file located in the `/src/test/webapp/js/tests/` folder.

### The Camera sample bundle

* Interaction with ESRI map
* Use of Binding (e.g. with Accessor)

### The theme-custom bundle

* Sample of minimum fileset needed to create a custom theme.
* Make sure bundle is loaded instead of theme-everlasting in sample app
* When renaming/copying the theme-custom bundle to e.g. theme-[projectname] make sure the adjustments (theme-name) have refelected to the following files.
  * gulpfile.js
  * theme-name/manifest.json
  * theme-name/styles/styles.less

### Build Process

* The gulpfile that determines the build process can be found in the root directory: `/gulpfile.js`
* package.json / npm

## Updating from older versions

### from 4.6.1 to 4.7.0
1. adjust the `mapapps.version` property in `./pom.xml`  to `4.7.0` 
2. adjust the `ct.jsregistry.version` property in `./pom.xml`  to `1.3.0` 
3. adjust versions of devDependencies in `./package.json` according to the list below:
    * "eslint-config-ct-prodeng": "^1.0.5"
    * "vue-template-compiler": "2.6.6"

### from 4.6.0 to 4.6.1
1. adjust the `mapapps.version` property in `./pom.xml`  to `4.6.1` 

### from 4.5.0 or below to 4.6.0
1. adjust the `mapapps.version` property in `./pom.xml`  to `4.6.0`
2. adjust versions of devDependencies in `./package.json` according to the list below:
    * "ct-mapapps-gulp-js": "~0.1.3"
    * "vue-template-compiler": "2.5.17"
3.  Go to `./src/test/webapp/index.html` and replace the `corsEnabledServers: ["@@mapapps.remote.base@@"]` with `trustedServers: ["@@mapapps.remote.base@@"]` inside the apprt request configuration object.

## References

* [Vue.js](https://vuejs.org)
* [Vuetify.js](https://vuetifyjs.com)
* [Gulp](http://gulpjs.com)
