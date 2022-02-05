class Tool
{

	static float(n, p)
	{
		return Math.round(n * (10**p))/(10**p);
	}

	static pgcd(a,b)
	{

		if (Math.round(a) != a || Math.round(b) != b)
		{
			return 0;
		}
		else
		{
			let r = 1;

			if (a < b)
			{
				let temp = a;
				a = b;
				b = temp;
			}

			while (r != 0)
			{
				r = a%b;
				a = b;
				b = r;
			}

			return a;

		}

	} // end PGCD

	static binome(n,k)
	{
		return Tool.factoriel(n) / (Tool.factoriel(k)*Tool.factoriel(n-k));
	} //end binome

	static factoriel(n)
	{

		if(n < 0)
		{
			return null;
		}

		if (n == 0)
		{
			return 1;
		}

		let f = 1;

		for (let i = 1; i <= n; i++)
		{
			f = f * i;
		}

		return f;
	} //end factoriel

}