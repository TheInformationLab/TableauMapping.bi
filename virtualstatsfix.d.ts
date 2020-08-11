// https://github.com/angular/angular-cli/issues/7474
import { VirtualStats } from '@ngtools/webpack/src/compiler_host';
import * as fs from 'fs';

declare module '@ngtools/webpack/src/compiler_host' {
    interface VirtualStats extends fs.Stats {
        atimeMs: number;
    }
}