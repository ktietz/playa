/**
 * Created with JetBrains PhpStorm.
 * User: Karl
 * Date: 2013-09-04
 * Time: 4:44 PM
 * To change this template use File | Settings | File Templates.
 */

var AccomodationsView = function() {
    'use strict';

    this.initialize = function() {
        // Define a div wrapper for the view. The div wrapper is used to attach events.
        this.el = $('<div/>');
    };

    this.render = function(callback) {
        this.el.html(accomodationsTemplate);
        if (callback && typeof(callback) === "function") {
            callback();
        }
        else {
            console.log("Callback is not a function.");
        }
        return this;
    };

    this.generateData = function() {
        var accomodations = [
            {"id": 1, "name": "ViMex Vacation Rentals",
                "phone": "US and Canada (Toll Free): (519) 342-6348",
                "phone2": "Mexico: (984) 803-2231",
                "website": "vimexvacationrentals.com",
                "address": "Calle 12 between 15 and 20 Ave. Col. Centro, 77710, Playa del Carmen, Quintana Roo"
            }
        ];

        return JSON.stringify(accomodations);
    };

    this.getViewName = function() {
        var name = 'AccomodationsView';
        return name;
    };

    this.initialize();
};

var accomodationsTemplate = _.template($('#accomodations-tpl').html());
