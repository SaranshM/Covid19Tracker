# Covid19Tracker

- /hello route changed to /region/:id where id can be either state or country
  (check app.js)

- When website loads, frontend will get the location of the user, send it to the   server as a request like -> localhost:3000/region/country.

- grab the country from req.body.place, fire a request to the url   https://api.covid19api.com/country/country_name, render index with data object.

- If clicked on the globe :
	- For country -> Similar as above.
	- For state -> Frontend sends a request to te server like, /region/state,
	  fire request to the url https://api.covid19india.org/data.json.
	- render index with data object.
	- In request.js, loop through the array of response.body.statewise, find 	  the matching state, then grab it's data and send.
	- Currently it's request.body.statewise[0], which is sending the data for 	  only the first object, ie Tamil Nadu. 