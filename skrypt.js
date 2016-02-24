javascript:(function(){var siteUrl = window.location.href;
$('.rgHome').remove();
$('.indexart:not([id])').remove();
$('hr[size=1]').remove();
$.get(siteUrl,function(code){
	var html = $(code);
	var links = [];
	var arts = html.find('.indexart');
	arts.each(function(index){
		var id = $(this).attr('id')
		links.push('http://joemonster.org/art/'+id);
	});
	$.each(links, function(index, link){
		$.get(link, function(result){
			var html = $(result);
			var content = html.find('#arcik').text();
			if(!content.length){
				var artId = $(arts[index]).attr('id');
				$('#' + artId).remove();
			}
			var contentLength = content.split(' ').length;
			if( contentLength < 700){
				var artId = $(arts[index]).attr('id');
				$('#' + artId).remove();
			};
		});
	});
});
})();
