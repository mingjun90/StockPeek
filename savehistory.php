<!DOCTYPE html>
<html>
<head>
</head>

<body>
<?php

$con = mysqli_connect('localhost','Mingjun','password');
if (!$con) {
    die('Could not connect: ' . mysqli_error($con));
}
mysqli_select_db($con,"wildcats");

/*change is a reserved word*/
$sql = "INSERT INTO stockpk ( Symbol, Price, PriceChange, PercentChange, Ask, Bid, Open, PreviousClose, Volume) VALUES ( '$_POST[Symbol]', '$_POST[Price]', '$_POST[Change]','$_POST[PercentChange]', '$_POST[Ask]', '$_POST[Bid]', '$_POST[Open]', '$_POST[PreviousClose]', '$_POST[Volume]')";

mysqli_query($con,$sql);

mysqli_close($con);
?>
</body>
</html>
