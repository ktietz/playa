/**
 * Created with JetBrains PhpStorm.
 * User: Karl
 * Date: 2013-09-03
 * Time: 2:35 PM
 * To change this template use File | Settings | File Templates.
 */
var DiscoverView = function() {

    this.initialize = function() {
        // Define a div wrapper for the view. The div wrapper is used to attach events.
        this.el = $('<div/>');
    };

    this.render = function() {
        $(this.el).html(discoverTemplate());

        return this;
    },


    this.initialize();
}

discoverTemplate = _.template($('#discover-tpl').html());