/**
 * Created with JetBrains PhpStorm.
 * User: Karl
 * Date: 2013-09-03
 * Time: 2:35 PM
 * To change this template use File | Settings | File Templates.
 */
var ActivitiesView = function() {

    this.initialize = function() {
        // Define a div wrapper for the view. The div wrapper is used to attach events.
        this.el = $('<div/>');
    };

    this.render = function() {
        $(this.el).html(activitiesTemplate());
//        this.calendar();
        return this;
    };

    this.calendar = function() {
        $('#calendar').fullCalendar({
            events: {
                url: 'https://www.google.com/calendar/feeds/j8uud3mfqe41th5pgojpefeht4%40group.calendar.google.com/public/basic',
                className: 'gcal-event'           // an option
            }
        });
    };

    this.getViewName = function() {
        var name = 'ActivitiesView';
        return name;
    };

    this.changeView = function(view) {
        $('#calendar').fullCalendar( 'changeView', view );
    };

    this.initialize();
}

activitiesTemplate = _.template($('#activities-tpl').html());