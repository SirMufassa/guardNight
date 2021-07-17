$(document).ready(function() {

    firebase.auth().onAuthStateChanged((user) => {
        if (user) {

         //
            console.log('No loged.')
         // redirection


        } else {
        
            window.location.replace('login/login.html')
            var uid = user.uid
        }
      })

    function logout() {
        firebase.auth().signOut().then(() => {
            // Sign-out successful.
            window.location.replace('login/login.html')
          }).catch((error) => {
            // An error happened.
          })
    }

    $("#logout").click(function(e) {
        e.preventDefault()
        logout()
    })
})