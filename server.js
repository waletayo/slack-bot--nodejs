const SlackBot= require('slackbots');
const axios =require('axios');
const bot = new SlackBot({
    token:"xoxb-508986562000-508990109728-Zi2jmrgSzUULevDS1YNPU53Q",
    name:"jokebot"
});
//start handler
bot.on('start',()=>{
    const params={
        icon_emoji: ':smiley:'
    }
    bot.postMessageToChannel("general","Get ready to laugh with @Jokebot"),
        params
});

//error handler
bot.on('error',(err)=> console.log(err));

//message handler
bot.on('message',(data)=>{
   if (data.type!=="message"){
       return;
   }
   handleMessage(data.text);
});
function  handleMessage(message) {
    if (message.includes(' chucknorris')){
        chuckJoke();
    }else if (message.includes(' yomama')){
        yomamajoke();
    }else if (message.includes('random')){
        randomjoke();
    }else if (message.includes('help')){
        runHelp();
    }
}
//tell chuck jokes
function  chuckJoke() {
    axios.get("http://api.icndb.com/jokes/random")
        .then(res=>{
            const joke= res.data.value.joke;
            console.log(res);
            console.log(joke);

            const params={
                icon_emoji: ':laughing:'
            };
            bot.postMessageToChannel(
                "general",
                `Chuck Norris : ${joke}`,
                params
            )
        })

}
function  yomamajoke() {
    axios.get("http://api.yomomma.info")
        .then(res=>{
            const joke= res.data.joke;
            console.log(res);
            console.log(joke);

            const params={
                icon_emoji: ':laughing:'
            };
            bot.postMessageToChannel(
                "general",
                `YO Mama: ${joke}`,
                params
            )
        })

}
//tell a random joke
function randomjoke(){
    const rand=Math.floor(Math.random()*2)+1;
    if (rand ===1){
        chuckJoke()
    } else if (rand ===3){
        yomamajoke();
    }
}

//show help text
function runHelp() {
    const params={
        icon_emoji: ":question:"
    };
    bot.postMessageToChannel("general", `Type @jokebot with either 'chucknorris', 'yomama' or 'random' to get a joke `,params);

}