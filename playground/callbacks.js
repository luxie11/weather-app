var getUser = (id,callback) => {
    var user ={
        id: id,
        name:"Lukas"
    };
    setTimeout(()=>{
        callback(user);
    },3000);
};

getUser(52,(user)=> {
console.log(user);
});