# mapapps-4-developers

This is project demonstrates how to build maintainable UI elements or widgets in your map.apps bundles.
You may use this project as a blueprint for starting your own map.apps project.

## Contents

This Maven project includes some of the core concepts for developing UI driven bundles in map.apps. Use this readme as a guide for what to discover in this project. After studying this project, you should be able to answer the following questions:

* How can I use **Vue.js** to build widgets following the **MVVM** pattern?
* How does the **MVVM** pattern help to make UI components and models **testable**?
* How do I build widgets with ready-to-use UI components from Vuetify.js?
* How do I build a custom theme (theme-custom)?
* How can the view-model interact via **bindings** with (Accessor) models from the **ESRI ArcGIS API for JavaScript**?
* How is my **layout** integrated into **map.apps templates**?
* How do **gulp** processes modify my source code?

## Requirements

* map.apps 4.6.0 (or above)
* all resources from `CD-Contents/sdk/m2-repository` need to be copied manually to your local maven repository (e.g. `%UserProfile%/.m2/repository` for Windows, `~/.m2/repository` for MacOS).

## Usage

The project supports a 'remote project' and 'standalone project' mode.

### Use 'remote project' mode

In this mode a map.apps installation is available elsewhere and most JavaScript resources are fetched from this installation.
This mode is recommended.

The URL of the mapapps server can be declared in the pom.xml. Replace:

```xml
 <mapapps.remote.base>.</mapapps.remote.base>
```

with

```xml
 <mapapps.remote.base>http://yourserver/mapapps</mapapps.remote.base>
```

As alternative the URL can be declared in a file called `build.properties` with the content

```properties
mapapps.remote.base=http://yourserver/mapapps
```

and enabling the "env-dev" maven profile.
Append `-P env-dev` to any maven execution or declare the profile as activated by default in your maven settings.xml.

### Use 'standalone project' mode

In this mode all JavaScript sources are included to this project during development.
The drawback of this mode is that you can not test authentication and that the default settings are not read from the remote instance.

This mode requires that the profile `include-mapapps-deps` is activated.
Append `-P include-mapapps-deps` to any maven execution or declare the profile as activated by default in your maven settings.xml.

### Start a local http server

Start the integrated jetty server with:

```sh
mvn jetty:run -P watch-all
```

Make sure that the `watch-all` maven profile is activated.
The profile will start a gulp task that watches for changes in your source code.

After a successfull start, the jetty server ist available at [http://localhost:9090](http://localhost:9090).

### Developing map.apps line 3 bundles

To develop line 3 bundles with mapapps-4-developers, some changes are required. This will only be possible in the `'remote project'` mode.
The map.apps remote base mentioned above should point to a map.apps 4 installation, which also includes the line 3 bundles as well.
This should be the default case after map.apps 4 was installed.

```xml
 <mapapps.remote.base>http://yourserver/mapapps</mapapps.remote.base>
```

To force mapapps-4-developers project to use the correct `apprt.version` for line 3 developement, the `index.html` file in 
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

where the targeted map.apps 3.x version should be used.

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

With all these changes, the Jetty Server can be started.
Note, that this will only cover JS bundle development capabilities. To develop themes and templates, the old
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
* When renaming/copying the theme-custom bundle to e.g.  theme-[projectname] make sure the adjustments (theme-name) have refelected to the following files.
  * gulpfile.js
  * theme-name/manifest.json
  * theme-name/styles/styles.less

### Build Process

* The gulpfile that determines the build process can be found in the root directory: `/gulpfile.js`
* package.json / npm

## References

* [Vue.js](https://vuejs.org)
* [Vuetify.js](https://vuetifyjs.com)
* [Gulp](http://gulpjs.com)
