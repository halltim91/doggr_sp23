import Fastify from "fastify";
import config from "./db/mikro-orm.config.js";
import {FastifyMikroOrmPlugin} from "./plugins/mikro.js";
import {FastifySearchHttpMethodPlugin} from "./plugins/http_search.js";
import NpcRoutes from "./myRoutes.js";

const app = Fastify();

await app.register(FastifyMikroOrmPlugin, config);
await app.register(FastifySearchHttpMethodPlugin);
await app.register(NpcRoutes);

export default app;
