class Rock {

	constructor(display, time)
	{
		this.disp = display;
		this.size = Math.round(Math.random()*40) + 10;

		let mult = 1 + (time/9000);

		if (mult > 4)
		{
			mult = 4;
		}

		this.speed = (Math.round(Math.random()*15) + 5) * mult;
		this.x = (this.disp.w)/2;
		this.y = Math.round(Math.random()*(this.disp.h)) - (this.disp.h)/2;

		this.disp.createCircle("#555555", "#ffffff", this.size, this.x, this.y);
	}

	update()
	{
		this.x -= this.speed;
		this.disp.createCircle("#555555", "#ffffff", this.size, this.x, this.y);
	}

}