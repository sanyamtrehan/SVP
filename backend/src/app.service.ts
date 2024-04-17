import * as fs from 'fs';
import * as path from 'path';
import { Injectable } from '@nestjs/common';
import { Request, Response } from 'express';
import { MovieInfo } from './app.modal';

@Injectable()
export class AppService {
  moviesFolder = `/Users/sanyamtrehan/Movies/anime`;
  VIDEO_EXTENSIONS = ['.mkv', '.mp4', '.avi'];

  // -----------------------------------------------------------------------------------------------------
  // @ Public Methods
  // -----------------------------------------------------------------------------------------------------

  getHello(): string {
    return 'Hello World!';
  }

  getMoviesInfo() {
    return fs
      .readdirSync(this.moviesFolder)
      .map((anime) =>
        this.readDirRecursive(path.join(this.moviesFolder, anime)),
      )
      .filter(Boolean);
  }

  getMovieIcon(iconPath: string) {
    console.log(iconPath);
    try {
      return fs.readFileSync(iconPath);
    } catch (e) {
      return '';
    }
  }

  getMovie(movieLocation: string, req: Request, res: Response) {
    const range = req.headers.range;
    if (!range || !movieLocation) {
      return 'Range Not Found';
    }

    const stat = fs.statSync(movieLocation);
    const parts = range.replace(/bytes=/, '').split('-');
    const start = parseInt(parts[0], 10);
    const end = parts[1] ? parseInt(parts[1], 10) : stat.size - 1;
    const chunkSize = end - start + 1;
    const file = fs.createReadStream(movieLocation, { start, end });
    const head = {
      'Content-Range': `bytes ${start}-${end}/${stat.size}`,
      'Accept-Ranges': 'bytes',
      'Content-Length': chunkSize,
      'Content-Type': 'video/mp4',
    };
    res.writeHead(206, head);
    return file.pipe(res);
  }

  // -----------------------------------------------------------------------------------------------------
  // @ Private Methods
  // -----------------------------------------------------------------------------------------------------

  private readDirRecursive(directoryPath: string): MovieInfo {
    const stat = fs.statSync(directoryPath);
    if (!stat.isDirectory()) {
      if (this.isVideoFile(directoryPath)) {
        return {
          name: path.basename(directoryPath),
          type: 'file',
          path: `${directoryPath}`,
          thumbnail: null,
          icon: null,
          setParentIcon: false,
          children: null,
        };
      }
      return null;
    }

    const dirContents = fs.readdirSync(directoryPath);
    const children = dirContents
      .map((child) => this.readDirRecursive(path.join(directoryPath, child)))
      .filter(Boolean);

    if (children.length === 0) {
      return null;
    }

    const folder: MovieInfo = {
      name: path.basename(directoryPath),
      type: 'folder',
      path: `${directoryPath}`,
      thumbnail: `${directoryPath}/icon.png`,
      icon: null,
      setParentIcon: false,
      children: children,
    };

    // // Check for icon.png inside the current directory
    const iconPath = path.join(directoryPath, '..', 'icon.png');
    if (fs.existsSync(iconPath)) {
      folder.setParentIcon = true;
    }

    const firstChild = folder.children[0];
    if (firstChild && firstChild.setParentIcon) {
      folder.icon = this.imageToBase64(`${folder.path}/icon.png`);
    }

    return folder;
  }

  private isVideoFile(filename: string) {
    return this.VIDEO_EXTENSIONS.includes(path.extname(filename).toLowerCase());
  }

  private imageToBase64(filePath: string) {
    // Read the image file
    const imageData = fs.readFileSync(filePath);

    // Convert image data to Base64
    const base64Image = Buffer.from(imageData).toString('base64');

    return `data:image/png;base64,${base64Image}`;
  }
}
