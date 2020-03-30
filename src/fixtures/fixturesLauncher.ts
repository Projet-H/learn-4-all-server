import { createConnection, ConnectionOptions } from 'typeorm';
import { configService } from '../config/config.service';

async function run() {
  const options = {
    ...configService.getTypeOrmConfig(),
    debug: true
  };
  const connection = await createConnection(options as ConnectionOptions);
  // Run les fixtures...
}

run()
  .then(() => console.log('...wait for script to exit'))
  .catch(error => console.error('fixtures error', error));