// selects/deselcts all boxes
function batch_select_all() {
  // get checkboxes
  var cbs = batch_get_checkboxes();
  
  // test if all are checked
  var all_checked = batch_all_checked(cbs);

  // check/uncheck boxes
  for (var i = 0; i < cbs.length; i++)
    cbs[i].checked = !all_checked;
    
  // update link
  batch_update_select_all_link(all_checked);
}

// gets all checkboxes in batch_form
function batch_get_checkboxes() {
  var cb = [];
  var els = $('batch_form') && $('batch_form').elements || [];
  for (var i = 0; i < els.length; i++)
    if (els[i].type == "checkbox") cb.push(els[i]);
  return cb;
}

// tests if all boxes are checked
function batch_all_checked(cbs) {
  if (typeof(cbs) == "undefined")
    cbs = batch_get_checkboxes();
 
  var all_checked = true;
  for (var i = 0; i < cbs.length; i++)
    if (!cbs[i].checked) {
      all_checked = false;
      break;
    }
  return all_checked;
}

// tests if any boxes are checked
function batch_any_checked(cbs) {
  if (typeof(cbs) == "undefined")
    cbs = batch_get_checkboxes();
 
  var any_checked = false;
  for (var i = 0; i < cbs.length; i++)
    if (cbs[i].checked) {
      any_checked = true;
      break;
    }
  return any_checked;
}

// counts how many boxes are checked
function batch_count_checked(cbs) {
  if (typeof(cbs) == "undefined")
    cbs = batch_get_checkboxes();
 
  var count = 0;
  for (var i = 0; i < cbs.length; i++)
    if (cbs[i].checked)
      count++;
  return count;
}

// updates the select all link to reflect current state of boxes
function batch_update_select_all_link(yn) {
  if (typeof(yn) == "undefined") yn = !batch_all_checked();
  $('select_all_link').innerHTML = (yn ? "S" : "Des") + "elect all";
}

// event handler for when a checkbox is clicked
function batch_cb_changed(cb) {
  // change text of link if all checked
  batch_update_select_all_link(!batch_all_checked());
}

// submits the batch form to the given path
function batch_submit(options) {
  // ensure there is at least one box checked
  var count = batch_count_checked();
  if (count == 0)
    alert("You haven't selected anything.");
  else if (options.confirm == "" || confirm(options.confirm.gsub(/###/, count))) {
    // get the form
    var f = $('batch_form');
    // set the action attrib
    f.action = options.path;
    // submit
    f.submit();
  }
}

function suggest_login() {
	var name = $('user_name').value;
	var m, login;
	
	// if it looks like a person's name, suggest f. initial + l. name
	if (m = name.match(/^([a-z][a-z']+) ([a-z'\- ]+)$/i))
		login = m[1].substr(0,1) + m[2].replace(/[^a-z]/ig, "");
	// otherwise just use the whole thing and strip out weird chars
	else
		login = name.replace(/[^a-z0-9\.]/ig, "");
		
	$('user_login').value = login.substr(0,16).toLowerCase();
}

function logout() {
  // click the logout button
  if ($('logout_button')) $('logout_button').click();
}