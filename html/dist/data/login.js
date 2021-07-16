// db.collection("users").where("", "", "").where("", "", "")
//     .get()
//         .then((querySnapshot) => {
    
//             querySnapshot.forEach((doc) => {
//                 console.log(`${doc.id} => ${doc.data().avenue}`)
//             }) 

//         })

//         .catch(err  => {
//             console.log(err)
//         })
$(document).ready(function() {

    firebase.auth().onAuthStateChanged((user) => {
        if (user) {
          // User is signed in, see docs for a list of available properties
          // https://firebase.google.com/docs/reference/js/firebase.User
            console.log('is log')
          var uid = user.uid;
          // ...
        } else {
            console.log('is not loged')
          // User is signed out
          // ...
        }
      });

    function login (mail, pass) {

        firebase.auth().signInWithEmailAndPassword(mail, pass)
            .then((userCredential) => {
                // Signed in
                alert('in the mood')
                var user = userCredential.user;
                // ...
            })
            .catch((error) => {
                var errorCode = error.code;
                var errorMessage = error.message;

                alert(errorMessage)
            })

    }

    $("#my_form").submit(function(e) {
        e.preventDefault()
        login($("#mail").val(), $("#pass").val())
    });

})