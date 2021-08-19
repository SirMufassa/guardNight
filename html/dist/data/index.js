$(document).ready(function() {

    var alertes = []
    var row_alrt = ``
    var stations = []
    var row_stat = ``
    var row_users = ``

    db.collection("insec_audio").get()
        .then((querySnapshot) => {

            alertes.push(1)

            querySnapshot.forEach((doc) => {
                row_alrt = `  <div class="sl-item" id=${[alertes.length-1]}>
                                <div class="sl-left bg-success"> <i class="fa fa-user"></i></div>
                                <div class="sl-right">
                                    <div><a href="#">SenderPhone</a> <span class="sl-date">5 minutes ago</span>
                                    </div>
                                    <div class="desc" id=${[doc.id]}>Approve meeting with tiger
                                        <br>
                                        <a href="javascript:void(0)"
                                            class="btn m-t-10 m-r-5 btn-rounded btn-outline-success" id="play${[alertes.length-1]}">
                                            <i class="fa fa-play-circle-o"></i></a>
                                        </a>          
                                    </div>
                                </div>
                            </div>`

                $('#alertes').append(row_alrt)
            })
        })
        
        .catch((err) => {
            console.log(err)
        })

    db.collection("police").get()
        .then((querySnapshot) => {
    
            querySnapshot.forEach((doc) => {
                row_stat = `<tr>
                                <td class="text-center"></td>
                                <td class="txt-oflo">${doc.data().designation}</td>
                                <td> <span class="text-info"> ${doc.data().phones.DP1} </span> </td>
                                <td><span class="text-info">${doc.data().phones.DP1}</span></td>
                                <td><span class="text-success">${doc.data().stationCode}</span></td>
                            </tr>`

                $('#polices').append(row_stat)
                console.log(doc)
            })
        })
        
        .catch((err) => {
            console.log(err)
        })

    db.collection("users").get()
        .then((querySnapshot) => {
    
            querySnapshot.forEach((doc) => {
                row_users = `<a href="javascript:void(0)">
                                <div class="user-img"> <img src="../assets/images/users/1.jpg" alt="user"
                                        class="img-circle"> <span
                                        class="profile-status online pull-right"></span> </div>
                                <div class="mail-contnet">
                                    <h5>Pavan kumar</h5> <span class="mail-desc">Lorem Ipsum is simply dummy
                                        text of the printing and type setting industry. Lorem Ipsum has
                                        been.</span> <span class="time">9:30 AM</span>
                                </div>
                            </a>`

                $('users').append(row_stat)
            })
        })
        
        .catch((err) => {
            console.log(err)
        })
})