# Clustering in Node.js

## Overview

It is a very basic express server to demonstrate the concept of clustering in node js.

The server has two routes slow and fast. Slow one takes so much time to respond and blocks the main thread, while fast one responds immediately.

Using cluster module we can run multiple instances of the express server as different processes. So load balancing can be implementated using cluster to handle multiple requests concurrently.

Here the number of processes will be equal to total number of logical CPU cores.

## Set-up

Execute below commands

```
git clone https://github.com/fenil3357/clustering-in-node.git

cd clustering-in-node

npm install

npm run start
```
