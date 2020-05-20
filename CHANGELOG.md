# Changelog

All notable changes to this project will be documented in this file.

## [4.8.4] - 2020-05-20

### Changed

- Upgrade some Maven-Plugin versions in `./pom.xml`.
- Change `mapapps.version` property in `./pom.xml`  to `4.8.4`
- Change `ct.jsregistry.version` property in `./pom.xml`  to `1.3.7`
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

### Changed

- Support for map.apps 4.8.3.
- Update ct-mapapps-gulp-js to 0.3.6 (package.json)

## [4.8.2] - 2020-02-11

### Changed

- Support for map.apps 4.8.2.
- Replace `babel-polyfill` by `apprt-polyfill`.
- Replace `$apprt.load` and `$apprt.lauchAppFromParam` by `$apprt.startApp`
- Introduce property `skip.apps.upload` to decide if apps should be uploaded
- Apps located in `/src/main/js/apps/[app]` are by default zipped into the folder `/target/[app].zip`.

## [4.8.1] - 2020-01-10

### Changed

- Support for map.apps 4.8.1.

## [4.8.0] - 2020-01-06

### Changed

- Support for map.apps 4.8.0.
- Update ct.jsregistry.version version.
- Update ct-mapapps-gulp-js version.

## [4.7.2] - 2019-09-18

### Changed

- Support for map.apps 4.7.2.
- Update ct.jsregistry.version version.
- sample_camera sample for sync logging added
- sample_camera small enhancements
- Update ct-mapapps-gulp-js version (requires additional changes, see this [commit](https://github.com/conterra/mapapps-4-developers/commit/c974a74a08a70316204d5c09aee22f8d39c70446))

## [4.7.1] - 2019-08-16

### Changed

- Support for map.apps 4.7.1.
- Update ct.jsregistry.version version.

## [4.7.0] - 2019-06-28

### Changed

- Support for map.apps 4.7.0.
- Update ct.jsregistry.version version.
- Update vue-template-compiler version.
- Update eslint-config-ct-prodeng version.

## [4.6.1] - 2019-04-24

### Added

- Explain `-Denv=dev`.
- Add support for local configuration of `proxy.use.rules`.

### Changed

- Support for map.apps 4.6.1.
- Update node/npm versions, add profile for dedicated npm install, use newer jetty version.

## [4.6.0] - 2019-03-01

### Changed

- Support for map.apps 4.6.0.
- Update ct-mapapps-gulp-js version.
- Use maven.home not M2_HOME.
- Update node, npm and dependencies.

### Removed

- Property `trustedServers` has been removed with property `corsEnabledServers`.

[Unreleased]: https://github.com/conterra/mapapps-4-developers/compare/4.6.0...HEAD
[4.6.1]: https://github.com/conterra/mapapps-4-developers/compare/4.6.0...4.6.1
[4.6.0]: https://github.com/conterra/mapapps-4-developers/compare/4.5.0...4.6.0
