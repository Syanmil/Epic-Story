cekRegister: function(){
  $('#registerIt')
  .form({
    fields: {
      email: {
        identifier  : 'email',
        rules: [
          {
            type   : 'empty',
            prompt : 'Please enter your email'
          },
          {
            type   : 'email',
            prompt : 'Please enter valid email'
          }
        ]
      },
      password: {
        identifier  : 'password',
        rules: [
          {
            type   : 'empty',
            prompt : 'Please enter your password'
          },
          {
            type   : 'length[6]',
            prompt : 'Your password must be at least 6 characters'
          }
        ]
      },
      username: {
        identifier  : 'username',
        rules: [
          {
            type   : 'empty',
            prompt : 'Please enter your username'
          },
          {
            type   : 'length[6]',
            prompt : 'Your username must be at least 6 characters'
          }
        ]
      }
    }
  })
}
