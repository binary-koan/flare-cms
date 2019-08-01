import feathers from "@feathersjs/feathers"

const log: feathers.Hook = context => {
  if (context.type === "before") {
    console.log(`${context.method.toUpperCase()} ${context.path} received`)
  }

  if (context.type === "after") {
    console.log(`${context.method.toUpperCase()} ${context.path} done`)
  }

  if (context.type === "error") {
    console.error(context.error)
  }
}

export default log
