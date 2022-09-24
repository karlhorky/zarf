import { BunTea } from "../src"

interface AppLocals {
    user: string
}

const app = new BunTea<AppLocals>()

app.get("/hello", (ctx) => {
    return ctx.json({
        hello: "hello"
    })
})

app.post("/hello", async(ctx) => {
    const { request } = ctx
    const body = await request?.json() // await request.text()
    // do something with the body
    return ctx.json(body)
})


app.get("/text", (ctx) => {
    return ctx.text("lorem ipsum", {
        status: 404,
        statusText: "created"
    })
})

app.get<{ name: string, title: string }>("/user/:name/books/:title", (ctx, params) => {
    const { name, title } = params
    return ctx.json({
        name,
        title
    })
})

app.get<{ name: string }>("/user/:name?", (ctx, params) => {
    const { name } = params
    return ctx.json({
        name
    })
})

app.get<{ all : string }>("/admin/*all", (ctx, params) => {
    return ctx.json({
        name: params.all
    })
})

app.get<{ brand: string, name: string }>("/v1/*brand/shop/*name", (ctx, params) => {
    return ctx.json({
        params
    })
})

app.get("/send", async (ctx) => {
    return ctx.send(Bun.file("./README.md"))
})

app.get("/", (ctx) => {
    return ctx.html(`Welcome to Bun-Tea App server`)
})

app.listen({
    port: 3000
}, (server) => {
    console.log(`Server started on ${server.port}`)
})
