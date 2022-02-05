//using Tool

class Point 
{
	
	constructor(x,y)
	{
		this.x = x;
		this.y = y;
	}

	static dist(a,b)
	{
		dx = a.x - b.x;
		dy = a.x - b.x;

		return Math.sqrt(dx**2 + dy**2);
	}

	static line(a,b)
	{

		let v = new Vector(a.x - b.x, a.y - b.y);

		return new Line(v, a);

	}

	static mediatrice(a,b)
	{

		let v = new Vector(a.x - b.x, a.y - b.y);
		n = v.normal();
		n.normalize();

		let p = new Point( (a.x + b.x)/2, (a.y + b.y)/2);

		return new Line(n, p); 

	}

}

class Segment
{

	constructor(a,b)
	{
		this.p1 = a;
		this.p2 = b;
	}

	length()
	{
		return Point.dist(this.p1, this.p2);
	}

	line()
	{
		return Point.line(this.p1, this.p2);
	}

}

class Line
{

	constructor(v, p)
	{
		v.resize(v.size()/v.x);
		this.v = v;
		let y = p.y - (p.x*v.y); 
		this.o = new Point(0,y);
	}

}