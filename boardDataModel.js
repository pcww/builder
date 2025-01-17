// Hera Board
// Used to keep track of a complete board data model and document some property usage. Notes should likely be moved to the Board Backbone model.
let HeraExampleBoard = {
  "name": "Hera",
  "template": false, // [true, false] whether this is a PCW "god board template"
  "brand": { // NOT CURRENTLY USED ANYWHERE! - REMOVE? (Brian, 10/19/2016)
    "placement": "top left" // ["bottom", "left", "right", "top"]
  },
  "edge": {
    "profile": "small round" // ["small round", "large round", "bead", "chamfer", "cove"]
  },
  "endcaps": {
    "color": "nickel", // ["black", "nickel", "white"]
    "type": "nut cover", // ["button", "nut cover"]
    "branding": "pineclifflogo" // ["pineclifflogo", "pcwartlogo", "none"]
    "chooseapattern": false // will be the selected pattern's filename if chosen
  },
  "feet": {
    "type": "screw" // ["screw", "suction"]
  },
  "handle": false, // ["none", "shaped", "stainless", "dado", "turned", "elk-horn"]
  "groove": false // [true, false],
  "width": "{calculated}",
  "strips": [
    // strip
    {
      "size": "xsmall",
      "wood": "purpleheart",
      "endGrain": "end-grain-no"
    },
    {
      "size": "small",
      "wood": "oakred",
      "endGrain": "end-grain-no"
    },
    {
      "size": "medium",
      "wood": "maple",
      "endGrain": "end-grain-no"
    },
    {
      "size": "medium",
      "wood": "maple",
      "endGrain": "end-grain-no"
    },
    {
      "size": "medium",
      "wood": "maple",
      "endGrain": "end-grain-no"
    },
    {
      "size": "medium",
      "wood": "maple",
      "endGrain": "end-grain-no"
    },
    {
      "size": "medium",
      "wood": "maple",
      "endGrain": "end-grain-no"
    },
    {
      "size": "medium",
      "wood": "maple",
      "endGrain": "end-grain-no"
    },
    {
      "size": "medium",
      "wood": "maple",
      "endGrain": "end-grain-no"
    },
    {
      "size": "medium",
      "wood": "maple",
      "endGrain": "end-grain-no"
    },
    {
      "size": "medium",
      "wood": "maple",
      "endGrain": "end-grain-no"
    },
    {
      "size": "medium",
      "wood": "maple",
      "endGrain": "end-grain-no"
    },
    {
      "size": "medium",
      "wood": "maple",
      "endGrain": "end-grain-no"
    },
    {
      "size": "medium",
      "wood": "maple",
      "endGrain": "end-grain-no"
    },
    {
      "size": "medium",
      "wood": "maple",
      "endGrain": "end-grain-no"
    },
    {
      "size": "medium",
      "wood": "maple",
      "endGrain": "end-grain-no"
    },
    {
      "size": "medium",
      "wood": "maple",
      "endGrain": "end-grain-no"
    },
    {
      "size": "medium",
      "wood": "maple",
      "endGrain": "end-grain-no"
    },
    {
      "size": "medium",
      "wood": "maple",
      "endGrain": "end-grain-no"
    },
    {
      "size": "medium",
      "wood": "maple",
      "endGrain": "end-grain-no"
    },
    {
      "size": "small",
      "wood": "oakred",
      "endGrain": "end-grain-no"
    },
    {
      "size": "xsmall",
      "wood": "purpleheart",
      "endGrain": "end-grain-no"
    }
  ],
  "length": 24
}
