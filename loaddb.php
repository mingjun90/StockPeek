<!DOCTYPE html>
<html>
<head>
    <link rel="stylesheet" type="text/css" href="mycss/mystyle.css">
    <link rel="stylesheet" type="text/css" href="mycss/bootstrap.min.css">
    <script type="text/javascript" src="./myjs/jquery-2.1.3.min.js"></script>
    <script type="text/javascript" src="./myjs/bootstrap.min.js"></script>
    <script type="text/javascript" src="./myjs/jquery.tablesorter.js"></script>
</head>
<body>

<?php
$reqdata = intval($_GET['q']);

$con = mysqli_connect('localhost','Mingjun','password','wildcats');
if (!$con) {
    die('Could not connect: ' . mysqli_error($con));
}

mysqli_select_db($con,"wildcats");
// $sql="SELECT * FROM stockpk WHERE id = '".$reqdata."'";

// get all history data
$sql="SELECT * FROM stockpk ";

$result = mysqli_query($con,$sql);

while($row = mysqli_fetch_array($result)) {
    
    echo "<tr role=\"row\" class=\"sub\">";
    echo "<td >" . $row['Symbol'] ."</td>";
    echo "<td >" . $row['Price'] ."</td>";
    echo "<td >" . $row['PriceChange'] ."</td>";
    echo "<td >" . $row['PercentChange'] ."</td>";
    echo "<td >" . $row['Ask'] ."</td>";
    echo "<td >" . $row['Bid'] ."</td>";
    echo "<td >" . $row['Open'] ."</td>";
    echo "<td >" . $row['PreviousClose'] ."</td>";
    echo "<td >" . $row['Volume'] ."</td>";
    echo "<td >" . $row['SearchTime'] ."</td>";
    echo "</tr>";

}

mysqli_close($con);
?>
</body>
</html>