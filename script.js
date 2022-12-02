


function getTrendingNews() {
    var apiUrl = "https://newsdata.io/api/1/news?apikey=pub_140025efc41d6f5a69d39e31054607d1d98c3&country=ca,us&language=en&category=top"


    fetch(apiUrl)
        .then(function (response) {
            if (response.ok) {
                console.log(response);
                response.json().then(function (data) {
                    console.log(data);

                    for (let index = 0; index < data.results.length; index++) {


                        console.log(data.results[index].title);
                        console.log(data.results[index].description);
                        console.log(data.results[index].link);
                        console.log(data.results[index].image_url);


                        if (data.results[index].image_url === null) {
                            $("#trending").append(
                                "<br>"
                                + "<h2>" + data.results[index].title + "</h2>"
                                + "<br>"
                                + "<p>" + data.results[index].description + "</p>"

                                + "<a href='" + data.results[index].link + "'>Read More</a>"
                                + "<br>"
                            )
                        } else if (data.results[index].description === null) {
                            $("#trending").append(
                                "<br>"
                                + "<h2>" + data.results[index].title + "</h2>"
                                + "<br>"
                                + "<img src='" + data.results[index].image_url + "'/>"

                                + "<a href='" + data.results[index].link + "'>Read More</a>"
                                + "<br>"
                            )
                        } else {
                            $("#trending").append(

                                "<br>"
                                + "<h2>" + data.results[index].title + "</h2>"
                                + "<br>"
                                + "<img src='" + data.results[index].image_url + "'/>"
                                + "<br>"
                                + "<p>" + data.results[index].description + "</p>"

                                + "<a href='" + data.results[index].link + "'>Read More</a>"
                                + "<br>"

                            )

                        }

                    }
                });
            }
        })
}

getTrendingNews();



function getSearchedNews(search) {
    $("#searchednews").empty();
    var apiUrl = "https://newsdata.io/api/1/news?apikey=pub_140025efc41d6f5a69d39e31054607d1d98c3&country=ca,us&language=en&q=" + search


    fetch(apiUrl)
        .then(function (response) {
            if (response.ok) {
                console.log(response);
                response.json().then(function (data) {
                    console.log(data);


                    for (let index = 0; index < data.results.length; index++) {


                        console.log(data.results[index].title);
                        console.log(data.results[index].description);
                        console.log(data.results[index].link);
                        console.log(data.results[index].image_url);


                        if (data.results[index].image_url === null) {
                            $("#searchednews").append(
                                "<br>"
                                + "<h2>" + data.results[index].title + "</h2>"
                                + "<br>"
                                + "<p>" + data.results[index].description + "</p>"

                                + "<a href='" + data.results[index].link + "'>Read More</a>"
                                + "<br>"
                            )
                        } else if (data.results[index].description === null) {
                            $("#searchednews").append(
                                "<br>"
                                + "<h2>" + data.results[index].title + "</h2>"
                                + "<br>"
                                + "<img src='" + data.results[index].image_url + "'/>"

                                + "<a href='" + data.results[index].link + "'>Read More</a>"
                                + "<br>"
                            )
                        } else {
                            $("#searchednews").append(

                                "<br>"
                                + "<h2>" + data.results[index].title + "</h2>"
                                + "<br>"
                                + "<img src='" + data.results[index].image_url + "'/>"
                                + "<br>"
                                + "<p>" + data.results[index].description + "</p>"

                                + "<a href='" + data.results[index].link + "'>Read More</a>"
                                + "<br>"

                            )

                        }


                    }
                });
            }




        });
}



$("#search").on("click", function (event) {
    event.preventDefault();
    var search = $("#searchinput").val();
    getSearchedNews(search);
});
