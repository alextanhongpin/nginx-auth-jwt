// https://github.com/nginx/njs-examples/blob/master/njs/http/authorization/gen_hs_jwt.js

const expiryInSeconds = 600; // 10 minute.

async function generate_hs256_jwt(claims, key, expiryInSeconds) {
  const unixSeconds = Math.floor(Date.now() / 1000);
  const header = { typ: "JWT", alg: "HS256" };
  Object.assign(claims, { exp: unixSeconds + expiryInSeconds });

  const s = [header, claims]
    .map(JSON.stringify)
    .map((v) => Buffer.from(v).toString("base64url"))
    .join(".");
  const webCryptoKey = await crypto.subtle.importKey(
    "raw",
    key,
    { name: "HMAC", hash: "SHA-256" },
    false,
    ["sign"]
  );
  const sign = await crypto.subtle.sign({ name: "HMAC" }, webCryptoKey, s);

  return s + "." + Buffer.from(sign).toString("base64url");
}

async function jwt(r) {
  const claims = {
    iss: "nginx",
    sub: "alice",
    foo: 123,
    bar: "qq",
    xyz: false,
  };

  const token = await generate_hs256_jwt(
    claims,
    // This is set in the nginx.conf `env` section.
    process.env.JWT_GEN_KEY,
    expiryInSeconds
  );

  r.setReturnValue(token);
}

export default { jwt };
