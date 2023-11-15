/*
 * Copyright (C) con terra GmbH
 */

// This file is only used while emitting declaration files (gulp create-types).
// Its purpose is to hide all dojo types from the compiler because
// tsc will otherwise output arcane 'emit' errors.
declare module "dojo/*" {
    const dummy: any;
    type dummy = any;
    export = dummy;
}

declare module "dijit/*" {
    const dummy: any;
    type dummy = any;
    export = dummy;
}

declare module "dojox/*" {
    const dummy: any;
    type dummy = any;
    export = dummy;
}

