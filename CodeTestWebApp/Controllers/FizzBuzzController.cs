using Microsoft.AspNetCore.Mvc;
using System.Diagnostics;
using System.Net;

namespace CodeTestWebApp.Controllers
{
	[ApiController]
	[Route("/")]
	public class FizzBuzzController : ControllerBase
	{

		private readonly ILogger<FizzBuzzController> _logger;

		public FizzBuzzController(ILogger<FizzBuzzController> logger)
		{
			_logger = logger;
		}

		[HttpGet("ResolveFizzBuzzNumber")]
		public string ResolveFizzBuzzNumber(int numberToCheck)
		{
			return BuildReturnString(numberToCheck);
		}

		private static string BuildReturnString(int numberToCheck)
		{
			string returnString = "";
			if (numberToCheck % 3 == 0)
			{
				returnString += "Fizz";
			}
			if (numberToCheck % 5 == 0)
			{
				returnString += "Buzz";
			}

			if (returnString.Length == 0)
			{
				returnString = numberToCheck.ToString();
			}

			return returnString;
		}

		[HttpGet("CreateFizzBuzzResultsList")]
		public List<FizzBuzzResults> CreateFizzBuzzResultsList(int startNumber, int totalNumbers)
		{
			if (totalNumbers < 0)
			{
				throw new ArgumentOutOfRangeException(nameof(totalNumbers));
			}

			List<FizzBuzzResults> returnList = new List<FizzBuzzResults>();
			foreach (int numberToCheck in Enumerable.Range(startNumber, totalNumbers))
			{
				returnList.Add(new FizzBuzzResults(numberToCheck, BuildReturnString(numberToCheck)));
			}

			return returnList;
		}


		[HttpPost("VerifyFizzBuzzResults")]
		public List<FizzBuzzResults> FillFizzBuzzResults(List<FizzBuzzResults> listToTest)
		{
			foreach (FizzBuzzResults result in listToTest)
			{
				result.Result = BuildReturnString(result.Number);
			}
			return listToTest;
		}


	}



	public class FizzBuzzResults
	{
        public FizzBuzzResults(int number, string result)
        {
			this.Number = number;
			this.Result = result;
        }
        public int Number { get; set; }
		public string Result { get; set; }
	}
}