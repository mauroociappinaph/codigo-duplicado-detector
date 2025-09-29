import { expose } from 'threads/worker';
import { detectClones } from 'jscpd';
import { IClone, IOptions } from '@jscpd/core';

expose({
  async detect(options: IOptions): Promise<IClone[]> {
    return detectClones(options);
  },
});
