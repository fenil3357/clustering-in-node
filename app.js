import express from 'express';
import cluster from 'node:cluster';
import os from 'node:os';

// To enable Round Robing algorithm for windows
cluster.schedulingPolicy = cluster.SCHED_RR;

const PORT = process.env.PORT || 3030;
const numCPUs = os.cpus().length;

if (cluster.isPrimary) {
  for (let i = 0; i < numCPUs; i++) {
    cluster.fork();
  }

  cluster.on('exit', (worker, code, signal) => {
    console.log(`Worker ${worker.process.pid} died`);
    cluster.fork();
  });
}
else {
  const app = express();

  app.use(express.json());
  app.use(express.urlencoded({ extended: true }))

  app.get('/slow', async (req, res) => {
    try {
      
      // Blocking 
      for (let i = 1; i < 10000000000; i++) {

      }

      res.status(200).json({
        message: 'Request resolved',
        process_id: process.pid
      })
    } catch (error) {
      return res.status(500).json({
        error
      })
    }
  })

  app.get('/fast', async (req, res) => {
    try {
      return res.status(200).json({
        message: 'Request resolved',
        process_id: process.pid
      })
    } catch (error) {
      return res.status(500).json({ error });
    }
  })

  app.listen(PORT, () => {
    console.log(`Worker ${process.pid} started and listening on port ${PORT}`);
  });
}