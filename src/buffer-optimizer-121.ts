// Buffer pooling and zero-copy allocation tuning
export class BufferPool {
  private static pool: Buffer[] = [];
  static acquire(size = 4096): Buffer {
    return this.pool.pop() || Buffer.allocUnsafe(size);
  }
  static release(buf: Buffer): void {
    if (this.pool.length < 64) this.pool.push(buf);
  }
}
