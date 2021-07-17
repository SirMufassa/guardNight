
$(document).ready(function() {

    firebase.auth().onAuthStateChanged((user) => {
        if (user) {

            // redirection
            window.location.replace('../index.html')
            var uid = user.uid


        } else {
            //
            console.log('No loged.')
        }
      });

    function login (mail, pass) {

        firebase.auth().signInWithEmailAndPassword(mail, pass)
            .then((userCredential) => {
                
                var user = userCredential.user

                localStorage.setItem('uid', user.uid)
                localStorage.setItem('email', user.email)

                window.location.replace('../index.html')
                // console.log(user)
                // console.log({'user id ' : localStorage.getItem('uid')})
                // console.log({'email' : localStorage.getItem('email')})

            })
            .catch((error) => {
                var errorCode = error.code;
                var errorMessage = error.message;

                alert(errorMessage)
                //
            })

    }

    $("#my_form").submit(function(e) {
        e.preventDefault()
        login($("#mail").val(), $("#pass").val())
    })

})