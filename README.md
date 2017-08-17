# mapapps-4-developers

This is project demonstrates how to build maintainable UI elements or widgets in your map.apps bundles. You may use this project as a blueprint for starting your own map.apps project.

## Contents

This Maven project includes some of the core concepts for developing UI driven bundles in map.apps. Use this readme as a guide for what to discover in this blueprint project. After studying this project, you should be able to answer the following questions:

* How can I use **Vue.js** to build widgets following the **MVVM** pattern?
* How does the **MVVM** pattern help to make UI components and models **testable**?
* How can the view-model interact via **bindings** with (Accessor) models from the **ESRI ArcGIS API for JavaScript**?
* How is my **layout** integrated into **map.apps templates**?
* How do **gulp** processes modify my source code?

## Usage

Start the integrated jetty server with `mvn jetty:run` and activate the `watch-all` maven profile in order to run the samples.
The profile will start a gulp task that watches for changes in your source code.

### Running the tests

To execute the unit tests inside the project, run [http://localhost:9090/js/tests/runTests.html](http://localhost:9090/js/tests/runTests.html).

### The Camera sample bundle

* Interaction with ESRI map
* Use of Binding (e.g. with Accessor)

### Build Process

* The gulpfile that determines the build process can be found in the root directory: `/gulpfile.js`
* package.json / npm

## References

* [Vue.js](https://vuejs.org)
* [Gulp](http://gulpjs.com)