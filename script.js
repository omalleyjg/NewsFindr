
 
function getTrendingNews(option) {
    $("#trending").empty();
   
    var apiUrl = "https://newsdata.io/api/1/news?apikey=pub_1412872da2511db6023cd470fd39cc0b01a8b&&country=ca,us&category=" + option;


    fetch(apiUrl)
        .then(function (response) {
            if (response.ok) {
                console.log(response);
                response.json().then(function (data) {
                    console.log(data);

                    for (let index = 0; index < data.results.length; index++) {

                        // $("a").on("click", function () {
                        //     Window.open(link._blank)
                        // });
 

                        var title = data.results[index].title;
                        var description = data.results[index].description;
                        var link = data.results[index].link;
                        var imageUrl = data.results[index].image_url;

                        console.log(data.results[index].image_url);


                        if (imageUrl === null && description === null) {
                            console.log("nothing");
                        }

                        else if (imageUrl === null) {
                            $("#trending").append(
                                "<h2>" + title + "</h2>"
                                + "<br>"
                                + "<p class='desc'>" + description + "</p>"
                                + "<a href='" + link + "'>"
                                + "<button>"
                                + "Read More"
                                + "</button>"
                                + "</a>"
                                + "<button class='saveBtn1'>" + "Save" + "</button>"
                                + "<hr>"
                            )
                        } else if (description === null) {
                            $("#trending").append(
                                "<h2>" + title + "</h2>"
                                + "<br>"
                                + "<img src='" + imageUrl + "'/>"
                                + "<a href='" + link + "'>"
                                + "<button>"
                                + "Read More"
                                + "</button>"
                                + "</a>"
                                + "<button class='saveBtn1'" + "Save" + "</button>"
                                + "<hr>"
                            )
                        }
                        else if (imageUrl !== null && imageUrl.includes(".mp4")) {

                            console.log("video");
                        }
                        else {
                            $("#trending").append(
                                "<h2>" + title + "</h2>"
                                + "<br>"
                                + "<img src='" + imageUrl + "'/>"
                                + "<br>"
                                + "<p class='desc'>" + description + "</p>"
                                + "<a href='" + link + "'>"
                                + "<button>"
                                + "Read More"
                                + "</button>"
                                + "</a>"
                                + "<button class='saveBtn1'>" + "Save" + "</button>"
                                + "<hr>"

                            )

                        }

                    }
                });
            }
        })
}

getTrendingNews(option = "top");


function getSearchedNews(search) {
    $("#searchednews").empty()
  
   
      const options = {
          method: 'GET',
          headers: {
              'X-RapidAPI-Key': '30e2c5b198msh98fd7763e5904f2p163deajsn67969615a5a2',
              'X-RapidAPI-Host': 'contextualwebsearch-websearch-v1.p.rapidapi.com'
          }
      };
      
      fetch('https://contextualwebsearch-websearch-v1.p.rapidapi.com/api/search/NewsSearchAPI?q='+ search.replace(" ", "%20") + '&pageNumber=1&pageSize=20&autoCorrect=true&safeSearch=true&withThumbnails=true&fromPublishedDate=null&toPublishedDate=null', options)
      .then(function (response) {
          if (response.ok) {
              console.log(response);
              response.json().then(function (data) {
                  console.log(data);
  
      
                  if (data.totalCount === 0) {
                      $("#searchednews").append(
                          "<h2>No results found</h2>"
                          + "<img src='https://dlvkyia8i4zmz.cloudfront.net/vEQWzpo0QyNT5Bgmy8oc_2020_06_03.gif'/>"
                      )
                  }
  
  
  for (let index = 0; index < data.value.length; index++) {
      
      var title = data.value[index].title;  
      var description = data.value[index].description;
      var link = data.value[index].url;
      var imageUrl = data.value[index].image.url;
  
      $("#searchednews").append(
          "<h2>" + title + "</h2>"
          + "<br>"
          + "<img src='" + imageUrl + "'/>"
          + "<br>"
          + "<p class='desc'>" + description + "</p>"
          + "<a href='" + link + "'>"
          + "<button>"
          + "Read More"
          + "</button>"
          + "</a>"
          + "<button class='saveBtn2'>" + "Save" + "</button>"
          + "<hr>"
  
      )
  }
  
              });
          }
      })
      
  
  }
        


$("#trendingSel").on("change", function () {
    option = $(this).val();
    getTrendingNews(option);
})

$("#searchbtn").on("click", function () {
if ($("#searchbar").val() !== " " ) {
    search = $("#searchbar").val();
    getSearchedNews(search);
    searchHistory = []
    var searchHistory = JSON.parse(localStorage.getItem("history")) || [];
    searchHistory.push(search);
    localStorage.setItem("history", JSON.stringify(searchHistory));
}
}) 

$("#search-history").on("click", function () {
    
getHistory();
}
)
//  make save news fuction  and save to local storage


function getHistory() {

    var searchHistory = JSON.parse(localStorage.getItem("history")) || [];
for (let i = 0; i < searchHistory.length; i++) {
    
   
    $("#historyDiv").append(
       "<a  class='history' data='" + searchHistory[i] + "'>" + searchHistory[i] + "</a>"
        + "<br>");
}
$(".history").on("click", function () {
    $("#searchbar").val($(this).attr("data"))
      
  })

}

$(".saveBtn").on("click", function () {

})


var SpeechRecognition = window.SpeechRecognition || webkitSpeechRecognition;
var recognition = new SpeechRecognition();

recognition.onresult = function (event) {
    var text = event.results[0][0].transcript;
    $("#searchbar").val(text);
}

$("#speech").on("click", function () {
    recognition.start();
}
)



console.log(recognition);

