<?php
require 'vendor/autoload.php'; // 引入Composer的自动加载文件

use GuzzleHttp\Client;
use GuzzleHttp\Exception\RequestException;

$url = 'https://www.huzhan.com/data'; // 目标URL
$method = 'GET'; // 请求方法
$headers = [
    'Content-Type' => 'application/json',
    'Authorization' => 'Bearer YOUR_ACCESS_TOKEN' // 如果有需要认证的头部
];
$options = [
    'headers' => $headers, // 设置头部信息
];

try {
    $client = new Client();
    $response = $client->request($method, $url, $options);
    echo $response->getBody(); // 输出响应内容
} catch (RequestException $e) {
    echo $e->getMessage(); // 捕获并处理异常信息
}
?>
