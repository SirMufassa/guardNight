$(document).ready(function() {

    var row = ``
    var tableau = []

    //get all
    db.collection("insec_audio").get()
        .then((querySnapshot) => {
    
            querySnapshot.forEach((doc) => {

                // avoid show the document with ID new, it's for debug purpose only
                
                // if(doc.id === 'new') return;
                tableau.push(1)

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
                                    
                                    <a href="${doc.data().remotePath}" download="audio${[doc.data().senderPhone]}"
                                        class="btn m-t-10 m-r-5 btn-rounded btn-outline-success" id="download${[tableau.length-1]}">
                                        <i class="fa  fa-download"></i></a>
                                    </a>

                                    <a href="javascript:void(0)"
                                        class="btn m-t-10 m-r-5 btn-rounded btn-outline-warning">
                                        <i class="fa fa-map"></i></a>
                                    </a>

                                    <a href="javascript:void(0)"
                                        class="btn m-t-10 btn-rounded btn-outline-danger" data-toggle="modal" data-target="#exampleModal${[tableau.length-1]}" id="${[tableau.length-1]}">
                                        <i class="fa fa-trash"></i></a>
                                    </a> 

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

            })
        })
        
        .catch((err) => {
            console.log(err)
        })

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