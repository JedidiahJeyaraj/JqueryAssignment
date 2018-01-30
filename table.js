// (function($$1) {
function populateTable(jsonUrl) {
	$.getJSON(jsonUrl, function(data) {
		createTableHeader(data.tableHead, data);
		createTableElement(data.tableData);
	});
}

function createTableHeader(tableHeadData, jsonData) {
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
	});
}

function popupBox(rowHead, data) {
	// console.log(rowHead)/;
	data = JSON.parse(data)
	var popupName = data.tableHead.tableColNames[rowHead];
	var details = "<input type='checkbox' name='" + rowHead + "' value='all' checked onclick='hii(`all`, this, " + JSON.stringify(data) + ")'>Select All</><br>";
	$.each(data.tableData, function(index, value) {
		// details.push(value[rowHead]);
		// console.log(index);
		details += "<input type='checkbox' name='" + rowHead + "' value='" + value[rowHead] + "'checked onclick='hii(`" + value[rowHead] + "`, this , " + JSON.stringify(data) + ")'>" + value[rowHead] + "</><br>";
	});
	// console.log(details);

	$.confirm({
		title: popupName,
		content: '<input type="text" name="" style="width:95%;">' +
			'<span class="glyphicon glyphicon-zoom-in"><a></a></span><br>' +
			'<div id="sortA-Z" data-id="rowHead" >Sort (A-Z)</div> <span><div>Sort (Z-A)</div></span>' + details
	});

	// $("input[type=checkbox]").click(console.log("asdsd"));
}

function hii(data, ele, completeData) {
	// console.log(completeData);
	// completeData = JSON.parse(completeData);

	if (data == 'all') {
		// console.log(this.checked);
		if (!ele.checked) {
			$("input[type=checkbox]").attr('checked', false);
			$('#tableRow').empty();
			$('#table').empty();
			createTableHeader(completeData.tableHead, completeData);
		} else {
			$("input[type=checkbox]").attr('checked', true);
			$('#tableRow').empty();
			$('#table').empty();
			createTableHeader(completeData.tableHead, completeData);
			createTableElement(completeData.tableData);
		}
	} else {
		if (!ele.checked) {
			var dataObj = {},
				i = 0;

			$.each(completeData.tableData, function(index, value) {
				if (value[ele.name] === ele.value) {
					return true;
				}
				dataObj[i] = value;
				i++;
			});
			console.log(dataObj);
			$('#tableRow').empty();
			$('#table').empty();
			createTableHeader(completeData.tableHead, completeData);
			createTableElement(dataObj);

		} else {
			// console.log(completeData);
		}
	}
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