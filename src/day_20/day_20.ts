// conjunction & -> remember last pulse received from EACH input module. default low for each. low/high -> remember low/high for that module, and then send a high pulse UNLESS all inputs are remembered as high, then low
// pulses are processed in the order they are sent. assume a time delay for processing at each node (a, b, c) => (a1, a2, a3)

enum ModuleType {
  FLIPFLOP,
  CONJUNCTION,
  BROADCASTER
}

interface Module {
  type: ModuleType,
  on?: boolean,
  inputModuleStates?: {[name: string]: boolean},
  destinationModules: string[]
}

export function productOfLowAndHighPulses(data: string, numberOfTimes: number): number {
  let lines = data.split("\n").map(line => line.trim()).filter(line => line);

  let modules: {[key: string]: Module} = {};
  for (let line of lines) {
    let match = line.match(/(\S+) -> (.+)/);
    if (!match) continue;
    let moduleType = match[1][0];
    let moduleName = match[1].slice(1);
    let destinationModules = match[2].split(", ");

    if (moduleType == "b") {
      moduleName = "broadcaster";
      modules[moduleName] = {
        type: ModuleType.BROADCASTER,
        destinationModules
      }
    } else if (moduleType == "&") {
      modules[moduleName] = {
        type: ModuleType.CONJUNCTION,
        inputModuleStates: {},
        destinationModules
      }
    } else if (moduleType == "%") {
      modules[moduleName] = {
        type: ModuleType.FLIPFLOP,
        on: false,
        destinationModules
      }
    } else {
      console.error("Module type not recognised ", moduleType);
    }
  }

  // Populate inputModuleStates of conjunction modules
  for (let [ name, module ] of Object.entries(modules)) {
    for (let destination of module.destinationModules) {
      if (modules.hasOwnProperty(destination) && modules[destination].type == ModuleType.CONJUNCTION) {
        modules[destination].inputModuleStates[name] = false;
      }
    }
  }

  function sendPulse(moduleName: string, isHigh: boolean, source?: string): {destinationName: string, isHigh: boolean, source: string}[] {
    // Sends a pulse to named module
    // Returns a list of modules that will receive a pulse from the named module, and whether it's a high or low pulse

    if (!modules.hasOwnProperty(moduleName)) {
      // Some modules seem to intentionally not exist so surpress below error 
      //console.error(`Received invalid module name ${moduleName}`);
      return []
    }

    let sendHigh = false;
    if (modules[moduleName].type == ModuleType.BROADCASTER) {
      // :)
    } else if (modules[moduleName].type == ModuleType.FLIPFLOP) {
      if (isHigh) return []; // Flipflops ignore high pulses
      modules[moduleName].on = !modules[moduleName].on;
      sendHigh = modules[moduleName].on;
    } else if (modules[moduleName].type == ModuleType.CONJUNCTION) {
      modules[moduleName].inputModuleStates[source] = isHigh;
      sendHigh = Object.values(modules[moduleName].inputModuleStates).some(b => !b);
    } else {
      console.error(`Did not recognise module type ${modules[moduleName].type}`);
    }
    return modules[moduleName].destinationModules.map(d => ({destinationName: d, isHigh: sendHigh, source: moduleName}));
  }

  let cycleLength = 0;
  let lowPulsesPerCycle = []; // Starts at 1 due to button press
  let highPulsesPerCycle = [];
  let stateHasReset = false;

  while(cycleLength != numberOfTimes && (cycleLength == 0 || !stateHasReset)) { // Until state is as beginning
    let lowPulses = 0;
    let highPulses = 0;
    let pulses: {destinationName: string, isHigh: boolean, source: string}[] = [{destinationName: "broadcaster", isHigh: false, source: "button"}];
    while (pulses.length > 0) {
      let newPulses = [];
      for (let pulse of pulses) {
        if (pulse.isHigh) highPulses++;
        else lowPulses++;

        newPulses = newPulses.concat(sendPulse(pulse.destinationName, pulse.isHigh, pulse.source));
      }
      pulses = newPulses;
    }
    lowPulsesPerCycle.push(lowPulses);
    highPulsesPerCycle.push(highPulses);
    cycleLength++;

    // Check if state has reset
    stateHasReset = true;
    for (let [name, module] of Object.entries(modules)) {
      if (module.type == ModuleType.FLIPFLOP && module.on) {
        stateHasReset = false;
        break;
      }
      if (module.type == ModuleType.CONJUNCTION && Object.values(module.inputModuleStates).some(on => on)) {
        stateHasReset = false;
        break;
      }
    }
  }

  let reduceFn = (sum, v, i) => sum += v * (Math.floor(numberOfTimes / cycleLength) + (numberOfTimes % cycleLength > i ? 1 : 0));
  console.log(lowPulsesPerCycle);
  console.log(highPulsesPerCycle);
  let lowPulsesSent = lowPulsesPerCycle.reduce(reduceFn, 0);
  let highPulsesSent = highPulsesPerCycle.reduce(reduceFn, 0);
  return lowPulsesSent * highPulsesSent;
}

function main(data: string) {
  console.log(productOfLowAndHighPulses(data, 1000));
}

if (require.main === module) {
  const fs = require("node:fs");

  fs.readFile("./day_20_data.txt", "utf8", (err, data) => {
      if (err) {
          console.log(err);
          return;
      }
      main(data);
  });
}
