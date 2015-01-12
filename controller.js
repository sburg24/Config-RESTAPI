
var mysql = require('mysql');
var dbOptions = {
	"server" : "localhost",
	"user" : "config_service",
	"pass" : "servicePass",
	"database" : "configurations"
};


function get(parms, callback) {
	
	var page = parms.page;
	var sort = parms.sort;
	var count = parms.count;
	
	if (page === undefined) {
		page = 1;
	}
	if (count === undefined) {
		// Default to 10 records per page
		count = 10;
	}
	
	var sortStr = "";
	if (sort != undefined && ((sort == 'name') || (sort == 'hostname') || (sort == 'port') || (sort == 'username'))) {
		sortStr = " ORDER BY " + sort;
	}

	var start = (page * count) - count;

	var connection = getDBConnection();
	connection.query('SELECT name, hostname, port, username FROM configs' + sortStr + ' LIMIT ' + start + ',' + count, function(err, rows, fields) {
		  if (err) {
			  connection.end();
			  callback(err, null);
		  } else {
			  var json = JSON.stringify(rows);
			  
			  connection.end();
			  
//			  console.log("Result: " + json);
			  callback(null, json);
		  }
	});
	
	
}

function remove(name, callback) {
	if (!name || 0 === name.length) {
		console.log("Delete: no name specified");
		callback(true, 'Delete: no name specified');
		return;
	}
	
	var connection = getDBConnection();
	connection.query("DELETE FROM configs WHERE name = '" + name + "'", function(err, result) {
		if (err) {
			connection.end();
			callback(err, null);
		} else {
			connection.end();
			callback(null, 'success');
		}
	});
	
}

// Implements the POST Insert operation
function insert(data, callback) {
	
	if ((data.name === undefined) || (data.hostname === undefined) || (data.port === undefined) || (data.username === undefined)) {
		console.log("Missing data members'");
		callback(true, 'Missing data member');
		return;
	}
	
	var connection = getDBConnection();
	connection.query("INSERT INTO configs VALUES('" + data.name + "','" + data.hostname + "'," + data.port + ",'" + data.username + "')", function(err, result) {
		if (err) {
			connection.end();
			callback(err, null);
		} else {
			connection.end();
			callback(null, 'success');
		}
	});
		
}


function getDBConnection() {
	var connection = mysql.createConnection({
		  host     : dbOptions.server,
		  user     : dbOptions.user,
		  password : dbOptions.pass,
		  database : dbOptions.database,
	});

	connection.connect();

	return connection;
}

exports.get = get;
exports.remove = remove;
exports.insert = insert;
