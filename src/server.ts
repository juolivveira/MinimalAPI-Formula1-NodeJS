import fastify from "fastify";
import cors from "@fastify/cors"

const server = fastify({logger: true});

server.register(cors, {
    origin: "*",
});

const teams = [

    {id: 1, name: "Ferrari", base: "Maranello, Italy"},
    {id: 2, name: "Mercedes", base: "Brackley, United Kingdom"},
    {id: 3, name: "McLaren", base: "Woking, United Kingdom"},
];

const drivers = [

    {id: 1, name: "Charles Leclerc", team: "Ferrari"},
    {id: 2, name: "George Russell", team: "Mercedes"},
    {id: 1, name: "Lando Norris", team: "McLaren"},
];

server.get("/teams", async (request, response) => {
    response.type("application/json").code(200);
    return {teams};
});

server.get("/drivers", async (request, response) => {
    response.type("application/json").code(200);
    return {drivers};
});

server.get<{Params: RouteParams}>("/drivers/:id", async(request, response)=>{
    const id = parseInt(request.params.id);
    const driver = drivers.find( d => d.id === id);
    if (!driver) {
        response.type("application/json").code(404);
        return { message: "Driver Not Found"}
    }else{
        response.type("application/json").code(200);
        return { driver };
    };
});

server.listen({port: 3333},  () => {
    console.log("Server iniciado")
});