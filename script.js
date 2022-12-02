


function getTrendingNews(option) {
    $("#trending").empty();
    var apiUrl = "https://newsdata.io/api/1/news?apikey=pub_14107a7481f5c321a6b3ae7415b27d544ad0b&country=ca,us&language=en&category=" + option;
    //  + option;
    

    fetch(apiUrl)
        .then(function (response) {
            if (response.ok) {
                console.log(response);
                response.json().then(function (data) {
                    console.log(data);

                    for (let index = 0; index < data.results.length; index++) {

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
                                + "<hr>"
                            )
                        }
                        else if (imageUrl !== null && imageUrl.includes(".mp4")) {
                        //    do nothing
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
    $("#searchednews").empty();
    var apiUrl = "https://newsdata.io/api/1/news?apikey=pub_14107a7481f5c321a6b3ae7415b27d544ad0b&from_date=2022-11-1&to_date=2022-12-1&country=ca,us&language=en&q=" + search.replace(" ", "%20");


    fetch(apiUrl)
        .then(function (response) {
            if (response.ok) {
                console.log(response);
                response.json().then(function (data) {
                    console.log(data);


                    if(data.totalResults === 0){
                        $("#searchednews").append(
                            "<h2>No results found</h2>"
                        )
                    }

                    for (let index = 0; index < data.results.length; index++) {

                        $("a").on("click", function () {
                            Window.open(link)
                        });

                        var title = data.results[index].title;
                        var description = data.results[index].description;
                        var link = data.results[index].link;
                        var imageUrl = data.results[index].image_url;

                        console.log(data.results[index].image_url);

                        
                        if (imageUrl === null && description === null) {
                            console.log("nothing");
                        }

                        else if (imageUrl === null) {
                            $("#searchednews").append(
                                 "<h2>" + title + "</h2>"
                                + "<br>"
                                + "<p class='desc'>" + description + "</p>"
                                + "<a href='" + link + "'>"
                                + "<button>"
                                + "Read More"
                                + "</button>"
                                + "</a>"
                                + "<hr>"
                            )
                        } else if (description === null) {
                            $("#searchednews").append(
                                 "<h2>" + title + "</h2>"
                                + "<br>"
                                + "<img src='" + imageUrl + "'/>"
                                + "<a href='" + link + "'>"
                                + "<button>"
                                + "Read More"
                                + "</button>"
                                + "</a>"
                                + "<hr>"
                            )
                        }
                        else if (imageUrl !== null && imageUrl.includes(".mp4")) {
                       
                        console.log("video");
                        }
                         else {
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
                                + "<hr>"

                            )

                        }

                    }
                });
            }


        

        });
}

$("#trendingSel").on("change", function () {
    option = (this.value);
    getTrendingNews(option);
})

$("#searchbtn").on("click", function () {  
  
    search = $("#searchbar").val();
    getSearchedNews(search);
});




// var option = $("#trendingSelect").find(":selected").val();

// console.log($("option").getAttribute("value"));
