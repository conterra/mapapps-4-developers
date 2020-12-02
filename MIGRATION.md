# Migration Guide

This file contains notes for the migration of bundles to new minor versions of map.apps 4.
The changes described here were not made to map.apps interfaces but concern changes in the ArcGIS API for JavaScript.

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