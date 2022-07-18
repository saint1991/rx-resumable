import Resumable from 'resumablejs';

type ResumableFile = Resumable.ResumableFile;

type EventType =
  | 'fileAdded'
  | 'filesAdded'
  | 'fileSuccess'
  | 'fileProgress'
  | 'fileRetry'
  | 'fileError'
  | 'uploadStart'
  | 'complete'
  | 'progress'
  | 'error'
  | 'pause'
  | 'beforeCancel'
  | 'cancel'
  | 'chunkingStart'
  | 'chunkingProgress'
  | 'chunkingComplete'
  | 'catchAll';

export interface ResumableEvent {
  readonly type: EventType;
}

export class FileAdded implements ResumableEvent {
  readonly type: 'fileAdded' = 'fileAdded';
  constructor(readonly file: ResumableFile) {}
}

export class FilesAdded implements ResumableEvent {
  readonly type: 'filesAdded' = 'filesAdded';
  constructor(readonly files: ResumableFile[]) {}
}

export class FileProgress implements ResumableEvent {
  readonly type: 'fileProgress' = 'fileProgress';
  constructor(readonly file: ResumableFile) {}

  progress(relative: boolean): number {
    return this.file.progress(relative);
  }
}

export class FileSuccess implements ResumableEvent {
  readonly type: 'fileSuccess';
  constructor(readonly file: ResumableFile) {}
}

export class FileRetry implements ResumableEvent {
  readonly type: 'fileRetry' = 'fileRetry';
  constructor(readonly file: ResumableFile) {}
}

export class UploadStart implements ResumableEvent {
  readonly type: 'uploadStart' = 'uploadStart';
}

export class ChunkingStart implements ResumableEvent {
  readonly type: 'chunkingStart' = 'chunkingStart';
  constructor(readonly file: ResumableFile) {}
}

export class ChunkingProgress implements ResumableEvent {
  readonly type: 'chunkingProgress' = 'chunkingProgress';
  constructor(readonly file: ResumableFile, readonly ratio: number) {}
}

export class ChunkingComplete implements ResumableEvent {
  readonly type: 'chunkingComplete' = 'chunkingComplete';
  constructor(readonly file: ResumableFile) {}
}

export class Complete implements ResumableEvent {
  readonly type: 'complete' = 'complete';
}

export class Progress implements ResumableEvent {
  readonly type: 'progress' = 'progress';
}

export class Pause implements ResumableEvent {
  readonly type: 'pause' = 'pause';
}

export class BeforeCancel implements ResumableEvent {
  readonly type: 'beforeCancel' = 'beforeCancel';
  constructor(readonly file: ResumableFile) {}
}

export class Cancel implements ResumableEvent {
  readonly type: 'cancel' = 'cancel';
  constructor(readonly file: ResumableFile) {}
}

export class ResumableError implements ResumableEvent {
  constructor(readonly type: 'fileError' | 'error', readonly file: ResumableFile, message: string) {}
}
