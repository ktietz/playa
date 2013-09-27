<?php
/**
 * Created by JetBrains PhpStorm.
 * User: Karl
 * Date: 2013-09-24
 * Time: 10:05 AM
 * To change this template use File | Settings | File Templates.
 */

//
//header('Access-Control-Allow-Origin: http://www.some-site.com');
//
//$array = [
//    "id" => "1",
//    "name" => "Brochetas",
//    "address" => "foo",
//    "phone" => "foo",
//    "email" => "foo",
//    "website" => "foo",
//];

$data = getDataAsJSON();
echo $_GET['jsonp_callback'] . '(' . $data . ');';
// prints: jsonp123({"id":1,"name":"Brochetas","address":"28 NTE between Mamita's beach and 1a. Ave. Aldea Thai. 77710, Playa del carmen, Quintana Roo","phone":"01 984 803 2566","email":"info@brochetas.com.mx","website":"http://www.brochetas.com.mx"});

//echo json_encode($array);


//header("Content-Type: application/json");
//echo $_GET['callback'] . '(' . "{'fullname' : 'Jeff Hansen'}" . ')';


function getDataAsJSON() {
    return '[{"id":1,"name":"Brochetas","address":"28 NTE between Mamitas beach and 1a. Avse. Aldea Thai. 77710, Playa del carmen, Quintana Roo","phone":"01 984 803 2566","email":"info@brochetas.com.mx","website":"brochetas.com.mx"}]';
}