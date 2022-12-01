const settings = {
	"async": true,
	"crossDomain": true,
	"url": "https://real-time-news-data.p.rapidapi.com/top-headlines?country=US&lang=en",
	"method": "GET",
	"headers": {
		"X-RapidAPI-Key": "f7f162f972mshe3c8a78dcb6bcd5p1e890djsn16a579244a22",
		"X-RapidAPI-Host": "real-time-news-data.p.rapidapi.com"
	}
};

$.ajax(settings).done(function (response) {
	console.log(response);
});