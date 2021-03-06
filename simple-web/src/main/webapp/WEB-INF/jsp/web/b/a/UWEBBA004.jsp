<%--
  Description : 일정 calendar
--%>
<%@ page language="java" contentType="text/html; charset=utf-8" pageEncoding="utf-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@ taglib prefix="ui" uri="http://egovframework.gov/ctl/ui"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/functions" prefix="fn" %>
<%@ taglib prefix="spring" uri="http://www.springframework.org/tags"%>
<%@ taglib prefix="form" uri="http://www.springframework.org/tags/form" %>

<!DOCTYPE html>
<html>
  <head>
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>Visual Admin Dashboard - Preferences</title>
    <meta name="description" content="">
    <meta name="author" content="templatemo">
    
    <!-- HTML5 shim and Respond.js for IE8 support of HTML5 elements and media queries -->
    <!-- WARNING: Respond.js doesn't work if you view the page via file:// -->
    <!--[if lt IE 9]>
      <script src="https://oss.maxcdn.com/html5shiv/3.7.2/html5shiv.min.js"></script>
      <script src="https://oss.maxcdn.com/respond/1.4.2/respond.min.js"></script>
    <![endif]-->
    
    <script type="text/javascript" src="/js/common.js"></script>        <!-- jQuery -->
	<script src="/js/cal/calendar.js"></script>
	<link href="/js/cal/calendar.css" rel="stylesheet">

		
	<script type="text/javascript">

	$(document).ready(function() {
		  var date = new Date();
			var d = date.getDate();
			var m = date.getMonth();
			var y = date.getFullYear();
			/*  className colors
			className: default(transparent), important(red), chill(pink), success(green), info(blue)
			*/			  
			/* initialize the external events
			-----------------------------------------------------------------*/	
			$('#external-events div.external-event').each(function() {		
				// create an Event Object (http://arshaw.com/fullcalendar/docs/event_data/Event_Object/)
				// it doesn't need to have a start or end
				var eventObject = {
					title: $.trim($(this).text()) // use the element's text as the event title
				};			
				// store the Event Object in the DOM element so we can get to it later
				$(this).data('eventObject', eventObject);			
				// make the event draggable using jQuery UI
				$(this).draggable({
					zIndex: 999,
					revert: true,      // will cause the event to go back to its
					revertDuration: 0  //  original position after the drag
				});
				
			});	
			/************** initialize the calendar *********************
			-----------------------------------------------------------------*/		
			var calendar =  $('#calendar').fullCalendar({
				header: {
					left: 'agendaDay,agendaWeek,month',
					center: '',
					right: 'prev,next today'
				},
				editable: true,
				firstDay: 1, //  1(Monday) this can be changed to 0(Sunday) for the USA system
				selectable: true,
				defaultView: 'month',	
	        	minTime: 8,
	        	maxTime: 21,		
				axisFormat: 'HH:mm',
				columnFormat: {
	              month: 'ddd',    // Mon
	              week: 'ddd d', // Mon 7
	              day: 'dddd M/d',  // Monday 9/7
	              agendaDay: 'dddd d'
	          },
	          titleFormat: {
	              month: 'yyyy년 MMMM', // September 2009
	              week : "yyyy년 MMMM", // September 2009
	              day  : 'yyyy년 MMMM' 
	          },
			  allDaySlot: false,//cambie a true
	          selectHelper: true,
	          dayClick: function (date, allDay, jsEvent, view) {
	              if (allDay) {
	                  // Clicked on the day number 
	                  calendar.fullCalendar('changeView', 'agendaDay'/* or 'basicDay' */)
	                      .fullCalendar('gotoDate', date.getFullYear(), date.getMonth(), date.getDate());
	              }
	          },
	          select: function (startDate, endDate, allDay) {
	              if (!allDay) {
	            	  
	            	  // click here!!!!!!!!!!!!!
	              }                 
				},
				droppable: true, // this allows things to be dropped onto the calendar !!!
				drop: function(date, allDay) { // this function is called when something is dropped
				
					// retrieve the dropped element's stored Event Object
					var originalEventObject = $(this).data('eventObject');
					
					// we need to copy it, so that multiple events don't have a reference to the same object
					var copiedEventObject = $.extend({}, originalEventObject);
					
					// assign it the date that was reported
					copiedEventObject.start = date;
					copiedEventObject.allDay = allDay;
					
					// render the event on the calendar
					// the last `true` argument determines if the event "sticks" (http://arshaw.com/fullcalendar/docs/event_rendering/renderEvent/)
					$('#calendar').fullCalendar('renderEvent', copiedEventObject, true);
					
					// is the "remove after drop" checkbox checked?
					if ($('#drop-remove').is(':checked')) {
						// if so, remove the element from the "Draggable Events" list
						$(this).remove();
					}
					
				},
				
				events: [
					{
						title: 'All Day Event',
						start: new Date(y, m, 1)
					},
					{
						id: 999,
						title: 'Repeating Event',
						start: new Date(y, m, d-3, 16, 0),
						allDay: false,
						className: 'info'
					},
					{
						id: 999,
						title: 'Repeating Event',
						start: new Date(y, m, d+4, 16, 0),
						allDay: false,
						className: 'info'
					},
					{
						title: 'Meeting',
						start: new Date(y, m, d, 10, 30),
						allDay: false,
						className: 'silbe'
					},
					{
						title: 'Lunch',
						start: new Date(y, m, d, 12, 15),
						end: new Date(y, m, d, 13, 0),
						allDay: false,
						className: 'info'
					},
					{
						title: 'Birthday Party',
						start: new Date(y, m, d+1, 19, 0),
						end: new Date(y, m, d+1, 22, 30),
						allDay: false,
					},
					{
						title: 'Click for Google',
						start: new Date(y, m, 28),
						end: new Date(y, m, 29),
						url: 'javascript: aaa();',
						className: 'success'
					}
				],			
			});
			
			
		});
		
		function aaa(){
			
			alert('popup!!!!');
		}

	</script>
  </head>
  <body>
    <div class="templatemo-flex-row">
    
    
      <!-- Left column -->
	  <c:import url="/PageLink.do?link=web/z/left" />
      
      <!-- Main content -->
      <div class="templatemo-content col-1 light-gray-bg">
      
        <div class="templatemo-content-container" >
          <div class="templatemo-content-widget white-bg">
            <div id='calendar'></div>
          </div>
          <!-- footer  -->
	 	  <c:import url="/PageLink.do?link=web/z/footer" />
        </div>
      </div>
      
      
    </div>

  </body>
</html>