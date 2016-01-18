<?php

header('Content-Type: application/json');

$people = [
    [
        'name' => 'John',
        'photo' => 'person01',
        'occupation' => 'teacher',
        'birthdate' => '1960-05-25',
        'sex' => 'male',
    ],
    [
        'name' => 'Rose',
        'photo' => 'person02',
        'occupation' => 'manager',
        'birthdate' => '1980-03-17',
        'sex' => 'female',
    ],
    [
        'name' => 'Lacey',
        'photo' => 'person03',
        'occupation' => 'cashier',
        'birthdate' => '1987-05-20',
        'sex' => 'female',
    ],
    [
        'name' => 'Bill',
        'photo' => 'person04',
        'occupation' => 'chef',
        'birthdate' => '1962-10-04',
        'sex' => 'male',
    ],
    [
        'name' => 'Rebeca',
        'photo' => 'person05',
        'occupation' => 'manicurist',
        'birthdate' => '1975-06-07',
        'sex' => 'female',
    ],
    [
        'name' => 'Conrad',
        'photo' => 'person06',
        'occupation' => 'plumber',
        'birthdate' => '1958-05-30',
        'sex' => 'male',
    ],
    [
        'name' => 'Marissa',
        'photo' => 'person07',
        'occupation' => 'writer',
        'birthdate' => '1976-08-21',
        'sex' => 'female',
    ],
    [
        'name' => 'Sarah',
        'photo' => 'person08',
        'occupation' => 'actress',
        'birthdate' => '1980-01-10',
        'sex' => 'female',
    ],
    [
        'name' => 'Mila',
        'photo' => 'person09',
        'occupation' => 'actress',
        'birthdate' => '1983-08-14',
        'sex' => 'female',
    ],
    [
        'name' => 'Ashton',
        'photo' => 'person10',
        'occupation' => 'actor',
        'birthdate' => '1978-02-07',
        'sex' => 'male',
    ],
];

$info = isset($_POST['info']) ? $_POST['info'] : false;
$result = [];

if ($info !== false) {
    $result = $people[$info];
} else {
    foreach($people as $v) {
        $temp = [];
        $temp['name'] = $v['name'];
        $temp['photo'] = $v['photo'];
        $result[] = $temp;
    }
}

echo json_encode($result);