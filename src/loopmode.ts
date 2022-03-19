export type LoopModeRefreshSync = {
    type: "refreshsync";
};
export type LoopModeFrameRate = {
    type: "framerate";
    frameRate: number;
};
export type LoopModeNTimes = {
    type: "ntimes";
    times: number;
};

export type LoopMode = LoopModeRefreshSync
    | LoopModeFrameRate
    | LoopModeNTimes;