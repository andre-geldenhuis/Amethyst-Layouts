function layout() {
    return {
        name: "StreamFocus-UltraWide",
        initialState: {},
        commands: {},
        getFrameAssignments: (windows, screenFrame, state) => {
            if (windows.length === 0) {
                return {};
            }

            // Define the frames for the primary and secondary windows
            const primaryWindowFrame = {
                x: screenFrame.x,
                y: screenFrame.y,
                width: 1920,
                height: 1080
            };

            const secondaryWindowFrame = {
                x: screenFrame.x + primaryWindowFrame.width,
                y: screenFrame.y,
                width: 1520,
                height: 1080
            };

            // Calculate the frame for the third window (under the primary window)
            const thirdWindowFrame = {
                x: screenFrame.x,
                y: screenFrame.y + primaryWindowFrame.height,
                width: 1920,
                height: 360
            };

            // Calculating space and positions for additional windows
            const additionalWindows = Math.max(windows.length - 3, 0);
            const bottomRightAreaWidth = 1520; // Width of the bottom right area
            const additionalWindowWidth = additionalWindows > 0 ? Math.floor(bottomRightAreaWidth / additionalWindows) : 0;

            let frames = {};
            windows.forEach((window, index) => {
                switch(index) {
                    case 0:
                        frames[window.id] = primaryWindowFrame;
                        break;
                    case 1:
                        frames[window.id] = secondaryWindowFrame;
                        break;
                    case 2:
                        frames[window.id] = thirdWindowFrame;
                        break;
                    default:
                        // Evenly distribute additional windows in the bottom right area
                        frames[window.id] = {
                            x: screenFrame.x + primaryWindowFrame.width + (index - 3) * additionalWindowWidth,
                            y: screenFrame.y + secondaryWindowFrame.height,
                            width: additionalWindowWidth,
                            height: 360
                        };
                        break;
                }
            });

            return frames;
        }
    };
}
 
