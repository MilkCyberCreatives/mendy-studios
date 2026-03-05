import fs from 'node:fs/promises';
import path from 'node:path';
import sharp from 'sharp';

const IMAGES_ROOT = path.join(process.cwd(), 'public', 'images');
const MAX_WIDTH = 2560;
const JPEG_QUALITY = 72;
const MIN_SAVINGS_RATIO = 0.05;
const IMAGE_EXTENSIONS = new Set(['.jpg', '.jpeg']);

function toMb(bytes) {
  return `${(bytes / (1024 * 1024)).toFixed(2)} MB`;
}

async function walkFiles(dir) {
  const dirents = await fs.readdir(dir, { withFileTypes: true });
  const files = await Promise.all(
    dirents.map(async (entry) => {
      const fullPath = path.join(dir, entry.name);
      if (entry.isDirectory()) {
        return walkFiles(fullPath);
      }
      return [fullPath];
    })
  );
  return files.flat();
}

async function optimizeJpeg(filePath) {
  const extension = path.extname(filePath).toLowerCase();
  if (!IMAGE_EXTENSIONS.has(extension)) {
    return null;
  }

  const originalBuffer = await fs.readFile(filePath);
  const originalSize = originalBuffer.length;

  const image = sharp(originalBuffer, { failOnError: false }).rotate();
  const metadata = await image.metadata();

  let pipeline = image;
  if (metadata.width && metadata.width > MAX_WIDTH) {
    pipeline = pipeline.resize({ width: MAX_WIDTH, withoutEnlargement: true });
  }

  const optimizedBuffer = await pipeline
    .jpeg({
      quality: JPEG_QUALITY,
      mozjpeg: true,
      progressive: true,
      chromaSubsampling: '4:2:0',
    })
    .toBuffer();

  if (optimizedBuffer.length >= originalSize * (1 - MIN_SAVINGS_RATIO)) {
    return {
      changed: false,
      originalSize,
      optimizedSize: originalSize,
      filePath,
    };
  }

  await fs.writeFile(filePath, optimizedBuffer);

  return {
    changed: true,
    originalSize,
    optimizedSize: optimizedBuffer.length,
    filePath,
  };
}

async function main() {
  const allFiles = await walkFiles(IMAGES_ROOT);
  const jpegFiles = allFiles.filter((filePath) =>
    IMAGE_EXTENSIONS.has(path.extname(filePath).toLowerCase())
  );

  let totalBefore = 0;
  let totalAfter = 0;
  let changedCount = 0;

  for (const filePath of jpegFiles) {
    const result = await optimizeJpeg(filePath);
    if (!result) {
      continue;
    }

    totalBefore += result.originalSize;
    totalAfter += result.optimizedSize;

    if (result.changed) {
      changedCount += 1;
      const savings = result.originalSize - result.optimizedSize;
      const relativePath = path.relative(process.cwd(), result.filePath);
      console.log(
        `optimized: ${relativePath} (-${toMb(savings)} / ${(
          (savings / result.originalSize) *
          100
        ).toFixed(1)}%)`
      );
    }
  }

  const savedBytes = totalBefore - totalAfter;
  console.log('');
  console.log(`JPEG files scanned: ${jpegFiles.length}`);
  console.log(`JPEG files optimized: ${changedCount}`);
  console.log(`Total before: ${toMb(totalBefore)}`);
  console.log(`Total after:  ${toMb(totalAfter)}`);
  console.log(`Space saved:  ${toMb(savedBytes)}`);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
