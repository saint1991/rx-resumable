import Resumable from 'resumablejs';
import { Observable, Subject } from 'rxjs';

import {
  BeforeCancel,
  Cancel,
  ChunkingStart,
  ChunkingProgress,
  ChunkingComplete,
  FileAdded,
  FilesAdded,
  FileSuccess,
  FileRetry,
  FileProgress,
  Pause,
  Progress,
  ResumableEvent,
  UploadStart,
  Complete,
  ResumableError,
} from './event';

export type ResumableFile = Resumable.ResumableFile;
export type ResumableOptions = Resumable.ConfigurationHash;
export type ResumableChunk = Resumable.ResumableChunk;

export class RxResumableUploader {
  private readonly resumable: Resumable.Resumable;
  readonly events$: Observable<ResumableEvent>;

  constructor(private readonly opts: ResumableOptions) {
    this.resumable = new Resumable(opts);

    this.events$ = this.observeEvents(this.resumable);
  }

  upload(...files: File[]) {
    this.resumable.addFiles(files);
  }

  pause() {
    this.resumable.pause();
  }

  cancel() {
    this.resumable.cancel();
  }

  private observeEvents(r: Resumable.Resumable): Observable<ResumableEvent> {
    const events$ = new Subject<ResumableEvent>();

    r.on('fileAdded', (file: ResumableFile) => {
      events$.next(new FileAdded(file));
    });

    r.on('filesAdded', (files: ResumableFile[]) => {
      events$.next(new FilesAdded(files));
    });

    r.on('fileProgress', (file: ResumableFile) => {
      events$.next(new FileProgress(file));
    });

    r.on('fileSuccess', (file: ResumableFile) => {
      events$.next(new FileSuccess(file));
    });

    r.on('fileRetry', (file: ResumableFile) => {
      events$.next(new FileRetry(file));
    });

    r.on('uploadStart', () => {
      events$.next(new UploadStart());
    });

    r.on('chunkingStart', (file: ResumableFile) => {
      events$.next(new ChunkingStart(file));
    });

    r.on('chunkingProgress', (file: ResumableFile, ratio: number) => {
      events$.next(new ChunkingProgress(file, ratio));
    });

    r.on('chunkingComplete', (file: ResumableFile) => {
      events$.next(new ChunkingComplete(file));
    });

    r.on('progress', () => {
      events$.next(new Progress());
    });

    r.on('pause', () => {
      events$.next(new Pause());
    });

    r.on('beforeCancel', (file: ResumableFile) => {
      events$.next(new BeforeCancel(file));
    });

    r.on('cancel', (file: ResumableFile) => {
      events$.next(new Cancel(file));
    });

    r.on('fileError', (file: ResumableFile, message: string) => {
      events$.error(new ResumableError('fileError', file, message));
    });

    r.on('error', (message: string, file: ResumableFile) => {
      events$.error(new ResumableError('error', file, message));
    });

    r.on('complete', () => {
      events$.next(new Complete());
    });

    return events$.asObservable();
  }
}
