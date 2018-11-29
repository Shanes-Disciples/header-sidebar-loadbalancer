const express = require('express');
const request = require('request');
const PORT = 8080;
const servers = [
  'http://ec2-54-193-76-148.us-west-1.compute.amazonaws.com:3003', 
  'http://ec2-52-53-213-213.us-west-1.compute.amazonaws.com:3003',
];
let cur = 0;

const handler = (req, res) => {
  req.pipe(request({ url: servers[cur] + req.url })).pipe(res);
  cur = (cur + 1) % servers.length;
};
const server = express().get('*', handler).post('*', handler);

server.listen(PORT, () => {
  console.log(`listening on http://localhost:${PORT}/`);
});