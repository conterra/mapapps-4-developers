testConfig({
    jsregistry: [{
            //root: "url to registry..",
            packages: [
                // register all self hosted packages
                "*"
            ]
        }
        //uncomment, if project runs in remote mode
        /* ,
              {
            root: "@@mapapps.remote.base@@/resources/jsregistry/root",
            packages: [
                "apprt@4.x",
                "apprt-vue@4.x",
                "vuetify@~0.14.7"
            ]
        }*/
    ]
});