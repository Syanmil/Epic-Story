var app = new Vue({
  el: '#app',
  data: {
    message: 'Hello World!!!',
    authenticated: false,
    page: "home",
    username: '',
    password: '',
    email: '',
    items: [],
    showed: false,
    checkName: ''
  },
  methods: {
    login: function(){
      app.page = 'login'
    },
    logout: function(){
      sessionStorage.clear();
      app.authenticated = false
      app.page = 'landing'
    },
    register: function(){
      app.page = 'register'
    },
    signin: function(){
      axios.post('http://localhost:3000/api/users/login', {
        username: app.username,
        password: app.password
      })
      .then(function(response){
        sessionStorage.setItem('token', response.data.token)
        sessionStorage.setItem('user', response.data.username)
        app.message = sessionStorage.getItem('user')
        if(response.data.token){
          app.page = 'home'
          app.authenticated = true
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
          app.page = 'login'
        }
      })
    },
    populate: function(number){
      let cards = app.dataset(18)
      let clones = []
      for (var i = 0; i < number; i++){
        let select = Math.floor(Math.random()*cards.length)
        let card = cards.splice(select, 1)
        card[0].isShow = false;
        clones.push(card[0])
      }

      let copy = clones.map(function(cops){
        return Object.assign({}, cops)
      })
      copy.forEach(function(cops){
        cops.pair = 'bas'
      })
      clones.forEach(function(clone){
        clone.pair= 'das'
      })

      app.items = copy.concat(clones)
      arrayShuffle(app.items)
    },
    dataset: function(number){
      var result = []
      for (var i = 1; i <= number; i++){
        result.push({image: "asset/s"+i+".jpeg"})
      }
      return result
    },
    startgame: function(){
      app.populate(8)
      app.page = 'play'
    },
    openCard: function(clicked, clickod, index) {
      if(app.checkName){
        setTimeout(app.closeCard, 1000)
      }
      app.checkName = clicked+" "+clickod
      console.log(app.checkName);
      app.items[index].isShow = true
    },
    closeCard: function(){
      app.checkName = ''
      app.items.forEach(function(item){
        item.isShow = false
      })
    }
  }
})
setInterval(function(){
  app.closeCard()
}, 10000);
function arrayShuffle(o) {
    for(var j, x, i = o.length; i; j = parseInt(Math.random() * i), x = o[--i], o[i] = o[j], o[j] = x);
    return o;
}
