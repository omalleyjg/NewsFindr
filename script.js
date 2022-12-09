

// makes links open in new tab
$("#trending").on('click', 'a', function (e) {
    e.preventDefault();
    var url = $(this).attr('href');
    window.open(url, '_blank');
});
//  calls on page load
getTrendingNews(option = "top", pageNum = 1);
// trending news function
function getTrendingNews(option, pageNum) {
    $("#trending").empty()
    $("#savednewslink").css("display", "inline-block");
    $("#trendingnewslink").css("display", "none");
    $("#trendingTitle").text("Trending News");
    $("#trendingSel").css("display", "inline-block");
    // loading gif while api is being called
    $("#trending").append(
        "<br>"
        + "<img class='loading' src='http://www.jardinsdemetis.com/frontend/parc/pub/images/ajax/loading_blue.gif'/>"
    )
// url for the first api with parameters that change the results
    fetch("https://newsdata.io/api/1/news?apikey=pub_1425569763c610f1e83063f4d62f3d468a07d&language=en&page=" + pageNum + "&country=ca,us&category=" + option)
        .then(function (response) {
            if (response.ok) {
                console.log(response);
                response.json().then(function (data) {
                    console.log(data);
                    // gets the apis totalresults and divides by 10 and rounds down to get number of pages and stores it in a global variable to be used in the page +/- function
                    var pages = Math.floor(data.totalResults / 10)
                    globalThis.trendingTotalPages = pages;

                    $("#trending").empty();
                    // If total count is less than 10, then no results found beacuse the api returns 10 results per page 
                    if (data.totalResults < 10) {
                        $("#trending").append(
                            "<h2>No results</h2>"
                            + "<img src='https://dlvkyia8i4zmz.cloudfront.net/vEQWzpo0QyNT5Bgmy8oc_2020_06_03.gif'/>"
                        )
                        $("#pagenumtrending").css("display", "none")
                    }
                    // if the api returns more than 10 results, display the arrows and page number
                    else {
                        $("#trendingArrowR").css("display", "inline-block");
                        $("#trendingArrowL").css("display", "inline-block")
                        $("#pagenumtrending").css("display", "inline-block")
                        $("#pagenumtrending").text(
                            "Page " + pageNum + " of " + pages)
                    }


                    // loops through the api data with conditional statements based on the data returned and appends to the page
                    for (let index = 0; index < data.results.length; index++) {



                        var title = data.results[index].title;
                        var description = data.results[index].description;
                        var link = data.results[index].link;
                        var imageUrl = data.results[index].image_url;



                        if (imageUrl === null && description === null) {

                            $("#trending").append(
                                "<article>"
                                + "<h2>" + title + "</h2>"
                                + "<br>"
                                + "<a  href='" + link + "'>"
                                + "<button class='readmoreBtn'>"
                                + "Read More"
                                + "</button>"
                                + "</a>"
                                + "<button class='saveBtn'>" + "Save" + "</button>"
                                + "<hr>"
                                + "</article>"
                            )

                        }

                        else if (imageUrl === null) {

                            $("#trending").append(
                                "<article>"
                                + "<h2>" + title + "</h2>"
                                + "<br>"
                                + "<p class='desc'>" + description + "</p>"
                                + "<a  href='" + link + "'>"
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
                    // save button function to save the news to local storage
                    $(".saveBtn").on("click", function () {
                        var title = $(this).parent().find("h2").text();
                        var description = $(this).parent().find("p").text();
                        var link = $(this).parent().find("a").attr("href");
                        var imageUrl = $(this).parent().find("img").attr("src");
                        var savedNews = JSON.parse(localStorage.getItem("savednews")) || [];
                        savedNews.push({ Title: title, Description: description, Link: link, Image: imageUrl });
                        localStorage.setItem("savednews", JSON.stringify(savedNews));
                    })
                });
            }
            
           
        }) .catch(function () {  // working error message for the trending news 
            $("#trending").empty()
            $("#trending").append(
                 "<br>"
                +"<h2>Something went wrong</h2>"
                + "<img src='https://cdn.pixabay.com/photo/2017/02/12/21/29/false-2061132_1280.png'/>"
            )
        })  
       
    }  
  


//  dropdown menu to change the search results for trending news
$("#trendingSel").on("change", function () {
    option = $(this).val();
    getTrendingNews(option, pageNum = 1);
})
//  arrow buttons to change page of the search results, returns to page 1 if the last page is reached and goes to the last page if user clicks back on the first page
$("#trendingArrowR").on("click", function () {
    if (pageNum >= globalThis.trendingTotalPages) {
        pageNum = 1;
        getTrendingNews(option, pageNum);
    }
    else {
        pageNum++;
        getTrendingNews(option, pageNum);
    }
})

$("#trendingArrowL").on("click", function () {
    if (pageNum <= 1) {
        pageNum = globalThis.trendingTotalPages;
        getTrendingNews(option, pageNum);
    }
    else {
        pageNum--;
        getTrendingNews(option, pageNum);
    }
})

// hides page button until search is made 
$("#searchedArrowR").css("display", "none");
$("#searchedArrowL").css("display", "none");


// makes link open in new tab
$("#searchednews").on('click', 'a', function (e) {
    e.preventDefault();
    var url = $(this).attr('href');
    window.open(url, '_blank');
});

// Searched news
function getSearchedNews(search, pageNumSearched) {
    $("#searchednews").empty()
  
    //  loading gif while waiting for the api to respond
    if (search !== "") {
        $("#searchednews").append(
            "<br>"
            + "<img class='loading' src='http://www.jardinsdemetis.com/frontend/parc/pub/images/ajax/loading_blue.gif'/>"
        )
    }

    const options = {
        method: 'GET',
        headers: {
            'X-RapidAPI-Key': 'f7f162f972mshe3c8a78dcb6bcd5p1e890djsn16a579244a22', 
            'X-RapidAPI-Host': 'contextualwebsearch-websearch-v1.p.rapidapi.com'
        }
    };
    // url for the second api with parameters that change the results
    fetch('https://contextualwebsearch-websearch-v1.p.rapidapi.com/api/search/NewsSearchAPI?q=' + search.replace(" ", "%20") + '&pageNumber='+ pageNumSearched +'&pageSize=10&autoCorrect=true&safeSearch=true&withThumbnails=true&fromPublishedDate=null&toPublishedDate=null', options)
    .then(function (response) {
            if (response.ok) {
                console.log(response);
                response.json().then(function (data) {
                    console.log(data);
                    // // gets the apis totalresults and divides by 10 and rounds down
                    var pages = Math.floor(data.totalCount / 10)
                    globalThis.searchedTotalPages = pages
                    $("#searchednews").empty();
                    // If total count is less than 10, then no results found beacuse the api returns 10 results per page
                    if (data.totalCount < 10) {
                        $("#searchednews").append(
                            "<br>"
                            + "<h2>No results found</h2>"
                            + "<img src='https://dlvkyia8i4zmz.cloudfront.net/vEQWzpo0QyNT5Bgmy8oc_2020_06_03.gif'/>"
                        )
                    } 
                    else {
                        $("#searchedArrowR").css("display", "inline-block");
                        $("#searchedArrowL").css("display", "inline-block")
                        $("#pagenumsearch").text(
                            "Page " + pageNumSearched + " of " + pages)

                    }

                    // Loops through the data and append it to the page
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
                    // save button function to save news to local storage
                    $(".saveBtn").on("click", function () {
                        var title = $(this).parent().find("h2").text();
                        var description = $(this).parent().find("p").text();
                        var link = $(this).parent().find("a").attr("href");
                        var imageUrl = $(this).parent().find("img").attr("src");
                        var savedNews = JSON.parse(localStorage.getItem("savednews")) || [];
                        savedNews.push({ Title: title, Description: description, Link: link, Image: imageUrl });
                        localStorage.setItem("savednews", JSON.stringify(savedNews));
                    })

                });
            }
            
        })
        .catch(function () {  // error message not working cant figure out why
            $("#searchednews").empty();
            $("#searchednews").append(
                "<br>"
                + "<h2>No results found</h2>"
                + "<img src='https://cdn.pixabay.com/photo/2017/02/12/21/29/false-2061132_1280.png'/>"
            )
        })
        
}

// takes the value of the search bar and passes it to the getSearchedNews function
$("#searchbtn").on("click", function () {
    if ($("#searchbar").val() !== " ") {
        search = $("#searchbar").val();
        getSearchedNews(search, pageNumSearched = 1);
    }
})

//  arrow buttons to change pages of the search results, returns to page 1 if the last page is reached and goes to the last page if user clicks back on the first page
$("#searchedArrowR").on("click", function () {
   if (pageNumSearched >= globalThis.searchedTotalPages) {
        pageNumSearched = 1
        getSearchedNews(search, pageNumSearched);
    }
    else {
        pageNumSearched++;
        getSearchedNews(search, pageNumSearched);
    }
})

$("#searchedArrowL").on("click", function () {
if (pageNumSearched <= 1) {
        pageNumSearched = globalThis.searchedTotalPages
        getSearchedNews(search, pageNumSearched);
    }
    else {
        pageNumSearched--;
        getSearchedNews(search, pageNumSearched);
    }

})


//  calls the getSavedNews function 
$("#savednewslink").on("click", function () {
    getSavedNews()
})
// calls the getTrendingNews function
$("#trendingnewslink").on("click", function () {
    getTrendingNews(option, pageNum = 1)
})

// Saved News
// hides and displays elements and gets the saved news from local storage and displays it on the page
function getSavedNews() {
    $("#savednewslink").css("display", "none");
    $("#trendingnewslink").css("display", "inline-block");
    $("#trendingSel").css("display", "none");
    $("#trendingTitle").text("Saved News");
    $("#trendingArrowL").css("display", "none");
    $("#trendingArrowR").css("display", "none");
    $("#pagenumtrending").css("display", "none");
    $("#trending").empty()


    var savedNews = JSON.parse(localStorage.getItem("savednews")) || [];

    if (savedNews.length === 0) {
        $("#trending").append(
            "<br>"
            + "<h2>Nothing saved!</h2>"

        )
    }

//  loops through the saved news with conditional statements and displays it on the page    
    for (let index = 0; index < savedNews.length; index++) {

        if (savedNews[index].Image === undefined && savedNews[index].Description === undefined) {

            $("#trending").append(
                "<article>"
                + "<h2>" + title + "</h2>"
                + "<br>"
                + "<a  href='" + link + "'>"
                + "<button class='readmoreBtn'>"
                + "Read More"
                + "</button>"
                + "</a>"
                + "<button class='deleteBtn'>" + "Delete" + "</button>"
                + "<hr>"
                + "</article>"
            )


        }

        else if (savedNews[index].Image === undefined) {
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
    // deletes the saved news from local storage array 
    $(".deleteBtn").on("click", function () {
        var index = $(this).parent().index();
        savedNews.splice(index, 1);
        localStorage.setItem("savednews", JSON.stringify(savedNews));
        getSavedNews();
    })
}



// speech recognition api  
var SpeechRecognition = window.SpeechRecognition || webkitSpeechRecognition;
var recognition = new SpeechRecognition();

recognition.onresult = function (event) {
    var text = event.results[0][0].transcript;
    $("#searchbar").val(text);
}

$("#speech").on("click", function () {
    recognition.start();
    $("#searchbar").val("listening...");
}
)


