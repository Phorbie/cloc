<!-- 
Project: cloc
Author: Ben Steward
Date: 2023-04-28 
Revised: 2023-04-30
-->

<!-- TODO 
 - [ ] Add settings menu
 - [ ] Add option to change color
 - [ ] Capture location for weather 
 - [ ] Change weather icon theme
 - [ ] Create PWA icon
 - [ ] Add PWA manifest
 - [ ] Add PWA service worker
 - [ ] Add fallback icon for weather
 - [ ] 

-->

<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="author" content="Ben Steward">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="description" content="cloc is a simple clock and weather app.">
    <title>cloc</title>
    <style>
        @import url(style.css);
    </style>
    <script src="app.js"></script>
</head>

<body>
    <div class="container">
        <div id="logo">
            <label for="logo">cl</label><label for="logo-middle">:</label><label for="logo-end">oc</label>
        </div> <!-- end #logo -->
        <div id="date"></div><!-- end #date -->
        <div id="clock-container">
            <div id="top-clock"></div><!-- end #top-clock -->
            <div id="bottom-clock"></div><!-- end #bottom-clock -->
        </div><!-- end #clock-container -->
        <div id="settings">
            <img src="cog.svg" alt="Settings icon">
        </div> <!-- end #settings -->
        <div id="weather">
            <img id="weather-icon" src="" alt="">
            <span id="weather-temp"></span>
        </div><!-- end #weather -->
    </div><!-- end .container -->
</body>

</html>