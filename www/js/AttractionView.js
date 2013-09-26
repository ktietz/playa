/**
 * Created with JetBrains PhpStorm.
 * User: Karl
 * Date: 2013-09-04
 * Time: 5:00 PM
 * To change this template use File | Settings | File Templates.
 */

var AttractionView = function() {
    'use strict';

    this.initialize = function() {
        this.el = $('<div/>');
    };

    this.render = function() {

        var attractions = JSON.parse(this.generateData());

        // get the id from the url
        var hash = getHash();
        var id = hash.substr(hash.lastIndexOf("/") + 1);
        //get the attraction that has that ID
        var attraction = $.grep(attractions, function(e){ return e.id == id; });
        // generate the template
        var parsedTemplate;

        parsedTemplate = parseAttractionTemplate(attraction[0]);

        this.el.html(parsedTemplate);
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
        var name = 'AttractionView';
        return name;
    };

    this.initialize();
};

AttractionView.attrPageTemplate = _.template($('#attraction-page-tpl').html());

function getHash() {
    return window.location.hash;
}

function parseAttractionTemplate(template) {
    return AttractionView.attrPageTemplate(template);
}
