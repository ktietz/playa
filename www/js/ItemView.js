/**
 * Created with JetBrains PhpStorm.
 * User: Karl
 * Date: 2013-09-04
 * Time: 2:56 PM
 * To change this template use File | Settings | File Templates.
 */

var ItemView = function() {

    this.initialize = function() {
        this.el = $('<div/>');
    },

    this.render = function() {

        var restaurants = JSON.parse(this.generateData());

        // get the id from the url
        var hash = getHash();
        var id = hash.substr(hash.lastIndexOf("/") + 1);
        //get the restaurant that has that ID
        var restaurant = $.grep(restaurants, function(e){ return e.id == id; });

        // generate the template
        var parsedTemplate;

//        pageTemplate = _.template(this.restoPageTemplate);
        parsedTemplate = parseTemplate(restaurant[0])

        this.el.html(parsedTemplate);
        return this;
    },

    this.generateData = function() {
        var restaurants = [
            {"id": 1, "name": "Guacamole Palace", "address": "1234 Billy Road"},
            {"id": 2, "name": "Salsa King", "address": "1234 Salsa Road"},
            {"id": 3, "name": "Burger King", "address": "1234 Ancient Road"},
            {"id": 4, "name": "3 Amigos", "address": "1234 John Road"}
        ];

        return JSON.stringify(restaurants);
    },


    this.initialize();
}

ItemView.restoPageTemplate = _.template($('#restaurant-page-tpl').html());

function getHash() {
    return window.location.hash;
}

function parseTemplate(template) {
    return ItemView.restoPageTemplate(template);
}
