/**
 * Created with JetBrains PhpStorm.
 * User: Karl
 * Date: 2013-09-04
 * Time: 4:44 PM
 * To change this template use File | Settings | File Templates.
 */

var AccomodationsView = function() {

    this.initialize = function() {
        // Define a div wrapper for the view. The div wrapper is used to attach events.
        this.el = $('<div/>');
    };

    this.render = function() {
        this.el.html(accomodationsTemplate());
        return this;
    };

    this.generateData = function() {
        var accomodations = [
            {"id": 1, "name": "Times Hotel", "address": "1234 Billy Road"},
            {"id": 2, "name": "Ramada Inn", "address": "1234 Salsa Road"},
            {"id": 3, "name": "Delta Hotel", "address": "1234 Ancient Road"},
            {"id": 4, "name": "Days Inn", "address": "1234 John Road"}
        ];

        return JSON.stringify(accomodations);
    };

    this.getViewName = function() {
        var name = 'AccomodationsView';
        return name;
    };

    this.initialize();
}

accomodationsTemplate = _.template($('#accomodations-tpl').html());
