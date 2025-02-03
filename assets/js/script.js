const d = new Date();
let year = d.getFullYear();
document.getElementById("demo").innerHTML = "© "+year+". All rights reserved by Fathor Rahman.";

const firestore = firebase.firestore();
let myPortfolio = document.getElementById("myPortfolio")
firestore.collection('/portfolio').orderBy("id", "desc").onSnapshot((querySnapshot) => {
    let realtimePortfolio = querySnapshot.docs.map(doc => {
        return {
          id: doc.id,
          value: doc.data()
        }
      })
    console.log("realtimePortfolio", realtimePortfolio);
    myPortfolio.innerHTML = ''
    for (let i = 0; i < realtimePortfolio.length; i++) {
        myPortfolio.innerHTML += `
            <div data-aos="fade-up" data-aos-delay="500" data-aos-once="true" class="col-lg-6 col-xl-4 col-md-6 col-12 mt--50 mt_md--30 mt_sm--30">
                <div class="rn-portfolio" data-bs-toggle="modal" 
                    data-type="`+realtimePortfolio[i].value.type+`"
                    data-images_url="`+realtimePortfolio[i].value.images_url+`"
                    data-title="`+realtimePortfolio[i].value.title+`"
                    data-description="`+realtimePortfolio[i].value.description+`"
                    data-link="`+realtimePortfolio[i].value.link+`"
                    data-bs-target="#exampleModalCenter"
                >
                    <div class="inner">
                        <div class="thumbnail">
                            <a href="javascript:void(0)">
                                <img src="`+realtimePortfolio[i].value.images_url+`" alt="`+realtimePortfolio[i].value.title+`">
                            </a>
                        </div>
                        <div class="content">
                            <div class="category-info">
                                <div class="category-list">
                                    <a href="javascript:void(0)">`+realtimePortfolio[i].value.type+`</a>
                                </div>
                            </div>
                            <h4 class="title"><a href="javascript:void(0)">`+realtimePortfolio[i].value.title+`
                            <i class="feather-arrow-up-right"></i></a></h4>
                        </div>
                    </div>
                </div>
            </div>
        `
    }
    $('#exampleModalCenter').on('show.bs.modal', function(e) {
        var type = $(e.relatedTarget).data('type');
        var images_url = $(e.relatedTarget).data('images_url');
        var title = $(e.relatedTarget).data('title');
        var description = $(e.relatedTarget).data('description');
        var link = $(e.relatedTarget).data('link');
        
        document.getElementById("modalTitle").innerHTML = '<span>'+type+'</span> ' + title
        document.getElementById("modalImage").src = images_url
        document.getElementById("description").innerHTML = description

        document.getElementById("modalLink").href = link

        document.getElementById("modalLink").style.visibility = link === '' ? 'hidden' : 'visible'
        
    });
})

function generate() {
    const jsonStr = document.getElementById('json-data').textContent;
    const jsonData = JSON.parse(jsonStr);

    console.log(jsonData); 
    for (let i = 0; i < jsonData.length; i++) {
        const element = jsonData[i];
        firestore.collection('/portfolio').add({
            "id": element.id,
            "title": element.title,
            "description": element.description,
            "type": element.type,
            "images_url": element.images_url,
            "playstore_link": element.playstore_link,
            "appstore_link": element.appstore_link
        }).then((response) => {
            console.log(response);
        }).catch((error) => {
            console.error(error);
        });
    }

}
