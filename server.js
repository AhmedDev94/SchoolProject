// IMPORT APP FILE
const app = require ("./backend/app");
//make server listening on port 3000

app.listen(process.env.PORT,()=>{
    console.log(`BE server is listening on PORT ${process.env.PORT}....`) 
});