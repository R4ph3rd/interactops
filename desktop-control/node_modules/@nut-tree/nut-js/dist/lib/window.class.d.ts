import { NativeAdapter } from "./adapter/native.adapter.class";
import { Region } from "./region.class";
export declare class Window {
    private nativeActions;
    private windowHandle;
    constructor(nativeActions: NativeAdapter, windowHandle: number);
    get title(): Promise<string>;
    get region(): Promise<Region>;
}
//# sourceMappingURL=window.class.d.ts.map