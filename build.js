const fs = require('fs');
const path = require('path');

const publicDir = path.join(__dirname, 'public');
const htmlDir = path.join(__dirname, 'html');


if (!fs.existsSync(publicDir)) {
  fs.mkdirSync(publicDir);
  console.log('Created public directory.');
} else {
  console.log('Public directory already exists.');
}


const dirsToCopy = ['Assets', 'styles', 'script', 'templates', 'fonts'];

dirsToCopy.forEach(dir => {
  const sourceDir = path.join(__dirname, dir);
  const destDir = path.join(publicDir, dir);
  if (fs.existsSync(sourceDir)) {
    try {
      fs.cpSync(sourceDir, destDir, { recursive: true });
      console.log(`Copied ${dir} to public/${dir}.`);
    } catch (err) {
      console.error(`Error copying ${dir}:`, err);
    }
  } else {
    console.warn(`Warning: Directory ${dir} not found, skipping.`);
  }
});


if (fs.existsSync(htmlDir)) {
  try {
    const files = fs.readdirSync(htmlDir);
    files.forEach(file => {
      if (path.extname(file) === '.html') {
        const sourceFile = path.join(htmlDir, file);
        const destFile = path.join(publicDir, file);
        fs.copyFileSync(sourceFile, destFile);
        console.log(`Copied ${file} to public/${file}.`);
      }
    });
  } catch (err) {
    console.error('Error copying HTML files:', err);
  }
} else {
  console.warn('Warning: html directory not found, skipping HTML file copy.');
}

console.log('Build process completed.');