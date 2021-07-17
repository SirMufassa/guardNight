$(document).ready(function() {

    var row = ``
    var tableau = []

    //get all
    db.collection("insec_audio").get()
        .then((querySnapshot) => {
    
            querySnapshot.forEach((doc) => {

                // avoid show the document with ID new, it's for debug purpose only
                
                if(doc.id === 'new') return;
                tableau.push(1)

                row = `  <div class="sl-item" id=${[tableau.length-1]}>
                            <div class="sl-left bg-success"> <i class="fa fa-user"></i></div>
                            <div class="sl-right">
                                <div><a href="#">${[doc.data().senderPhone]}</a> <span class="sl-date">5 minutes ago</span>
                                </div>
                                <div class="desc">Approve meeting with tiger
                                    <br><a href="javascript:void(0)"
                                        class="btn m-t-10 m-r-5 btn-rounded btn-outline-success">
                                        <i class="fa fa-play-circle-o"></i></a>
                                    </a>

                                    <a href="javascript:void(0)"
                                        class="btn m-t-10 m-r-5 btn-rounded btn-outline-warning">
                                        <i class="fa fa-map"></i></a>
                                    </a>

                                    <a href="javascript:void(0)"
                                        class="btn m-t-10 btn-rounded btn-outline-danger">
                                        <i class="fa fa-trash"></i></a>
                                    </a> 
                                </div>
                            </div>
                        </div>
                    `
                
                $('#data').append(row)
                // console.log(`${doc.id} => ${doc.data().avenue}`)
            })
        })
        
        .catch((err) => {
            console.log(err)
        })

    //delete

    //lecture

    // etat : lu ou pas ?
})