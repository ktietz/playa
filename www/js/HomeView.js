/**
 * Created with JetBrains PhpStorm.
 * User: Karl
 * Date: 2013-09-03
 * Time: 2:35 PM
 * To change this template use File | Settings | File Templates.
 */
var HomeView = function() {

    this.initialize = function() {
        // Define a div wrapper for the view. The div wrapper is used to attach events.
        this.el = $('<div/>');
//        this.el.on('keyup', '.search-key', this.findByName);
    };


    this.render = function() {
        $(this.el).html(homeTemplate());
        return this;
    },

    this.initialize();



}

homeTemplate = _.template($('#home-tpl').html());