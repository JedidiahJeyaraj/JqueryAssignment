// (function($$1) {
function populateTable(jsonUrl, targetID) {
	$.getJSON(jsonUrl, function(data) {
		createTableHeader(data.tableHead, targetID, data);
		createTableElement(data.tableData);
	});
}

function createTableHeader(tableHeadData, targetID, jsonData) {
	$('#table').append('<div class="row">' + tableHeadData.tableName + '</div>');
	$('#tableRow').append('<div id="tableHeader" style="display: table-header-group; background-color: grey;"></div>');
	colSize = Math.floor(12 / Object.keys(tableHeadData.tableColNames).length)
	$.each(tableHeadData.tableColNames, function(index, value) {
		d = document.createElement('div');
		$(d).html(value)
			.addClass('col-md-' + colSize)
			.appendTo('#tableHeader');
		$(d).attr('id', index);
		$(d).css({
			'display': 'table-cell',
			'text': 'align: justify'
		});
		s = document.createElement('span');
		$(s).appendTo("#" + index)
			.addClass('glyphicon glyphicon-chevron-down')
			.attr('onclick', "popupBox('" + index + "', '" + JSON.stringify(jsonData) + "')");
		// console.log(jsonData);
		// .attr('onclick', "$.alert({title: 'Alert!', content: '" + index + "',});")
		// .attr('data-toggle', 'modal')
		// .attr('data-target', '#myModal');

		// modal = document.createElement('div');
		// $(modal).html('<div class="modal fade" id="myModal" tabindex="-1" role="dialog" aria-labelledby="myModalLabel"> <div class = "modal-dialog" role = "document" >	< div class ="modal-content" ><div class = "modal-header" ><button type = "button" class = "close" data - dismiss = "modal" aria - label = "Close" > < span aria - hidden = "true" > & times; < /span></button> <h4 class = "modal-title" id = "myModalLabel" > Modal title < /h4> < /div > <div class = "modal-body" >...</div> <div class = "modal-footer" ><button type = "button" class = "btn btn-default" data - dismiss = "modal" > Close < /button> < button type = "button" class = "btn btn-primary" > Save changes < /button> < / div > </div> < / div > </div>')
		// 	.appendTo('#tableHeader');

	});
}

function popupBox(rowHead, data) {
	// console.log(rowHead)/;
	data = JSON.parse(data)
	var popupName = data.tableHead.tableColNames[rowHead];
	var details = "<input type='checkbox' name='" + rowHead + "' value='all' checked>Select All</><br>";
	$.each(data.tableData, function(index, value) {
		// details.push(value[rowHead]);
		// console.log(index);
		details += "<input type='checkbox' name='" + rowHead + "' value='" + value[rowHead] + "'checked>" + value[rowHead] + "</><br>";
	});
	// console.log(details);

	$.confirm({
		title: popupName,
		content: '<input type="text" name="" value="" style="width:95%;">' +
			'<span class="glyphicon glyphicon-zoom-in"><a></a></span><br>' +
			'<div>Sort (A-Z)</div> <span><div>Sort (Z-A)</div></span>' + details
	});

	$("input[type=checkbox]").on('click', 'console.log("asdsd");');
}

function createTableElement(tableData) {
	$.each(tableData, function(index, value) {

		$.each(value, function(index, data) {
			colSize = Math.floor(12 / Object.keys(value).length)
			d = document.createElement('div');
			$(d).html(data)
				.addClass('col-md-' + colSize)
				.appendTo('#tableRow');
			$(d).css({
				'display': 'table-cell'
			});
			// console.log(data);
		});

	});
}

// }(jQuery));