var app = new VTTCue({
    el:'#app',
    data:{
        content:'hello world'
    }
})

setTimeout(function(){
    app.$data.content = 'bye world';//改变content值
},1000)
