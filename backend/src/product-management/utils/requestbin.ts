const https = require("https");

const options = {
    hostname: "en5cgk07nt7xy.x.pipedream.net", /// todo: env value
    port: 443,
    path: "/",
    method: "POST",
    headers: {
        "Content-Type": "application/json"
    },
}

export const sendWebhook = async (data) => {
    const jsonBody = typeof (data) !== "string" ? JSON.stringify(data) : data;
    const req = https.request(options);
    req.write(jsonBody);
    req.end();
}

