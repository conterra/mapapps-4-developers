# Migration Guide

This file contains notes for the migration of bundles to new minor versions of map.apps 4.
The changes described here were not made to map.apps interfaces but concern changes in the ArcGIS API for JavaScript.

## 4.8 to 4.9 (ArcGIS API for Javascript 4.13 to 4.16)

- Import of the *esri/geometry/geometryEngine*
  - No longer possible:
    ```javascript
    import geometryEngine from "esri/geometry/geometryEngine"; 
    ```
  - To use now:
    ```javascript
    // import all functions
    import * as geometryEngine from "esri/geometry/geometryEngine";
    ```
    ```javascript
    // import specific functions
    import {buffer, union, intersect, difference} from "esri/geometry/geometryEngine";
    ```

- *Esri/core/Evented.js* no longer delivers a target object
  - old class:
    ```javascript
    t.prototype.emit = function (t, e) {
        var r = this, n = this._listenersMap && this._listenersMap.get(t);
        return !!n && (e = e || {}, e.target || (e.target = this.target), n.slice().forEach(function (t) {
            t.call(r.target, e)
        }), n.length > 0)
    }
    ```
  - new class:
    ```javascript
    t.prototype.emit = function (t, e) {
        var r = this._listenersMap && this._listenersMap.get(t);
        return !!r && (n.__spreadArrays(r).forEach((function (t) {
            t.call(null, e)
        })), r.length > 0)
    }
    ```

- *esri/moment* no longer importable
  - No longer possible:
    ```javascript
    import moment from "esri/moment";
    ```
  - To use now:
    ```javascript
    import moment from "moment";
    ```
    
- *map-widget/ViewWatcher* was renamed to *map-widget/ViewReadyWatcher*