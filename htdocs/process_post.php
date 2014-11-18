<?php
$data_type = empty($_POST['data_type'])?"json":$_POST['data_type'];

if(isset($_POST['data_type'])) unset($_POST['data_type']);

switch($data_type)
{
	case 'xml':
		Header('Content-type: text/xml');
		$xml = new SimpleXMLElement("<post/>");
		foreach ($_POST as $key => $value)
		{
			$key = trim($key);
			$value = trim($value);
			$key = preg_replace("/\s+/", "", $key);
			if(!empty($key))
			{
				$var = $xml->addChild("var");
				$var->addChild("name", $key);
				$var->addChild("value", $value);
			}
		}
		echo $xml->asXML();
		break;
	case 'json':
		header('Content-Type: application/json');
		echo json_encode($_POST);
		break;
	default:
		header('Content-Type: text/plain');
		echo "Error: undefined type.\n";
}
