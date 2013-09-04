var app = {
    registerEvents: function() {
        var self = this;
        // Check of browser supports touch events...
        if (document.documentElement.hasOwnProperty('ontouchstart')) {
            // ... if yes: register touch event listener to change the "selected" state of the item
            $('body').on('touchstart', 'a', function(event) {
                $(event.target).addClass('tappable-active');
            });
            $('body').on('touchend', 'a', function(event) {
                $(event.target).removeClass('tappable-active');
            });
        } else {
            // ... if not: register mouse events instead
            $('body').on('mousedown', 'a', function(event) {
                $(event.target).addClass('tappable-active');
            });
            $('body').on('mouseup', 'a', function(event) {
                $(event.target).removeClass('tappable-active');
            });
        }

        $(window).on('hashchange', $.proxy(this.route, this));


    },

    slidePage: function(page) {

        var currentPageDest,
            self = this;

        // If there is no current page (app just started) -> No transition: Position new page in the view port
        if (!this.currentPage) {
            $(page.el).attr('class', 'page stage-center');
            $('body').append(page.el);
            this.currentPage = page;
            return;
        }

        // Cleaning up: remove old pages that were moved out of the viewport
        $('.stage-right, .stage-left').not('.homePage').remove();

        if (page === app.homePage) {
            // Always apply a Back transition (slide from left) when we go back to the search page
            $(page.el).attr('class', 'page stage-left');
            currentPageDest = "stage-right";
        } else {
            // Forward transition (slide from right)
            $(page.el).attr('class', 'page stage-right');
            currentPageDest = "stage-left";
        }

        $('body').append(page.el);

        // Wait until the new page has been added to the DOM...
        setTimeout(function() {
            // Slide out the current page: If new page slides from the right -> slide current page to the left, and vice versa
            $(self.currentPage.el).attr('class', 'page transition ' + currentPageDest);
            // Slide in the new page
            $(page.el).attr('class', 'page stage-center transition');
            self.currentPage = page;
        });

    },

    route: function() {
        var self = this;
        var hash = window.location.hash;
        if (!hash) {
            if (this.homePage) {
                this.slidePage(this.homePage);
            } else {
                this.homePage = new HomeView(this.store).render();
                this.slidePage(this.homePage);
            }
            return;
        }
        var match = hash.match(app.activitiesURL);
        if (match){
            self.slidePage(new ActivitiesView().render());
            $('#calendar').fullCalendar({
                events: {
                    url: 'https://www.google.com/calendar/feeds/j8uud3mfqe41th5pgojpefeht4%40group.calendar.google.com/public/basic',
                    className: 'gcal-event'           // an option
                }
            });
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
            view = new ItemView().render();

            // call slidepage
            self.slidePage(view);

        }
        else if (hash.match(app.restaurantsURL)) {
            // render the view
            view = new RestaurantsView().render();

            // call slidepage
            self.slidePage(view);
            var restaurants = JSON.parse(view.generateData());
            var parsedTemplate;

            // add the restaurants to the list
            templateText = $('#restaurant-li-tpl').html();
            listTemplate = _.template(templateText);

            $.each(restaurants, function(index, r){
                parsedTemplate = listTemplate(r);
                $('ul.restaurantList').append(parsedTemplate);
            });
        }
    },

    initialize: function() {
        var self = this;
        self.activitiesURL = /^#activities/;
        self.discoverURL = /^#discover/;
        self.restaurantsURL = /^#restaurants/;
        self.restaurantPageURL = /^#restaurants\/(\d{1,})/;
        self.registerEvents();
        self.route();
    }


};


app.initialize();