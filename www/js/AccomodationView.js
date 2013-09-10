/**
 * Created with JetBrains PhpStorm.
 * User: Karl
 * Date: 2013-09-04
 * Time: 4:48 PM
 * To change this template use File | Settings | File Templates.
 */

var AccomodationView = function() {

    this.initialize = function() {
        this.el = $('<div/>');
    };

    this.render = function() {

        var accomodations = JSON.parse(this.generateData());

        // get the id from the url
        var hash = getHash();
        var id = hash.substr(hash.lastIndexOf("/") + 1);
        //get the accomodation that has that ID
        var accomodation = $.grep(accomodations, function(e){ return e.id == id; });
        // generate the template
        var parsedTemplate;

        parsedTemplate = parseTemplate(accomodation[0])

        this.el.html(parsedTemplate);
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
        var name = 'AccomodationView';
        return name;
    };

    this.initialize();
}

AccomodationView.restoPageTemplate = _.template($('#accomodation-page-tpl').html());

function getHash() {
    return window.location.hash;
}

function parseTemplate(template) {
    return AccomodationView.restoPageTemplate(template);
}
