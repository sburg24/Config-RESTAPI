A Node.js application providing basic RESTful services.


Dependencies:
    The node-mysql module is used for MySQL access.

To run the server:  node index.js

The included file /Test/Configurations-REST-soapui-project.xml is a SoapUI testing script.

<b>API documentation:</b>
<br>
List configurations: return a list of configurations<br>
GET /configurations<br>
Options:<br>
&nbsp;&nbsp;&nbsp;&nbsp;sort=<field name> : Sort the output based on the field specified - name, hostname, port or username<br>
&nbsp;&nbsp;&nbsp;&nbsp;count=<integer> : Maximum number of records to return per page (if not specified, the default is 10)<br>
&nbsp;&nbsp;&nbsp;&nbsp;page=<integer> : The page of records to display, based on the count per page.<br>
<br>
Insert a configuration<br>
POST /configurations   <br>
Options:<br>
&nbsp;&nbsp;&nbsp;&nbsp;The data to be inserted should be included in the POST data (i.e.: name=<name>&hostname=<host>&port=<port number>&username=<user>)<br>
<br>
Delete a configuration<br>
DELETE /configurations/<configuration name><br>
Options:<br>
&nbsp;&nbsp;&nbsp;&nbsp;<configuration name> is the 'name' field of the record to be deleted<br>
<br>

