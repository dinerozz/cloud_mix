const { execSync } = require('child_process');
const { readdirSync, writeFileSync, mkdirSync } = require('fs');
const { join } = require('path');

const svgDir = join(process.cwd(), '/public/assets/icons');
const outputDir = join(process.cwd(), 'src/components/atoms/Icons');

const svgFiles = readdirSync(svgDir).filter(file => file.endsWith('.svg'));

svgFiles.forEach(file => {
  const name = file.replace('.svg', '');
  const inputFilePath = join(svgDir, file);

  execSync(`npx svgr ${inputFilePath} --out-dir ${outputDir} --typescript --icon`);

  const indexPath = join(outputDir, 'index.ts');
  writeFileSync(indexPath, `export { default as ${'Svg' +name} } from './${name}';\n`, { flag: 'a' });
});
