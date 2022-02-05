class Vector
{

	constructor(x,y)
	{
		this.x = x;
		this.y = y;
	}

	static size(v)
	{
		return Math.sqrt(v.x**2 + v.y**2);
	}

	size()
	{
		return Vector.size(this);
	}

	rotate(deg)
	{
		let v = new Vector(0,0);

		let i =	this.x;
		let j = this.y;
		let o = ((deg%360)/360)*2*Math.PI;

		v.x = Tool.float(i*Math.cos(o) - j*Math.sin(o), 2);
		v.y = Tool.float(j*Math.cos(o) + i*Math.sin(o), 2);

		return v
	}

	normal()
	{
		return this.rotate(90);
	}

	resize(l)
	{

		let k = l/this.size();

		this.x = this.x * k;
		this.y = this.y * k;

	}

	normalize()
	{
		this.resize(1);
	}

	static scalar(u,v)
	{
		return (u.x * v.x) + (u.y * v.y);
	}

	static angle(u,v)
	{
		return Tool.float(Math.acos(Vector.scalar(u,v)/(u.size()*v.size()))*(360/(2*Math.PI)), 3);
	}

	static add(array)
	{

		let vx = 0;
		let vy = 0;

		for(let i = 0; i < array.length; i++)
		{
			vx += array[i].x;
			vy += array[i].y;
		}

		return new Vector(vx, vy);

	}

	static mul(u,v)
	{
		return Tool.float((u.size() * v.size()) * Math.sin(Vector.angle(u,v)/(360/(2*Math.PI))), 2);
	}

}