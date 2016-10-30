import IScheduleData = Later.IScheduleData;
let later = require('later');

export class Schedule {
	private timer: Later.ITimer;
	private task: Function;
	public schedule: IScheduleData;

	constructor(foo: string, task: Function) {
		this.task = task;
		this.schedule = later.parse.text(foo);
	}

	start() {
		this.timer = later.setInterval(this.task, this.schedule);
	}

	stop() {
		this.timer.clear();
	}

	get nextScheduleRun() {
		return later.schedule(this.schedule).next(1);
	}
}
