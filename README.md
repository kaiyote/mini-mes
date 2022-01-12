# mini-mes

## commands
- npm run dev - run the thing, launches on port 3000 (or first open port)
- npm run lint - lints the typescript & styled-components
- npm test - runs jest tests

## how it works - the basics
- hit "start new reactor" to get assigned a new reactor
- hit "open input" to open the input valve and start filling the reactor
- the ui will update every second showing the current status of the reactor
- at ~65% full a warning will appear to alert the technician they should close the input soon
- hit "close input" to close the input
- at ~75C in temperature a warning will appear to alert the technician to open the output soon
- once the output is opened the tracking will continue
- once the reactor is empty a final Batch Record is displayed

## things it doesn't do, but definitely should if this was real
- error handling? there is none. if something goes wrong, it'll probably just implode
- maybe auto-open/close the valves? that seems like a nice thing to do? might not be allowed legally or what not tho
- more error handling? seriously, there is no error handling here
- a batch record history? store it in local-storage? some sort of storage on the backend? might be a nice to have
- authentication? there is none, feels like this should have some auth around it.

## things it'd do that aren't "necessary" if there were more time
- be pretty. this is ugly as sin right now. it "works" and goes absolutely zero bits beyond that
- did i mention error handling / auth? cause yeah
