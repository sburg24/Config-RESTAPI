

var users = {
	admin : { password:'password'},
	user  : { password: 'userepass'}
};


function authenticate(name, pass) {
    console.log("Authenticating: " + name + ", " + pass);

    var user = users[name];
    if (!user) {
    	return false;
    }

    if (pass == user.password) {
    	return true;
    }

    return false;
}


exports.authenticate = authenticate;

	