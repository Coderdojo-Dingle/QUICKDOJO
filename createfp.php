<html>

<?
$gpath = $_POST["gpath"];
if ($gpath=='D:\\Hosting\\'+ /*your domain number goes here*/+'\\html\\quickdojo\\pages\\') {
file_put_contents($_POST["file"], $_POST["code"]); 
}
?>

</html>
