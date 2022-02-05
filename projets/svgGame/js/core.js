let d;

let pause = true;
let restart = false;

const vmax = 12;
const amod = 4;
const max_rocks = 25;

const timer = document.getElementById("timer");
const score = document.getElementById("score");
const bscore = document.getElementById("best_score");

let ay = 0;
let sc = 0;
let bc = 0;

let min = 0;

let rocks = new Array();

const pause_win = eventWindow("PAUSE", 

					{
						score: sc,
					}

				);
pause_win.style.display = "none";

function load()
{

	d = new Svg("#render");

	run(-500,0,0,0);

}

function run(x,y,vy,t)
{
	if(!pause)
	{
		if (t%5 == 0 && Math.round(Math.random()) == 1 && rocks.length < max_rocks)
		{
			rocks.push(new Rock(d,t));
		}
		
		vy += ay;
		ay = 0;

		if (Math.abs(vy) > vmax)
		{
			if (vy > 0) { vy = vmax;}
			else { vy = -vmax;}
		}

		y -= vy;

		if (Math.abs(y) > (d.h)/2)
		{
			vy = -vy;
		}

		d.empty();

		for (let i = 0; i < rocks.length; i++)
		{
			rocks[i].update();
			if (rocks[i].x < -(d.w/2))
			{
				sc += Math.round(rocks[i].size*rocks[i].speed/50);
				rocks.splice(i, 1);
				i--;
			}
			else 
			{

				//test if it collided

				let dist = (x-rocks[i].x)**2 + (y-rocks[i].y)**2;

				if (dist < (8 + rocks[i].size)**2)
				{
					eventWindow("END", 

						{
							score: sc,
						}

					);

					if (bc < sc)
					{
						bc = sc;
						bscore.innerHTML = bc;
					}
					pause = true;
				}

			}
			
		}

		score.innerHTML = sc;

		d.createCircle("#aa0000", "#ff0000", 8, x, y);

		t++;

		if (t%60 == 0) {updateTimer(t/60);}

	}

	if(!restart) {
		setTimeout(run, 1000/60, x, y, vy, t);
	}
	else 
	{
		d.empty();
		restart = false;
		document.querySelector("body").removeChild(document.getElementsByName("END")[0]);
		run(-500,0,0,0);
	}

	


}

function eventWindow(name, args)
{

	let win = document.createElement('div');

	win.setAttribute("class", "eventWindow");
	win.setAttribute("name", name);

	let title = document.createElement('div');
	title.setAttribute("class", "event_title");
	title.setAttribute("name", "title");
	title.innerHTML = name;

	win.appendChild(title);

	let chrono = document.createElement('div');
	chrono.setAttribute("class", "event_message");
	chrono.setAttribute("name", "timer");
	chrono.innerHTML = "timer &nbsp; &nbsp; &nbsp;" + timer.innerHTML;

	win.appendChild(chrono);

	for (let key in args)
	{
		let object = document.createElement('div');
		object.setAttribute("class", "event_message");
		object.setAttribute("name", key);
		object.innerHTML = key + " &nbsp; &nbsp; &nbsp;" + args[key];

		win.appendChild(object);
	}

	document.querySelector("body").appendChild(win);

	return win;

}

function updateTimer(t)
{
	if (t >= 60)
	{
		min = (t-t%60)/60;
	}
	timer.innerHTML = min + " : " + t%60;
}

window.addEventListener("keydown", function(event) {

		if(event.defaultPrevented)
		{
			return;
		}

		if(event.key == "ArrowDown")
		{
			ay = -amod;
		}

		if(event.key == "ArrowUp")
		{
			ay = amod;
		}

		if(event.key == " ")
		{
			pause = !pause;

			if (pause) 
			{
				pause_win.style.display = "flex";
			}
			else 
			{
				pause_win.style.display = "none";
			}
		}

		return;

	}
)

function retry()
{
	sc = 0;
	ay = 0;
	timer.innerHTML = "0 : 0";
	rocks = new Array();
	restart = true;
}

load();