/**
 * Created with JetBrains PhpStorm.
 * User: Karl
 * Date: 2013-09-04
 * Time: 12:09 PM
 * To change this template use File | Settings | File Templates.
 */

var RestaurantsView = function() {
    'use strict';

    this.initialize = function() {
        // Define a div wrapper for the view. The div wrapper is used to attach events.
        this.el = $('<div/>');
    };

    this.render = function(app) {
        this.el.html(restaurantsTemplate);

        return this;
    };

    this.restaurantsTemplate = function(){
//        return template;
    };

    this.generateData = function() {
        var restaurants = [
            {"id": 1,
                "name": "Brochetas",
                "address": "28 NTE between Mamita's beach and 1a. Ave. Aldea Thai. 77710, Playa del carmen, Quintana Roo",
                "phone": "01 984 803 2566",
                "email": "info@brochetas.com.mx",
                "website": "brochetas.com.mx"
            }
        ];

        return JSON.stringify(restaurants);
    };

    this.getData = function(app) {
        var url = "http://dev.karltietz.com/data/getData.php";

        $.ajax({
            dataType: 'jsonp',
            data: 'id=10',
            jsonp: 'jsonp_callback',
            url: url,
            success: function ( data ) {
                // fill the list. Pass the data, the html source of the template and the ul to put the list in.
                fillList(data, $('#restaurant-li-tpl'), $('ul.restaurantList'));
                bindEvents(app);

            },
            failure: function () {
                console.log("Ajax error could not get restaurants data.");
            }
        });
    };

//    this.getViewName = getViewName;

    this.getViewName = function() {
        var name = 'RestaurantsView';
        return name;
    };

    this.initialize();
};

var restaurantsTemplate = _.template($('#restaurants-tpl').html());


