import { expose } from 'threads/worker';
import { JSCPD, IClone, IOptions } from '@jscpd/core';
import { CLONE_FOUND_EVENT, END_EVENT } from 'jscpd/src/events';

expose({
  async detect(options: IOptions): Promise<IClone[]> {
    const clones: IClone[] = [];
    const jscpd = new JSCPD(options);

    return new Promise((resolve, reject) => {
      jscpd.on(CLONE_FOUND_EVENT, (clone: IClone) => {
        clones.push(clone);
      });

      jscpd.on(END_EVENT, () => {
        resolve(clones);
      });

      jscpd.exec().catch(reject);
    });
  },
});
