<?php
$data_type = empty($_POST['data_type'])?"json":$_POST['data_type'];

include 'php/HSArrayToXML.php';

if(isset($_POST['data_type'])) unset($_POST['data_type']);

switch($data_type)
{
	case 'xml':
		Header('Content-type: text/xml');
		$xml = new HSArrayToXML($_POST);
		echo $xml->getXML();
		break;
	case 'json':
		header('Content-Type: application/json');
		echo json_encode($_POST);
		break;
	default:
		header('Content-Type: text/plain');
		echo "Error: undefined type.\n";
}
