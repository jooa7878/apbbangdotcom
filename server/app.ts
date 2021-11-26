import express from 'express';

const app = express();
app.use(express.static('build'));

app.get('/', (req,res)=>{
  res.sendFile(__dirname +'/build/index.html');
})

app.listen(3000, ()=>{
  console.log('server is running!');
})