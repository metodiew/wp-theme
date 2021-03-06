WebFontConfig = { google: { families: [ 'PT+Sans::latin,latin-ext,cyrillic' ] } };
(function() {
	var wf = document.createElement('script');
	wf.src = ('https:' == document.location.protocol ? 'https' : 'http') +
		'://ajax.googleapis.com/ajax/libs/webfont/1/webfont.js';
	wf.type = 'text/javascript';
	wf.async = 'true';
	var s = document.getElementsByTagName('script')[0];
	s.parentNode.insertBefore(wf, s);
})();

function initializeMap() {
	var myLatlng = new google.maps.LatLng(42.681852,23.321974);
	var mapOptions = {
		zoom: 15,
		maxZoom: 16,
		minZoom: 14,
		center: new google.maps.LatLng(42.681852,23.321974),
		disableDefaultUI: true,
		mapTypeId: google.maps.MapTypeId.ROADMAP
	}
	var map = new google.maps.Map(document.getElementById("smallmap"), mapOptions);
	var marker = new google.maps.Marker({
		position: myLatlng,
		title:"init Lab"
	});
	marker.setMap(map);
}

function loadGMaps() {
	var script = document.createElement("script");
	script.type = "text/javascript";
	script.src = "http://maps.googleapis.com/maps/api/js?key=AIzaSyDgYOwy86bmyVzUkMARb_hhKD-eEYngSNE&sensor=false&callback=initializeMap";
	document.body.appendChild(script);
}

jQuery(document).ready(function ($) {
	
	if( $('body').hasClass('home') ) loadGMaps();

	/* Load Tweets on the homepage */
	$("#tweets").tweet({
		join_text: "",
		avatar_size: 52,
		count: 6,
		query: "#initlab",
		loading_text: "Loading tweets...",
		template: '{user}{time}<span class="cleaner"></span>{avatar}{text}'
	});

	/* Load Tweets on the homepage */
	//$("#gatekeeper").tweet({
		//join_text: "",
		//avatar_size: 52,
		//count: 3,
		//username: "@initlabkeeper",
		//loading_text: "Loading tweets...",
		//template: '{user}{time}<span class="cleaner"></span>{text}'
	//});

	$.getJSON('http://db.initlab.ludost.net/pd-krok.php', function(data) {

		$presence = $('#presence');
		$presence.append('<ul />');

		var empty = true;
		$.each(data, function() {
			if(this.id != '18' && this.id != '33' && this.id != '69' && this.id != '70' && this.id != '71'){
				//if( this.twitter && this.url ){
					//$presence.find('ul').append('<li><strong>'+this.name+'</strong> <br /> <a href="http://twitter.com/'+ this.twitter +'">@'+ this.twitter +'</a>, <a href="'+ this.url +'">'+this.url+'</a></li>');
				//}
				//else if( this.url) {
					//$presence.find('ul').append('<li><strong>'+this.name+'</strong> <br /> <a href="'+ this.url +'">'+this.url+'</a></li>');
				//}
				if ( this.twitter ) {
					$presence.find('ul').append('<li><strong>'+this.name+'</strong> <br /> <a href="http://twitter.com/'+ this.twitter +'">@'+this.twitter+'</a></li>');
				}
				else {
					$presence.find('ul').append('<li><strong>'+this.name+'</strong></li>');
				}
				empty = false;
			}
		});

		if (empty) {
			$presence.find('ul').after('<p><strong>Всички ги е хванала липсата.</strong></p>');
		}

	});

	$('#flickr').jflickrfeed({
		limit: 9,
		qstrings: {
			id: '53081346@N03'
		},
		itemTemplate:
		'<li>' +
			'<a class="avatar" href="{{image_b}}"><img src="{{image_s}}" alt="{{title}}" /></a>' +
		'</li>'
	});

});
