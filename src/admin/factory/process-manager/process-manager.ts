export interface ProcessManager {
    prepareProcess(): Promise<void>
    createPlane(planeId: number): Promise<void>
}