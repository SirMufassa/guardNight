$(document).ready(function() {

    var row = ``
    var tableau = []

    // get all
    db.collection("police").get()
        .then((querySnapshot) => {
    
            querySnapshot.forEach((doc) => {
                tableau.push(doc.id)

                row = `  <div class="col-md-4">
                            <div class="card">
                                <div class="card-body">
                                    <h5 class="card-title">${[doc.data().designation]}</h5>
                                    <p class="card-text"></p>
                                    <a href="#" class="btn btn-outline-success" data-toggle="modal" data-target="#${[doc.id]}">
                                            <i class="fa fa-edit"></i>
                                    </a>
                                    <a href="#" class="btn btn-outline-danger" id="trash${[tableau.length-1]}">
                                            <i class="fa fa-trash"></i>
                                    </a>
                                    </a>
                                </div>
                            </div>
                        </div> 
                        
                        <div class="modal fade" id="${[doc.id]}" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
                            <div class="modal-dialog" role="document">
                                <div class="modal-content">
                                    <div class="modal-header">
                                        <h5 class="modal-title" id="exampleModalLabel">Modifier ${[doc.data().designation]}</h5>
                                        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                                            <span aria-hidden="true">&times;</span>
                                        </button>
                                    </div>
                                    <div class="modal-body">
                                        
                                    
                                        <div class="form-group">
                                            <div class="col-md-12">
                                                <input type="text" placeholder="Designation" id="designation${[doc.id]}"
                                                    class="form-control form-control-line">
                                            </div>
                                        </div>
                
                                        <div class="form-group">
                                            <div class="col-md-12">
                                                <input type="text" placeholder="Avenue" id="avenue${[doc.id]}"
                                                    class="form-control form-control-line">
                                            </div>
                                        </div>
                
                
                                        <div class="form-group">
                                            <div class="col-md-12">
                                                <input type="text" placeholder="Code Station" id="stationcode${[doc.id]}"
                                                    class="form-control form-control-line">
                                            </div>
                                        </div>
                
                                        <div class="form-group">
                                            <div class="col-md-12">
                                                <input type="text" placeholder="DP1" id="DP1${[doc.id]}"
                                                    class="form-control form-control-line">
                                            </div>
                                        </div>
                
                
                                        <div class="form-group">
                                            <div class="col-md-12">
                                                <input type="text" placeholder="DP2" id="DP2${[doc.id]}"
                                                    class="form-control form-control-line">
                                            </div>
                                        </div>
                
        


                                    </div>
                                    <div class="modal-footer">
                                        <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
                                        <button type="button" class="btn btn-primary" id="edit${[tableau.length-1]}">Save changes</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                        `

                $('#data').append(row)
                
                $(`#edit${[tableau.length-1]}`).click((e) => {
                    // modal
                    // var pid = $(this).parent().attr("id")
                    e.preventDefault()
                    edit(doc.id)
                })

                $(`#trash${[tableau.length-1]}`).click((e) => {
                    // confirmer
                    let confirmAction = confirm("Are you sure to execute this action?")

                    if (confirmAction) {
                        e.preventDefault()
                        supprimer(doc.id)
                        console.log('trash ' + doc.id)
                        alert("Action successfully executed")
                    } else {
                        e.preventDefault()
                        alert("Action canceled")
                    }
                    
                })
                
            })
        })
        
        .catch((err) => {
            console.log(err)
        })

    //add

    function ajouter(){
        // Add a second document with a generated ID.
        db.collection("police").add({

            adresse : { avenue : $("#avenue").val()}, // que contient une adresse, en dehors de l'avenue ?
            designation : $("#designation").val(), // est-ce que unique ? 
            // geopoint : , // comment faire pour prendre les deux ? //simulation
            phones : {
                DP1 : $("#DP1").val(),
                DP2 : $("#DP2").val()
            },
            stationCode : $("#stationCode").val(), // est-ce que automatique ?

        })
        .then((docRef) => {
            console.log("Document written with ID: ", docRef.id)
            // alert()
        })
        .catch((error) => {
            console.error("Error adding document: ", error)
            // alert()
        })
    }

    $('#ajouter').click(e => {
        e.preventDefault()
        ajouter()
    })
    //modifier

    function edit(id){

        db.collection("police").doc(id).update({

            adresse : { avenue : $("#avenue" + id).val()}, // que contient une adresse, en dehors de l'avenue ?
            designation : $("#designation" + id).val(), // est-ce que unique ? 
            // geopoint : , // comment faire pour prendre les deux ? //simulation
            phones : {
                DP1 : $("#DP1" + id).val(),
                DP2 : $("#DP2" + id).val()
            },
            stationCode : $("#stationCode" + id).val(), // est-ce que automatique ?

        })
            .then((docRef) => {
                console.log("Document updated with ID: ", docRef.id);
            })
            .catch((error) => {
                console.error("Error updating document: ", error);
            })

    }

    //delete

    function supprimer(id){
        
          db.collection("police").doc(id).delete()
            .then((docRef) => {
                console.log("Document deleted with ID: ", docRef.id);
            })
            .catch((error) => {
                console.error("Error deleting document: ", error);
            })

    }
})