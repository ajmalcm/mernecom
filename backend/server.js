const app=require("./app");
const dotenv=require("dotenv");
const clodinary=require("cloudinary")
dotenv.config();

//to handle unCaought exception -->(this occurs whenever we try log or use something we never defined and etc.)

process.on("uncaughtException",(err)=>{
    console.log(`error:${err.message}`);
    console.log("shutting down server due to uncaught exception.");

    server.close(()=>{
        process.exit(1)
    })
})


// clodinary.config({
//     cloud_name:process.env.CLOUD_NAME,
//     api_key:process.env.CLOUD_API_KEY,
//     api_secret:process.env.CLOUD_API_SECRET
// })

//listener
const PORT=process.env.PORT || 5000;
const server=app.listen(PORT,()=>{
    console.log(`listening on http://localhost:${PORT}`)
})


//to handle unhandledPromeiseRejection ->(this occurs when there some errors like connection string error etc);
process.on("unhandledRejection",(err)=>{
    console.log(`error:${err.message}`);
    console.log("Shutting down the server due to unhandled promise rejection.");

    process.exit(1);
})

clodinary.config({
    cloud_name:process.env.CLOUD_NAME,
    api_key:process.env.CLOUD_APIKEY,
    api_secret:process.env.CLOUD_APISECRET
})

