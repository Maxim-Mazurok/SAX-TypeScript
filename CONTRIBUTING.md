### Opening [Pull Requests](https://github.com/Maxim-Mazurok/sax-ts/pulls)
If you are making a pull request, please add test cases (if applicable).
Good test case must pass with your patch and must fail without patch.

We support [WIP](https://github.com/marketplace/wip) tag in PR title, you can
use it if your PR is not completed and should not be merged yet.
Or use native [draft pull requests](https://github.blog/2019-02-14-introducing-draft-pull-requests/)

### Reporting [Issues](https://github.com/Maxim-Mazurok/sax-ts/issues)
Please, use issue templates when opening new issue and 
follow instructions in it.

#### How to find sax-ts version
##### Deno
If you are using deno, you should probably find
```typescript
import { SAXParser } from 'https://unpkg.com/sax-ts@1.2.5/src/sax.ts'
```
##### NPM
If you have installed it with [npm](https://www.npmjs.com/package/sax-ts), 
open your project directory in terminal and run 
```bash
npm list sax-ts
```
It will output something like 
```
└── sax-ts@1.2.5
```
or 
```
└── sax-ts@1.2.5 (github:Maxim-Mazurok/sax-ts#6eedc26953cef2f6ebb4ac02d5135564a570451b)
```
