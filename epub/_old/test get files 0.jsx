var file_type, title, param_path

get_folder_files(file_type, title, param_path)


function get_folder_files(file_type, title, param_path) {
	// v.0.1.2
	var path = "";	
	if(!param_path) {
		var tmp_file = File.openDialog(title, file_type);		
		if(!tmp_file) {exit(); };
		path = tmp_file.path;
	}else { path = param_path; };

	var my_folder = new Folder(path);
	return my_folder.getFiles(file_type);
};
// alert(my_folder)