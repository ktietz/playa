var app = {
    'levelsDeep': 0, // To keep track of how far into the application structure you are and go back to where you were before.
    'pageHistory': new Array(10), // Make the page history limit at 10 levels deep.

    registerEvents: function() {
        var self = this;
        var $body = $('body');
        // Check of browser supports touch events...
        if (document.documentElement.hasOwnProperty('ontouchstart')) {
            // ... if yes: register touch event listener to change the "selected" state of the item
            $body.on('touchstart', 'a', function(event) {
                $(event.target).addClass('tappable-active');
            });
            $body.on('touchend', 'a', function(event) {
                $(event.target).removeClass('tappable-active');
            });
        } else {
            // ... if not: register mouse events instead
            $body.on('mousedown', 'a', function(event) {
                $(event.target).addClass('tappable-active');
            });
            $body.on('mouseup', 'a', function(event) {
                $(event.target).removeClass('tappable-active');
            });

        }

//        var $backDiv = $('.back');
        // TODO: This is not kosher. Don't use the alt text as its defining characteristic. Binding to the body is too broad. This is a temporary hack.
            $body.on('click', function(event) {
                if (event.target.alt === "Back") {
                    console.log('Back Clicked');
                    window.location.hash = app.pageHistory[app.levelsDeep - 1].getViewName();
                }
            });



        // check if the url has a hash on the end. The "route" function depends on this
        $(window).on('hashchange', $.proxy(this.route, this));
    },

    slidePage: function(page) {

        var currentPageDest, self = this;

        // If there is no current page (app just started) -> No transition: Position new page in the view port
        if (!this.currentPage) {
            $(page.el).attr('class', 'page stage-center');
            $('body').append(page.el);
            this.currentPage = page;
            return;
        }

        // Record the page you're leaving in the pageHistory so you can refer back to it later.
        this.pageHistory[this.levelsDeep] = this.currentPage;

        // Cleaning up: remove old pages that were moved out of the viewport
        $('.stage-right, .stage-left').not('.homePage').remove();

        // See if the destination page is the same as the one you were at before.
        var previousPage;
        if (this.levelsDeep >= 1) {
            previousPage = this.pageHistory[this.levelsDeep - 1];
        }
        console.log("Previous page: " + previousPage);
        if ((previousPage !== undefined) && (page.getViewName() === previousPage.getViewName())) {
            // Apply a back transition
            $(page.el).attr('class', 'page stage-left');
            currentPageDest = "stage-right";
            // You are going back one level. Decrement levelsDeep.
            this.levelsDeep--;
        } else {
            // Forward transition (slide from right)
            $(page.el).attr('class', 'page stage-right');
            currentPageDest = "stage-left";
            // You are going deeper into the application structure, increment levelsDeep
            this.levelsDeep++;
        }

//        if (page === app.homePage) {
//            // Always apply a Back transition (slide from left) when we go back to the search page
//            $(page.el).attr('class', 'page stage-left');
//            currentPageDest = "stage-right";
//        } else {
//            // Forward transition (slide from right)
//            $(page.el).attr('class', 'page stage-right');
//            currentPageDest = "stage-left";
//        }
        // TODO: Make ('body') an app-wide variable since it's always reused
        $('body').append(page.el);

        // Wait until the new page has been added to the DOM...
        setTimeout(function() {
            // Slide out the current page: If new page slides from the right -> slide current page to the left, and vice versa
            $(self.currentPage.el).attr('class', 'page transition ' + currentPageDest);
            // Slide in the new page
            $(page.el).attr('class', 'page stage-center transition');
            self.currentPage = page;
        });

//        this.levelsDeep++;
    },


    route: function() {
        var self = this;
        var view;
        var hash = window.location.hash;
        if ((!hash) || (hash.match(app.homeURL))){
            if (this.homePage) {
                this.slidePage(this.homePage);
            } else {
                this.homePage = new HomeView(this.store).render();
                this.slidePage(this.homePage);
            }
            return;
        }

        //TODO: Make this prettier by using a select statement or something
        var match = hash.match(app.activitiesURL);
        if (match){
            self.slidePage(new ActivitiesView().render());
            var $calendarDiv = $('#calendar');
            if ($calendarDiv.length > 0){
                $calendarDiv.fullCalendar({
                    events: {
                        url: 'https://www.google.com/calendar/feeds/j8uud3mfqe41th5pgojpefeht4%40group.calendar.google.com/public/basic',
                        className: 'gcal-event'           // an option
                    }
                });
                console.log('main.js 121, calendar div exists');

            }
            else{
                console.log('main.js 125, Calendar div doesnt exist');
            }
        }
        else if (hash.match(app.discoverURL)) {
            // render the view
            view = new DiscoverView().render();

            // create and add the script that calls google maps asychronously
            var script = document.createElement("script");
            script.src = "https://maps.googleapis.com/maps/api/js?v=3.exp&sensor=false&callback=initialize";
            document.body.appendChild(script);

            // call slidepage
            self.slidePage(view);
        }
        else if (hash.match(app.restaurantPageURL)) {
            // render the view
            view = new RestaurantView().render(self);

            // call slidepage
            self.slidePage(view);

        }
        else if (hash.match(app.restaurantsURL)) {
            // render the view
            view = new RestaurantsView().render();

            var restaurants;
            var parsedTemplate;

            restaurants = view.getData(self);

            // call slidepage
            self.slidePage(view);
        }
        else if (hash.match(app.accomodationsPageURL)) {
            // render the view
            view = new AccomodationView().render();

            // call slidepage
            self.slidePage(view);

        }
        else if (hash.match(app.accomodationsURL)) {
            // render the view
            view = new AccomodationsView().render(function(){bindEvents(self);});

            // call slidepage
            self.slidePage(view);
            var accomodations = JSON.parse(view.generateData());
            var parsedTemplate;
            var templateText;
            var listTemplate;

            // add the hotels to the list
            templateText = $('#accomodation-li-tpl').html();
            listTemplate = _.template(templateText);

            $.each(accomodations, function(index, r){
                parsedTemplate = listTemplate(r);
                $('ul.accomodationsList').append(parsedTemplate);
            });
        }
        else if (hash.match(app.attractionsPageURL)) {
            // render the view
            view = new AttractionView().render();

            // call slidepage
            self.slidePage(view);
        }
        else if (hash.match(app.attractionsURL)) {
            // render the view
            view = new AttractionsView().render();

            // call slidepage
            self.slidePage(view);
            var attractions = JSON.parse(view.generateData());
            var parsedTemplate;

            // add the hotels to the list
            templateText = $('#attraction-li-tpl').html();
            listTemplate = _.template(templateText);

            $.each(attractions, function(index, r){
                parsedTemplate = listTemplate(r);
                $('ul.attractionsList').append(parsedTemplate);
            });
        }


    },

    initialize: function() {
        var self = this;
        self.homeURL = /^#HomeView/;
        self.activitiesURL = /^#ActivitiesView/;
        self.discoverURL = /^#DiscoverView/;
        self.restaurantsURL = /^#RestaurantsView/;
        self.restaurantPageURL = /^#RestaurantView\/(\d{1,})/;
        self.accomodationsURL = /^#AccomodationsView/;
        self.accomodationsPageURL = /^#AccomodationView\/(\d{1,})/;
        self.attractionsURL = /^#AttractionsView/;
        self.attractionsPageURL = /^#AttractionView\/(\d{1,})/;
        self.registerEvents();
        self.route();
    }
};


app.initialize();




// public functions -------------------------------------------------


function fillList(data, $template, $ul) {
    var listTemplate = _.template($template.html());

    // TODO: Replace this with a javascript loop instead. Javascript is faster than jQuery
    // Add the restaurants to the list
    $.each(data, function(index, r){
        parsedTemplate = listTemplate(r);
        $ul.append(parsedTemplate);
    });
}


function bindEvents(app) {
//    var $backDiv = $('.back');
//    if ($backDiv.length > 0){
//        $backDiv.on('click', function() {
//            console.log('Back Clicked');
//            window.location.hash = app.pageHistory[app.levelsDeep - 1].getViewName();
//        });
//
//    }
//    else {
//        console.log('Back div doesnt exist');
//    }
}
