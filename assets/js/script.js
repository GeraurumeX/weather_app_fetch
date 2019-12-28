window.addEventListener("load", () => {
    // Get resources from index.html file
    const temp = document.getElementById("temp");
    const degree = document.getElementById("degree");
    const icon = document.querySelector(".icon");
    const desc = document.getElementById("desc");
    const area = document.querySelector(".area");
    const main = document.getElementById("main");

    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(position => {
            // Get latitude and longitude
            const lat = position.coords.latitude;
            const long = position.coords.longitude;

            const proxy = "https://cors-anywhere.herokuapp.com/";
            const api = `${proxy}https://api.darksky.net/forecast/e4829fe71cd66ea8d68fbb2cca281ca5/${lat},${long}`;

            fetch(api)
                .then(res => {
                    console.log(res);
                    return res.json();
                })
                .then(data => {
                    const { temperature, summary, icon } = data.currently;
                    // Set DOM Elements
                    console.log(data);
                    temp.textContent = temperature;
                    desc.textContent = summary;
                    area.textContent = data.timezone;
                    setIcons(icon, document.getElementById("icon"));

                    switch (summary) {
                        case "Clear":
                            main.style.backgroundImage =
                                'url("../images/clear.jpg")';
                            break;
                        case "Mostly Cloudy":
                            main.style.backgroundImage =
                                'url("../images/mostly-cloudy.jpg")';
                            break;
                        case "Rainy":
                            main.style.backgroundImage =
                                'url("../images/rain.jpg")';
                            break;
                        case "Sunny":
                            main.style.backgroundImage =
                                'url("../images/sunny.jpg")';
                            break;
                        case "Cloudy":
                            main.style.backgroundImage =
                                'url("../images/cloudy.jpg")';
                            break;
                        case "Partly Cloudy":
                            main.style.backgroundImage =
                                'url("../images/partly-cloudy.jpg")';
                            break;
                    }
                });
        });
    }

    function setIcons(icon, iconID) {
        const skycons = new Skycons({ color: "#f2f2f2" });
        const currentIcon = icon.replace(/-/g, "_").toUpperCase();
        skycons.play();
        return skycons.set(iconID, Skycons[currentIcon]);
    }
});
