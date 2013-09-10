/**
 * Created with JetBrains PhpStorm.
 * User: Karl
 * Date: 2013-09-04
 * Time: 12:09 PM
 * To change this template use File | Settings | File Templates.
 */

var RestaurantsView = function() {

    this.initialize = function() {
        // Define a div wrapper for the view. The div wrapper is used to attach events.
        this.el = $('<div/>');
    };

    this.render = function() {
        this.el.html(restaurantsTemplate());
        return this;
    };

    this.generateData = function() {
        var restaurants = [
            {"id": 1, "name": "Guacamole Palace", "address": "1234 Billy Road"},
            {"id": 2, "name": "Salsa King", "address": "1234 Salsa Road"},
            {"id": 3, "name": "Burger King", "address": "1234 Ancient Road"},
            {"id": 4, "name": "3 Amigos", "address": "1234 John Road"}
        ];

        return JSON.stringify(restaurants);
    };

    this.getViewName = getViewName;

    function getViewName() {
        var name = 'RestaurantsView';
        return name;
    };

    this.initialize();
}

restaurantsTemplate = _.template($('#restaurants-tpl').html());
