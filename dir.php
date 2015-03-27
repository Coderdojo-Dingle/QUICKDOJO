<?php

$dir=$_GET['dir'];
$path=$_GET['path'];

$myDirectory = opendir($dir);

// get each entry
while($entryName = readdir($myDirectory)) {
if ($entryName != 'index.php') 
	$dirArray[] =  $entryName;
}
closedir($myDirectory);
sort($dirArray);

$indexCount	= count($dirArray);

print("<TABLE border=0 cellpadding=5 cellspacing=5>\n");
for($index=0; $index < $indexCount; $index++) {
        if (substr("$dirArray[$index]", 0, 1) != "."){ // don't list hidden files
		print("<TR><TD><a target=_blank href=\"$path$dirArray[$index]\">$dirArray[$index]</a></td>");
		print("</TR>\n");
	}
}
print("</TABLE>\n");
?>
