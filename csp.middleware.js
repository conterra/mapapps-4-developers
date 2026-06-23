// Sets a Content-Security-Policy header in the DevServer analogous to the deployment.
// Override per developer via gulpfile.overrides.js (csp: false) or env CSP_POLICY.

const fs = require("fs");
const path = require("path");
const crypto = require("crypto");

// Fixed nonce per DevServer start (the header stays static, no per-request
// coordination needed). Sufficient for locally catching CSP violations.
const NONCE = crypto.randomBytes(16).toString("base64");

// CSP as a directive map, so origins/nonce can be added selectively.
const DIRECTIVES = {
    "default-src": ["'self'"],
    "object-src": ["'none'"],
    "script-src": ["'self'", `'nonce-${NONCE}'`, "'unsafe-eval'", "'wasm-unsafe-eval'"],
    "worker-src": ["'self'", "blob:"],
    "child-src": ["'self'"],
    "connect-src": ["'self'", "https:", "http:", "wss:", "ws:"],
    "frame-src": ["'self'", "https:", "http:"],
    "img-src": ["'self'", "data:", "blob:", "https://cdn.arcgis.com", "https:", "http:"],
    "style-src": ["'self'", "'unsafe-inline'"],
    "base-uri": ["'none'"],
    "font-src": ["'self'", "data:"],
    "form-action": ["'self'"],
};

// Directives the remote origin is added to when mapapps.remote.base is an
// absolute URL.
const REMOTE_DIRECTIVES = ["script-src", "style-src", "font-src", "img-src", "connect-src"];

// Default server dirs of the DevServer
const PROPERTY_DIRS = ["./target/webapp", "./target/test-classes"];

function readRemoteBaseFromProperties() {
    let value;
    for (const dir of PROPERTY_DIRS) {
        const file = path.resolve(process.cwd(), dir, "application.properties");
        let content;
        try {
            content = fs.readFileSync(file, "utf-8");
        } catch (e) {
            continue;
        }
        for (const line of content.split(/\r?\n/)) {
            const m = line.match(/^\s*mapapps\.remote\.base\s*[=:]\s*(.+?)\s*$/);
            if (m && !/^\s*[#!]/.test(line)) {
                value = m[1];
            }
        }
    }
    return value;
}

function resolveRemoteOrigin() {
    const raw = process.env.MAPAPPS_REMOTE_BASE ?? readRemoteBaseFromProperties() ?? ".";
    if (!/^https?:\/\//i.test(raw)) {
        return undefined; // "." or relative -> same-origin, covered by 'self'
    }
    try {
        return new URL(raw).origin; // scheme://host[:port], path discarded
    } catch (e) {
        return undefined;
    }
}

function buildPolicy() {
    const directives = {};
    for (const [name, sources] of Object.entries(DIRECTIVES)) {
        directives[name] = sources.slice();
    }
    const remoteOrigin = resolveRemoteOrigin();
    if (remoteOrigin) {
        for (const name of REMOTE_DIRECTIVES) {
            if (!directives[name].includes(remoteOrigin)) {
                directives[name].push(remoteOrigin);
            }
        }
    }
    return `${Object.entries(directives)
        .map(([name, sources]) => `${name} ${sources.join(" ")}`)
        .join("; ")};`;
}

// Determined once on load (remote.base does not change at runtime; restart the
// DevServer when it does). CSP_POLICY overrides completely.
const POLICY = process.env.CSP_POLICY || buildPolicy();

// Inserts the nonce attribute into all <script> tags that don't have one yet.
// The propertiesfilter's token replacement (@@...@@) runs afterwards and does not
// touch the attribute.
function injectNonce(html) {
    return html.replace(/<script(?![^>]*\snonce=)(\s|>)/gi, `<script nonce="${NONCE}"$1`);
}

function isHtmlRequest(req) {
    const pathname = (req.url || "").split("?")[0];
    return pathname === "/" || /\.html?$/i.test(pathname);
}

module.exports = function devCspMiddleware(req, res, next) {
    res.setHeader("Content-Security-Policy", POLICY);

    if (!isHtmlRequest(req)) {
        next();
        return;
    }

    // Buffer the HTML and inject the nonce into the <script> tags. This middleware
    // is registered last -> our wrapper runs BEFORE the propertiesfilter's, which
    // then still replaces the @@...@@ tokens and sends.
    const orgWrite = res.write;
    const orgEnd = res.end;
    let buffer = "";

    res.write = function (chunk, encoding, callback) {
        if (!this.headersSent) {
            this.removeHeader("content-length");
        }
        if (!chunk || callback) {
            return orgWrite.call(this, chunk, encoding, callback);
        }
        buffer += chunk instanceof Buffer ? chunk.toString(encoding) : chunk;
        return true;
    };

    res.end = function (chunk, encoding, callback) {
        if (!this.headersSent) {
            this.removeHeader("content-length");
        }
        if (chunk) {
            buffer += chunk instanceof Buffer ? chunk.toString(encoding) : chunk;
        }
        return orgEnd.call(this, injectNonce(buffer), encoding, callback);
    };

    next();
};
