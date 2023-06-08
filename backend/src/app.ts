import Fastify from "fastify";
import cors from "@fastify/cors";
import config from "./db/mikro-orm.config.js";
import {FastifyMikroOrmPlugin} from "./plugins/mikro.js";
import {FastifySearchHttpMethodPlugin} from "./plugins/http_search.js";
import NpcRoutes from "./myRoutes.js";
import { FastifyFireBasePlugin } from "./plugins/Firebase.js";
import FireBaseRoutes from "./routes/FireBaseRoutes";

const app = Fastify();

await app.register(cors, {
	origin: "*",
	methods: "*"
});
await app.register(FastifyFireBasePlugin);
// await app.register(FireBaseRoutes);
await app.register(FastifyMikroOrmPlugin, config);
await app.register(FastifySearchHttpMethodPlugin);
await app.register(NpcRoutes);

export default app;
