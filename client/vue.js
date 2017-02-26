var app = new Vue({
  el: '#app',
  data: {
    message: 'Hello World!!!',
    authenticated: false,
    page: "leaderboard",
    username: '',
    password: '',
    email: '',
    items: [],
    guess: 0,
    success: 0,
    checkName: [],
    bonus: 0,
    numberOfPair : 8,
    endScore: 0,
    startingPoin: 1000,
    highscore: [],
    play: false,
  },
  methods: {
    gotohome: function() {
      app.page = 'home';
    },
    gotolanding: function(){
      app.page = 'landing';
    },
    gotoleaderboard: function() {
      app.page = 'leaderboard';
      app.play= false;
      app.ranking();
    },
    login: function(){
      app.page = 'login';
    },
    isLogin: function() {
      if(sessionStorage.getItem('token')){
        app.authenticated = true;
      }
    },
    logout: function(){
      sessionStorage.clear();
      app.authenticated = false;
      app.page = 'landing';
    },
    register: function(){
      app.page = 'register';
    },
    signin: function(){
      axios.post('http://localhost:3000/api/users/login', {
        username: app.username,
        password: app.password
      })
      .then(function(response){
        sessionStorage.setItem('token', response.data.token)
        sessionStorage.setItem('user', response.data.username)
        if(response.data.token){
          app.page = 'home';
          app.authenticated = true;
        }
      })
    },
    signup: function(){
      axios.post('http://localhost:3000/api/users/register', {
        username: app.username,
        password: app.password,
        email: app.email
      })
      .then(function(response) {
        if(response.data.username){
          app.page = 'login';
        }
      })
    },
    populate: function(number){
      let cards = app.dataset(18);
      let clones = [];
      for (var i = 0; i < number; i++){
        let select = Math.floor(Math.random()*cards.length)
        let card = cards.splice(select, 1)
        card[0].isShow = false;
        card[0].paired = false;
        clones.push(card[0]);
      }
      let copy = clones.map(function(cops){
        return Object.assign({}, cops);
      })
      copy.forEach(function(cops){
        cops.pair = 'bas';
      })
      clones.forEach(function(clone){
        clone.pair= 'das';
      })

      app.items = copy.concat(clones);
      arrayShuffle(app.items);
    },
    dataset: function(number){
      var result = [];
      for (var i = 1; i <= number; i++){
        result.push({image: "asset/s"+i+".jpeg"});
      }
      return result;
    },
    startgame: function(){
      app.populate(app.numberOfPair);
      app.page = 'play';
      setInterval(function(){
        app.bonus -= 50;
      }, 5000)
    },
    openCard: function(name, code, index) {
      if(app.checkName[1]){
        app.closeCard();
      } else {
        app.checkName.push({name: name, code: code, index: index});
        app.checkCard();
        app.items[index].isShow = true;
      }
    },
    checkCard(){
      let firstCard = app.checkName[0];
      let secondCard = app.checkName[1];
      if(secondCard){
        if (app.items[firstCard.index].paired || app.items[secondCard.index].paired){
          console.log('Already opened card');
        } else if (firstCard.name == secondCard.name && secondCard.code != firstCard.code) {
          app.success += 1
          app.items[firstCard.index].paired = true
          app.items[secondCard.index].paired = true
        } else {
          app.guess+=1;
        }
        setTimeout(app.closeCard, 1000);
      }
      if(app.success == app.numberOfPair){
        app.page = 'leaderboard';
        app.endScore = app.currentGameScore;
        app.sendScore();
        app.play = true;
      }
    },
    closeCard: function(){
      app.checkName = [];
      app.items.forEach(function(item){
        if(!item.paired){
          item.isShow = false;
        }
      })
    },
    sendScore(){
      axios.post('http://localhost:3000/api/leaderboard', {
        playerName: sessionStorage.getItem('user'),
        playerScore: app.endScore
      })
      .then(function(){
        app.ranking();
      })
    },
    ranking(){
      axios.get('http://localhost:3000/api/leaderboard')
      .then(function(response){
        app.highscore = response.data;
      })
    }
  },
  computed: {
    currentGameScore: function(){
      return app.startingPoin + this.guess*(-100) + this.success*400 + app.bonus
    }
  }
})
setInterval(function(){
  app.closeCard();
}, 10000);
function arrayShuffle(o) {
    for(var j, x, i = o.length; i; j = parseInt(Math.random() * i), x = o[--i], o[i] = o[j], o[j] = x);
    return o;
}
app.isLogin()
