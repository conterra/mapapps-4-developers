const i18n = {
    root: ({
        bundleName: "camera",
        bundleDescription: "",
        ui: {
            windowTitle: "Camera"
        },
        tool: {
            title: "Camera",
            tooltip: "Camera"
        }
    }),
    "de": true
};

export type Messages = (typeof i18n)["root"];
export default i18n;
