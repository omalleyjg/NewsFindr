$("#searchedArrowR").css("display", "none");
$("#searchedArrowL").css("display", "none");

getTrendingNews(option = "top", pageNum = 1);
function getTrendingNews(option, pageNum) {
    $("#trending").empty()
    $("#trendingTitle").text("Trending News");
    $("#trendingSel").css("display", "inline-block")
    $("#backBtn").css("display", "none");
    $("#trending").append(
        "<br>"
        +"<img class='loading' src='http://www.jardinsdemetis.com/frontend/parc/pub/images/ajax/loading_blue.gif'/>"
    )

    var apiUrl = "https://newsdata.io/api/1/news?apikey=pub_142274f129fb361dde744c38f0ffdc06e6c3f&language=en&page=" + pageNum + "&country=ca,us&category=" + option;


    fetch(apiUrl)
        .then(function (response) {
            if (response.ok) {
                console.log(response);
                response.json().then(function (data) {
                    console.log(data);
                    $("#trending").empty();
                    if (data.totalResults === 0) {
                        $("#trending").append(
                            "<h2>No more results</h2>"
                            + "<img src='https://dlvkyia8i4zmz.cloudfront.net/vEQWzpo0QyNT5Bgmy8oc_2020_06_03.gif'/>"
                        )
                    }
                    $("#trendingArrowR").css("display", "inline-block");
                    $("#trendingArrowL").css("display", "inline-block");
                    for (let index = 0; index < data.results.length; index++) {



                        var title = data.results[index].title;
                        var description = data.results[index].description;
                        var link = data.results[index].link;
                        var imageUrl = data.results[index].image_url;



                        if (imageUrl === null && description === null) {
                            console.log("no image or description");
                        }

                        else if (imageUrl === null) {

                            $("#trending").append(
                                "<article>"
                                + "<h2>" + title + "</h2>"
                                + "<br>"
                                + "<p class='desc'>" + description + "</p>"
                                + "<a href='" + link + "'>"
                                + "<button class='readmoreBtn'>"
                                + "Read More"
                                + "</button>"
                                + "</a>"
                                + "<button class='saveBtn'>" + "Save" + "</button>"
                                + "<hr>"
                                + "</article>"
                            )
                        } else if (description === null) {
                            $("#trending").append(
                                "<article>"
                                + "<h2>" + title + "</h2>"
                                + "<br>"
                                + "<img src='" + imageUrl + "'/>"
                                + "<br>"
                                + "<a href='" + link + "'>"
                                + "<button class='readmoreBtn'>"
                                + "Read More"
                                + "</button>"
                                + "</a>"
                                + "<button class='saveBtn'>" + "Save" + "</button>"
                                + "<hr>"
                                + "</article>"
                            )
                        }
                        else if (imageUrl !== null && imageUrl.includes(".mp4")) {
                            console.log("video");
                        }
                        else {
                            $("#trending").append(
                                "<article>"
                                + "<h2>" + title + "</h2>"
                                + "<br>"
                                + "<img src='" + imageUrl + "'/>"
                                + "<br>"
                                + "<p class='desc'>" + description + "</p>"
                                + "<a href='" + link + "'>"
                                + "<button class='readmoreBtn'>"
                                + "Read More"
                                + "</button>"
                                + "</a>"
                                + "<button class='saveBtn'>" + "Save" + "</button>"
                                + "<hr>"
                                + "</article>"
                            )

                        }

                    }
                    $(".saveBtn").on("click", function () {
                        var title = $(this).parent().find("h2").text();
                        var description = $(this).parent().find("p").text();
                        var link = $(this).parent().find("a").attr("href");
                        var imageUrl = $(this).parent().find("img").attr("src");
                        var savedNews = []
                        var savedNews = JSON.parse(localStorage.getItem("savednews")) || [];
                        savedNews.push({ Title: title, Description: description, Link: link, Image: imageUrl });
                        localStorage.setItem("savednews", JSON.stringify(savedNews));
                    })
                });
            }
        })

}

$("#trendingArrowR").on("click", function () {
    pageNum++;
    getTrendingNews(option, pageNum);
})

$("#trendingArrowL").on("click", function () {
    if (pageNum > 1) {
        pageNum--;
        getTrendingNews(option, pageNum);
    }

    else {
        pageNum = 1;
    }
})


