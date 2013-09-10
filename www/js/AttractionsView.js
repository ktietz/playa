/**
 * Created with JetBrains PhpStorm.
 * User: Karl
 * Date: 2013-09-04
 * Time: 4:59 PM
 * To change this template use File | Settings | File Templates.
 */

var AttractionsView = function() {

    this.initialize = function() {
        // Define a div wrapper for the view. The div wrapper is used to attach events.
        this.el = $('<div/>');
    };

    this.render = function() {
        this.el.html(attractionsTemplate());
        return this;
    };

    this.generateData = function() {
        var attractions = [
            {"id": 1, "name": "Leaning Tower of Pizza", "address": "1234 Billy Road"},
            {"id": 2, "name": "The World's Biggest Hot Dog", "address": "1234 Salsa Road"},
            {"id": 3, "name": "The Statue of the Man", "address": "1234 Ancient Road"},
            {"id": 4, "name": "Attraction Central", "address": "1234 John Road"}
        ];

        return JSON.stringify(attractions);
    };

    this.getViewName = function() {
        var name = 'AttractionsView';
        return name;
    };

    this.initialize();
}

attractionsTemplate = _.template($('#attractions-tpl').html());
