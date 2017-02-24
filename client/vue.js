var app = new Vue({
  el: '#app',
  data: {
    message: 'Hello World!!!',
    authenticated: false,
    page: "home",
    username: '',
    password: '',
    email: '',
    items: []
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
      for (var i = 0; i < number; i++){
        let select = Math.floor(Math.random()*cards.length)
        let card = cards.splice(select, 1)
        app.items.push(card[0])
        app.items.push(card[0])
      }
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
    }
  }
})
function arrayShuffle(o) {
    for(var j, x, i = o.length; i; j = parseInt(Math.random() * i), x = o[--i], o[i] = o[j], o[j] = x);
    return o;
}