function getSearchedNews(search, pageNum) {
    $("#searchednews").empty()
    
    if (search !== "") {
    $("#searchednews").append(
        "<br>"
        +"<img class='loading' src='http://www.jardinsdemetis.com/frontend/parc/pub/images/ajax/loading_blue.gif'/>"
    )
    }
    const options = {
        method: 'GET',
        headers: {
            'X-RapidAPI-Key': '30e2c5b198msh98fd7763e5904f2p163deajsn67969615a5a2',
            'X-RapidAPI-Host': 'contextualwebsearch-websearch-v1.p.rapidapi.com'
        }
    };

    fetch('https://contextualwebsearch-websearch-v1.p.rapidapi.com/api/search/NewsSearchAPI?q=' + search.replace(" ", "%20") + '&pageNumber=' + pageNum + '&pageSize=10&autoCorrect=true&safeSearch=true&withThumbnails=true&fromPublishedDate=null&toPublishedDate=null', options)
        .then(function (response) {
            if (response.ok) {
                console.log(response);
                response.json().then(function (data) {
                    console.log(data);

                    $("#searchednews").empty();
                    if (data.totalCount === 0) {
                        $("#searchednews").append(
                            "<br>"
                            +"<h2>No results found</h2>"
                            + "<img src='https://dlvkyia8i4zmz.cloudfront.net/vEQWzpo0QyNT5Bgmy8oc_2020_06_03.gif'/>"
                        )
                    }
                    $("#searchedArrowR").css("display", "inline-block");
                    $("#searchedArrowL").css("display", "inline-block");

                    for (let index = 0; index < data.value.length; index++) {

                        var title = data.value[index].title;
                        var description = data.value[index].description;
                        var link = data.value[index].url;
                        var imageUrl = data.value[index].image.url;

                        $("#searchednews").append(
                            "<article>"
                            + "<h2>" + title + "</h2>"
                            + "<br>"
                            + "<img src='" + imageUrl + "'/>"
                            + "<br>"
                            + "<p class='desc'>" + description + "</p>"
                            + "<a href='" + link + "'>"
                            + "<button class='readmoreBtn'>"
                            + "Read More"
                            + "</button>"
                            + "</a>"
                            + "<button class='saveBtn'>" + "Save" + "</button>"
                            + "<hr>"
                            + "</article>"
                        )


                    }

                    $(".saveBtn").on("click", function () {
                        var title = $(this).parent().find("h2").text();
                        var description = $(this).parent().find("p").text();
                        var link = $(this).parent().find("a").attr("href");
                        var imageUrl = $(this).parent().find("img").attr("src");
                        var savedNews = []
                        var savedNews = JSON.parse(localStorage.getItem("savednews")) || [];
                        savedNews.push({ Title: title, Description: description, Link: link, Image: imageUrl });
                        localStorage.setItem("savednews", JSON.stringify(savedNews));
                    })

                });
            }
        })
}


$("#searchbtn").on("click", function () {
    if ($("#searchbar").val() !== " ") {
        search = $("#searchbar").val();
        getSearchedNews(search, pageNum = 1);
    }
})


$("#searchedArrowR").on("click", function () {
    pageNum++;
    getSearchedNews(search, pageNum);
})

$("#searchedArrowL").on("click", function () {
    if (pageNum > 1) {
        pageNum--;
        getSearchedNews(search, pageNum);
    }

    else {
        pageNum = 1;

    }
})



$("#savednews").on("click", function () {

    getSavedNews()
})

function getSavedNews() {
    $("#trendingSel").css("display", "none");
    $("#backBtn").css("display", "inline-block");
    $("#trendingTitle").text("Saved News");
    $("#trendingArrowR").css("display", "none");
    $("#trendingArrowL").css("display", "none");
    $("#trending").empty()


    var savedNews = JSON.parse(localStorage.getItem("savednews")) || [];

    if (savedNews.length === 0) {
        $("#trending").append(
            "<br>"
            + "<h2>Nothing saved!</h2>"

        )
    }


    for (let index = 0; index < savedNews.length; index++) {

        if (savedNews[index].Image === undefined) {
            $("#trending").append(
                "<article>"
                + "<h2>" + savedNews[index].Title + "</h2>"
                + "<br>"
                + "<p class='desc'>" + savedNews[index].Description + "</p>"
                + "<a href='" + savedNews[index].Link + "'>"
                + "<button class='readmoreBtn'>"
                + "Read More"
                + "</button>"
                + "</a>"
                + "<button class='deleteBtn'>" + "Delete" + "</button>"
                + "<hr>"
                + "</article>"
            )
        }
        else if (savedNews[index].Description === undefined) {
            $("#trending").append(
                "<article>"
                + "<h2>" + savedNews[index].Title + "</h2>"
                + "<br>"
                + "<img src='" + savedNews[index].Image + "'/>"
                + "<a href='" + savedNews[index].Link + "'>"
                + "<button class='readmoreBtn'>"
                + "Read More"
                + "</button>"
                + "</a>"
                + "<button class='deleteBtn'>" + "Delete" + "</button>"
                + "<hr>"
                + "</article>"
            )
        }
        else {

            $("#trending").append(
                "<article>"
                + "<h2>" + savedNews[index].Title + "</h2>"
                + "<br>"
                + "<img src='" + savedNews[index].Image + "'/>"
                + "<br>"
                + "<p class='desc'>" + savedNews[index].Description + "</p>"
                + "<a href='" + savedNews[index].Link + "'>"
                + "<button class='readmoreBtn'>"
                + "Read More"
                + "</button>"
                + "</a>"
                + "<button class='deleteBtn'>" + "Delete" + "</button>"
                + "<hr>"
                + "</article>"
            )
        }

    }
    $(".deleteBtn").on("click", function () {
        var index = $(this).parent().index();
        savedNews.splice(index, 1);
        localStorage.setItem("savednews", JSON.stringify(savedNews));
        getSavedNews();
    })
}




$("#backBtn").on("click", function () {
    ;
    getTrendingNews(option, pageNum = 1);
})


$("#trendingSel").on("change", function () {
    option = $(this).val();
    getTrendingNews(option, pageNum = 1);
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

