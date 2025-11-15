const express=require('express');
const app=express();

app.use(express.json());

app.use((req, res, next) => {
    const now = Date.now();
    console.log(`mid Time`,Date.now());//요청 시간 출력
    console.log(`request logging: ${req.method} ${req.url}`);// HTTP 메소드, 요청 URL 로그 출력
    next(); // 다음 미들웨어 또는 라우터로 제어 전달
});

const items = [];
const users=[];

//POST 메소드
app.post('/items',(req,res)=>{
    console.log('app Time:',Date.now());
    try{
        const {name}=req.body;
        if(!name){
            return res.status(400).json({status:'error',message:'Name is required',data:null});
        }
        if (name === 'error') {
            throw new Error('고의로 발생시킨 서버 에러');
        }
        const newItem={id:items.length,name};
        items.push(newItem);
        res.status(201).json({status:'success',data:newItem});
    } catch(err){
        return res.status(500).json({status:'error',message:'Server error',data:null});
    }
});

app.post('/users',(req,res)=>{
    console.log('app Time:',Date.now());
    const{username}=req.body;
    if (!username){
        return res.status(400).json({ status: 'error', message: 'Username required', data: null });
    }
    const newUser={id:users.length+1,username};
    users.push(newUser);
    res.status(201).json({status:'success',data:newUser});
});

//GET 메소드
app.get('/items',(req,res)=>{
    console.log('app Time:',Date.now());
    res.status(200).json({status:'success',data:items});
});

app.get('/users/:id',(req,res)=>{
    console.log('app Time:',Date.now());
    const user=users.find(u=>u.id===parseInt(req.params.id));
    if(!user){
        return res.status(404).json({status:'error',message: 'User not found', data: null});
    }
    res.status(200).json({status:'success',data:users});
});

app.get('/maintenance', (req, res) => {
    console.log('app Time:',Date.now());
    return res.status(503).json({ status: 'error', message: 'Service temporarily unavailable', data: null });
});

//PUT 메소드
app.put('/items/:id',(req,res)=>{
    console.log('app Time:',Date.now());
    const item=items.find(i=>i.id===parseInt(req.params.id));
    if(!item){
        return res.status(404).json({status:'error',message:'Item not found',data:null});
    }
    const {name}=req.body;
    if(!name){
        return res.status(400).json({ status: 'error', message: 'Name is required', data: null });
    }
    item.name = name;
    res.status(200).json({ status: 'success', data: item });
});

app.put('/users/:id', (req, res) => {
    console.log('app Time:',Date.now());
    const user = users.find(u => u.id === parseInt(req.params.id));
    if (!user) {
        return res.status(404).json({ status: 'error', message: 'User not found', data: null });
    }
    const { username } = req.body;
    if (!username) {
        return res.status(400).json({ status: 'error', message: 'Username required', data: null });
    }
    user.username = username;
    res.status(200).json({ status: 'success', data: user });
});

//DELETE 메소드
app.delete('/items/:id', (req, res) => {
    console.log('app Time:',Date.now());
    const idx = items.findIndex(i => i.id === parseInt(req.params.id));
    if (idx === -1) {
        return res.status(404).json({ status: 'error', message: 'Item not found', data: null });
    }
    const deleted = items.splice(idx, 1)[0];
    res.status(200).json({ status: 'success', data: deleted });
});


app.delete('/users/:id', (req, res) => {
    console.log('app Time:',Date.now());
    const idx = users.findIndex(u => u.id === parseInt(req.params.id));
    if (idx === -1) {
        return res.status(404).json({ status: 'error', message: 'User not found', data: null });
    }
    const deleted = users.splice(idx, 1)[0];
    res.status(200).json({ status: 'success', data: deleted });
});


const port = 3000;
app.listen(port,()=>{
    console.log(`Server running at http://localhost:${port}/`);
});