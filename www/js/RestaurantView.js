/**
 * Created with JetBrains PhpStorm.
 * User: Karl
 * Date: 2013-09-04
 * Time: 2:56 PM
 * To change this template use File | Settings | File Templates.
 */

var RestaurantView = function() {
    'use strict';

    this.initialize = function() {
        this.el = $('<div/>');
    };

    this.render = function() {
        var myself = this;
//        'use strict';
        var url = "http://dev.karltietz.com/data/getData.php";
        var restaurant;
        $.ajax({
            dataType: 'jsonp',
            data: 'id=10',
            jsonp: 'jsonp_callback',
            url: url,
            success: function ( data ) {
                // get the id from the url
                var hash = getHash();
                var id = hash.substr(hash.lastIndexOf("/") + 1);
                //get the restaurant that has that ID
                restaurant = $.grep(data, function(e){ return e.id == id; });

                if (typeof restaurant !== "undefined") {
                    // generate the template
                    var parsedTemplate;

                    parsedTemplate = parseRestaurantTemplate(restaurant[0]);

                    myself.el.html(parsedTemplate);
                }
                else {
                    console.log ("Variable restaurant is undefined.")
                }

                bindEvents();
            },
            failure: function () {
                console.log("Ajax error could not get restaurant data.");
            }
        });



        return this;

    };

//    this.getData = function(id) {
//
//    }

    // TODO: refer to the getViewName function like this in all of the Views
//    this.getViewName = getViewName;
    this.getViewName = function() {
        var name = 'RestaurantView';
        return name;
    };

    this.initialize();

};

RestaurantView.restoPageTemplate = _.template($('#restaurant-page-tpl').html());

function getHash() {
    return window.location.hash;
}

// TODO: make sure either this function is universal for all views or make it have a specific name to this view because otherwise it won't work right.
function parseRestaurantTemplate(template) {
    return RestaurantView.restoPageTemplate(template);
}

function bindEvents() {
    var $backDiv = $('.back');
    if ($backDiv.length > 0){
        $backDiv.on('click', function() {
            console.log('Back Clicked');
//                self.slidePage(self.pageHistory[self.levelsDeep - 1]);
            // TODO: in this context it can't read pageHistory and levelsDeep variables anymore. MAke them accessible to this function.
            window.location.hash = self.pageHistory[self.levelsDeep - 1].getViewName();
        });

    }
    else {
        console.log('Back div doesnt exist');
    }

}
