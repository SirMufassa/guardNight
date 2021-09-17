$(document).ready(function() {

    var row = ``
    var tableau = []
    let lastDoc = null
    let firstDoc = null

    const first = db.collection("insec_audio").orderBy('user.username').limit(10).get()

    first
        .then((querySnapshot) => {

            lastDoc = querySnapshot.docs[querySnapshot.docs.length-1] || null
            firstDoc = querySnapshot.docs[0] || null

            $('#data').empty()

            querySnapshot.forEach((doc) => {
                showList(doc)

            })
        })
        .catch(error => {
            console.log(error)
        })


    function previousPage() {

        const next = db.collection("insec_audio").orderBy('user.username').endBefore(firstDoc).limit(10).get()

        next
            .then((querySnapshot) => {

                lastDoc = querySnapshot.docs[querySnapshot.docs.length-1] || null
                firstDoc = querySnapshot.docs[0] || null

                $('#data').empty()

                querySnapshot.forEach((doc) => {
                    showList(doc)
                    console.log(doc.id)
                })
            })
            .catch(error => {
                console.log(error)
            })
     
    }

    function nextPage(){

        const next = db.collection("insec_audio").orderBy('user.username').startAfter(lastDoc).limit(10).get()

        next
            .then((querySnapshot) => {

                lastDoc = querySnapshot.docs[querySnapshot.docs.length-1] || null
                firstDoc = querySnapshot.docs[0] || null

                $('#data').empty()

                querySnapshot.forEach((doc) => {
                    showList(doc)
                    console.log(doc.id)
                })
            })
            .catch(error => {
                console.log(error)
            })

    }

        $(`#next`).click((e) => {

            // if(lastDoc === null){
            //     $(`#nex`).addClass("disabled")
            // }
         
            // if(firstDoc !== null){
            //     $(`#prev`).removeClass("disabled")
            // }

            nextPage()
        })

        $(`#previous`).click((e) => {

            // if(firstDoc === null){
            //     $(`#prev`).addClass("disabled")
            // } 
            // if(lastDoc !== null){
            //     $(`#nex`).removeClass("disabled")
            // }

            previousPage()
        })
    
    //affichage des elements
    function showList(doc){
        // avoid show the document with ID new, it's for debug purpose only
                
                // if(doc.id === 'new') return;
                tableau.push(1)
                // console.log(doc.data())

                row = `  <div class="sl-item" id=${[tableau.length-1]}>
                            <div class="sl-left bg-success"> <i class="fa fa-user"></i></div>
                            <div class="sl-right">
                                <div><a href="#">${[doc.data().user.username]} ${[doc.data().senderPhone]}</a> <span class="sl-date">5 minutes ago</span>
                                </div>
                                <div class="desc" id=${[doc.id]}>
                                    <br>

                                        <audio controls>
                                            <source src="${doc.data().remotePath}.mp3" type="audio/mp3"> 
                                        </audio>

                                    <br>
                                    
                                    <div class="row">
                                    
                                        <div class="col-xl-4 col-lg-4 col-md-4 col-sm-4 col-4">

                                            <a href="${doc.data().remotePath}" download="audio${[doc.data().senderPhone]}"
                                                class="btn m-t-10 m-r-5 btn-rounded btn-outline-success" id="download${[tableau.length-1]}">
                                                <i class="fa  fa-download"></i></a>
                                            </a>
                                        
                                        </div>

                                        <div class="col-xl-4 col-lg-4 col-md-4 col-sm-4 col-4">

                                            <a href="javascript:void(0)"
                                                class="btn m-t-10 m-r-5 btn-rounded btn-outline-warning"
                                                id="map${[tableau.length-1]}">
                                                <i class="fa fa-map"></i></a>
                                            </a>

                                        </div>

                                        <div class="col-xl-4 col-lg-4 col-md-4 col-sm-4 col-4">

                                            <a href="javascript:void(0)"
                                                class="btn m-t-10 btn-rounded btn-outline-danger" data-toggle="modal" data-target="#exampleModal${[tableau.length-1]}" id="${[tableau.length-1]}">
                                                <i class="fa fa-trash"></i></a>
                                            </a> 

                                        </div>

                                    </div>

                                    <div class="modal fade" id="exampleModal${[tableau.length-1]}" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
                                        <div class="modal-dialog" role="document">
                                            <div class="modal-content">
                                                <div class="modal-header">
                                                    <h5 class="modal-title" id="exampleModalLabel"> Voulez-vous vraiment supprimer cet élément ? </h5>
                                                    <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                                                        <span aria-hidden="true">&times;</span>
                                                    </button>
                                                </div>
                                        
                                                <div class="modal-footer">
                                                    <button type="button" class="btn btn-secondary" data-dismiss="modal">Annuler</button>
                                                    <button type="button" class="btn btn-primary delete" id="trash${[tableau.length-1]}" data-dismiss="modal">Confirmer</button>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                </div>
                            </div>
                        </div>
                    `
                
                $('#data').append(row)
                // console.log(`${doc.id} => ${doc.data().avenue}`)

                // $(`#download${[tableau.length-1]}`).click((e) => {
                //     e.preventDefault()
                //     window.location = doc.data().remotPath
                // })

                $(`#trash${[tableau.length-1]}`).click((e) => {

                    // console.log(doc.id)
                    e.preventDefault()
                    supprimer(doc.id)
                        //  alert("Action successfully executed")

                })

                $(`#map${[tableau.length-1]}`).click((e) => {
                    newLocation(doc.data().geoPoint._lat, doc.data().geoPoint._long)
                })
    }

    //delete
    function supprimer(id){
        
        db.collection("insec_audio").doc(id).delete()
            .then((docRef) => {
                var row = `<div class="alert alert-success" role="alert">
                    Objet supprimé avec succès !
                </div>`
        
                $('#element').append(row)
        
                setTimeout(function () {
                    $('#element').remove()
                }, 3000)
        })
            .catch((error) => {
            //   console.error("Error deleting document")
              var row = `<div class="alert alert-danger" role="alert">
                    L'objet n'a pas pu être supprimé !
                </div>`
        
                $('#element').append(row)
        
                setTimeout(function () {
                    $('#element').remove()
                }, 3000)
        })

    }

    //lecture

    // etat : lu ou pas ?

    $(window).bind("load", () => {
        $("#filtre").on("keyup", function() {
            var value = $(this).val().toLowerCase()
            $("#data .sl-item").filter(function() {
              $(this).toggle($(this).text().toLowerCase().indexOf(value) > -1)
            })
        })
    })
})