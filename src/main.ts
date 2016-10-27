import {Conductor} from './conductors';

const conductor = new Conductor();
conductor.pollRss().then((data) => console.log(data));
