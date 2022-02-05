let state = 0; let marker; let cursor = 0; let pages;
const frame = document.getElementById("mainContainer");
let btn = document.querySelector(".index_menu").querySelectorAll("button");

function slide(f,t,i)
{

	let start = (-f) * 100;
	let d = f-t;
	frame.style.top = start + (d*100*i/45) + "%";

	if(i < 45)
	{
		setTimeout(slide, 0.33333, f, t, i+1);
	}

}

function changeState(s)
{
	//when project button is clicked
	btn[state].disabled = false;
	btn[state].style.boxShadow = "none";
	btn[state].style.textDecoration = "none";


	btn[s].disabled = true;
	btn[s].style.boxShadow = "0 0 10px #9900ff";
	btn[s].style.textDecoration = "underline";

	if(state != s)
		slide(state,s,1);
	
	state = s;

}

function flip(to, t)
{

	if(to != cursor) {
		pages[cursor].style.transform = "rotateX(" + -180*t/60 + "deg)";
		pages[to].style.transform = "rotateX(" + (180 - 180*t/60) + "deg)";

		if (t < 60)
			setTimeout(flip, 0.1666, to, t+1)
		else 
		{	
			marker.querySelectorAll("li")[cursor].style.border = "none";
			marker.querySelectorAll("li")[to].style.border = "2px solid #ffffff";
			cursor = to;
		}
	}

}

function load()
{

	changeState(0);

	marker = document.querySelector(".marker");
	pages = document.querySelector(".project_card_container").querySelectorAll(".card");

	for (let i = 0; i < pages.length; i++)
	{
		let child = document.createElement("li");

		child.addEventListener("click", event => flip(i, 1));

		marker.appendChild(child);
		let R = []; let G = []; let B = []

		R.push(Math.floor((Math.random()*255)));
		G.push(Math.floor((Math.random()*255)));
		B.push(Math.floor((Math.random()*255)));

		R.push(Math.floor((Math.random()*255)));
		G.push(Math.floor((Math.random()*255)));
		B.push(Math.floor((Math.random()*255)));

		pages[i].style.background = "linear-gradient(150deg, rgba(" + R[0] + "," + G[0] + "," + B[0] + ",0.6), rgba(" + R[1] + "," + G[1] + "," + B[1] + ",0.6))";
		marker.querySelectorAll("li")[0].style.border = "2px solid #ffffff";

		if(i != cursor)
			pages[i].style.transform = "rotateX(180deg)";
	}

}