function generate_hs256_jwt(claims, key, validDurationInSeconds) {
  const header = { typ: "JWT", alg: "HS256" };
  const unixSeconds = Math.floor(Date.now() / 1000);
  Object.assign(claims, { exp: unixSeconds + validDurationInSeconds });

  const s = [header, claims]
    .map(JSON.stringify)
    .map((v) => v.toUTF8())
    .map((v) => v.toString("base64url"))
    .join(".");

  const h = require("crypto").createHmac("sha256", key);
  return s + "." + h.update(s).digest().toString("base64url");
}

function jwt(r) {
  const s = r.variables;
  const claims = {
    //iss: r.variables.server_name,
    //sub: r.variables.shib_remote_user,
    //groups: r.variables.shib_remote_groups.split(";"),

    iss: "nginx",
    sub: "alice",
    foo: 123,
    bar: "qq",
    xyz: false,
  };

  const generatedJwt = generate_hs256_jwt(claims, process.env.JWT_GEN_KEY, 600);

  return generatedJwt;
}

export default { jwt };
