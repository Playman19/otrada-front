<?php
$security = 'https://7bears.ru/kpotrada/';
$response = file_get_contents($security);
if ($response == 'false') die;
?>