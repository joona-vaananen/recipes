import * as utils from '@strapi/utils';
import fs, { ReadStream } from 'fs';
import * as fse from 'fs-extra';
import path from 'path';
import { getPlaiceholder, type IGetPlaiceholderOptions } from 'plaiceholder';

interface File {
  alternativeText?: string;
  buffer?: Buffer;
  caption?: string;
  ext?: string;
  formats?: Record<string, unknown>;
  hash: string;
  height?: number;
  mime: string;
  name: string;
  path?: string;
  placeholder?: string;
  previewUrl?: string;
  provider_metadata?: Record<string, unknown>;
  provider?: string;
  size: number;
  stream?: ReadStream;
  url: string;
  width?: number;
}

const { PayloadTooLargeError } = utils.errors; // eslint-disable-line
const { kbytesToBytes, bytesToHumanReadable } = utils.file; // eslint-disable-line

const UPLOADS_FOLDER_NAME = 'uploads';

interface InitOptions {
  placeholder?: IGetPlaiceholderOptions;
  sizeLimit?: number;
}

interface CheckFileSizeOptions {
  sizeLimit?: number;
}

export const init = (initOptions: InitOptions = {}) => {
  // TODO V5: remove providerOptions sizeLimit
  if (initOptions.sizeLimit) {
    process.emitWarning(
      '[deprecated] In future versions, "sizeLimit" argument will be ignored from upload.config.providerOptions. Move it to upload.config'
    );
  }

  // Ensure uploads folder exists
  const uploadPath = path.resolve(
    strapi.dirs.static.public,
    UPLOADS_FOLDER_NAME
  );
  if (!fse.pathExistsSync(uploadPath)) {
    throw new Error(
      `The upload folder (${uploadPath}) doesn't exist or is not accessible. Please make sure it exists.`
    );
  }

  return {
    checkFileSize(file: File, options: CheckFileSizeOptions) {
      const { sizeLimit } = options ?? {};

      // TODO V5: remove providerOptions sizeLimit
      if (initOptions.sizeLimit) {
        if (kbytesToBytes(file.size) > initOptions.sizeLimit)
          throw new PayloadTooLargeError(
            `${file.name} exceeds size limit of ${bytesToHumanReadable(
              initOptions.sizeLimit
            )}.`
          );
      } else if (sizeLimit) {
        if (kbytesToBytes(file.size) > sizeLimit)
          throw new PayloadTooLargeError(
            `${file.name} exceeds size limit of ${bytesToHumanReadable(
              sizeLimit
            )}.`
          );
      }
    },
    /*
    uploadStream(file: File): Promise<void> {
      if (!file.stream) {
        return Promise.reject(new Error('Missing file stream'));
      }

      const { stream } = file;

      return new Promise((resolve, reject) => {
        pipeline(
          stream,
          fs.createWriteStream(
            path.join(uploadPath, `${file.hash}${file.ext}`)
          ),
          (err) => {
            if (err) {
              return reject(err);
            }

            file.url = `/${UPLOADS_FOLDER_NAME}/${file.hash}${file.ext}`;

            resolve();
          }
        );
      });
    },
    */
    async upload(file: File): Promise<void> {
      if (!file.buffer) {
        return Promise.reject(new Error('Missing file buffer'));
      }

      const { buffer, mime } = file;

      // generate placeholder for image
      if (mime.startsWith('image/')) {
        try {
          const { base64 } = await getPlaiceholder(
            buffer,
            initOptions.placeholder
          );

          file.placeholder = base64;
        } catch {
          strapi.log.warn(
            `Failed to generate placeholder for image "${file.name}"!`
          );
        }
      }

      return new Promise((resolve, reject) => {
        // write file in public/assets folder
        fs.writeFile(
          path.join(uploadPath, `${file.hash}${file.ext}`),
          buffer,
          (err) => {
            if (err) {
              return reject(err);
            }

            file.url = `/${UPLOADS_FOLDER_NAME}/${file.hash}${file.ext}`;

            resolve();
          }
        );
      });
    },
    delete(file: File): Promise<string | void> {
      return new Promise((resolve, reject) => {
        const filePath = path.join(uploadPath, `${file.hash}${file.ext}`);

        if (!fs.existsSync(filePath)) {
          resolve("File doesn't exist");
          return;
        }

        // remove file from public/assets folder
        fs.unlink(filePath, (err) => {
          if (err) {
            return reject(err);
          }

          resolve();
        });
      });
    },
  };
};
