export default {
  async fetch(request, env, ctx) {
    const targetHost = "www.huzhan.com";
    const url = new URL(request.url);

    url.hostname = targetHost;
    url.protocol = "https:";

    const newHeaders = new Headers(request.headers);
    newHeaders.set("Host", targetHost);
    newHeaders.delete("cf-worker");

    const newRequest = new Request(url, {
      method: request.method,
      headers: newHeaders,
      body: request.body,
      redirect: "manual"
    });

    try {
      const response = await fetch(newRequest);
      const resHeaders = new Headers(response.headers);
      const loc = resHeaders.get("Location");
      if (loc && loc.startsWith(`https://${targetHost}`)) {
        resHeaders.set("Location", loc.replace(`https://${targetHost}`, ""));
      }
      return new Response(response.body, {
        status: response.status,
        statusText: response.statusText,
        headers: resHeaders
      });
    } catch (err) {
      return new Response(`代理异常：${err.message}`, { status: 524 });
    }
  },
};
