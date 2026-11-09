import { createServer } from "node:http";
import { readFile } from "node:fs/promises";
import { fileURLToPath } from "node:url";
import { resolve, sep, extname } from "node:path";
const root = fileURLToPath(new URL("../dist/",import.meta.url));
const types={".html":"text/html; charset=utf-8",".css":"text/css",".js":"text/javascript",".json":"application/json",".svg":"image/svg+xml"};
createServer(async (req,res) => {
  try {
    const pathname = decodeURIComponent(new URL(req.url,"http://localhost").pathname);
    const file = resolve(root,"."+(pathname === "/" ? "/index.html" : pathname));
    if (!file.startsWith(root.endsWith(sep) ? root : root+sep)) { res.writeHead(403).end(); return; }
    const body = await readFile(file);
    res.writeHead(200,{"Content-Type":types[extname(file)] || "application/octet-stream", "X-Content-Type-Options":"nosniff"});
    res.end(body);
  } catch { if (!res.headersSent) res.writeHead(404); res.end("Not found"); }
}).listen(Number(process.env.PORT || 4173),"127.0.0.1",() => console.log(`Website: http://localhost:${process.env.PORT || 4173}`));
