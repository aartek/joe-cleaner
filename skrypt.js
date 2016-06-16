javascript:(function(){var siteUrl = window.location.href;
$('.rgHome').remove();
$('.retroHeader').remove();
$('.retroArt').remove();
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
			var title = html.find('.title').text();

			if(!isValuableContent(content,title)){
				var artId = $(arts[index]).attr('id');
				$('#' + artId).remove();
			};
		});
	});
	
	function isValuableContent(content, title){
		if(!content.length){
			return false;
		}
		var isFaktopedia = title.toLowerCase().indexOf('faktopedia') >= 0;
		var isMapy = title.toLowerCase().indexOf('kolekcja intrygujących map') >= 0;
		var contentLength = content.split(' ').length;
		if(contentLength < 700 && !isFaktopedia && !isMapy){
			return false;
		}
		return true;
	}
});
})();
