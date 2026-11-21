import {build} from 'vite';
import react from '@vitejs/plugin-react';
import {readFile,writeFile} from 'node:fs/promises';
const result=await build({configFile:false,define:{'process.env.NODE_ENV':JSON.stringify('production')},plugins:[react()],publicDir:false,build:{write:false,cssCodeSplit:false,lib:{entry:'web.tsx',name:'PashuSaathi',formats:['iife']}}});
const assets=result[0].output;
const js=assets.find(x=>x.type==='chunk').code.replace(/<\/script/gi,'<\\/script');
const css=assets.find(x=>x.fileName.endsWith('.css')).source;
const html=(await readFile('farm.html','utf8')).replace('</style>',css+'</style>').replace(/<script type="module"[^>]*><\/script>/,()=>'<script>'+js+'</script>');
await writeFile('index.html',html);
