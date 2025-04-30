// Automated pipeline lifecycle telemetry and hook registration
export interface LifecycleHook<T = any> {
  name: string;
  order: number;
  run: (ctx: T) => Promise<void> | void;
}

export class LifecyclePipeline {
  private hooks: LifecycleHook[] = [];
  register(hook: LifecycleHook): void {
    this.hooks.push(hook);
    this.hooks.sort((a, b) => a.order - b.order);
  }
  async dispatch(context: any): Promise<void> {
    for (const h of this.hooks) await h.run(context);
  }
}
