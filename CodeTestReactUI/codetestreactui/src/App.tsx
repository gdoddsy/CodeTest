import { CardDeck } from './components/card/CardDeck';
import './App.css';

function App() {
	return (
		<>
			<div>
				<b>Instructions</b>
			</div>
			<div>
				Complete the following 3 tasks on this page. Swagger API documentation for each task can be found <a href="https://codetestwebapp20240407064956.azurewebsites.net/swagger/index.html">here</a>.
				<ol>
					<li>Allow the user to enter a number (using the <a href="https://www.telerik.com/kendo-react-ui/components/inputs/numerictextbox/formats/">KendoUI NumericTextBox</a>) and submit that number to the ResolveFizzBuzzNumber endpoint at: <a href="https://codetestwebapp20240407064956.azurewebsites.net/ResolveFizzBuzzNumber">https://codetestwebapp20240407064956.azurewebsites.net/ResolveFizzBuzzNumber</a> and show the result on the screen next to the users input.
					</li>
					<li>
						Allow the user to enter 2 numbers: starting number and count. Submit both of these numbers to <a href="https://codetestwebapp20240407064956.azurewebsites.net/CreateFizzBuzzResultsList">https://codetestwebapp20240407064956.azurewebsites.net/CreateFizzBuzzResultsList</a>. The result is a list. Display this list in a grid (ideally <a href="https://www.telerik.com/kendo-react-ui/components/grid/">KendoUI Grid</a> - ignore the background saying it's unlicensed)
					</li>
					<li>
						Collect a list of numbers from the user and display their selection in a grid with two columns (number and result). When they have entered all the numbers they want, submit them as a list to <a href="https://codetestwebapp20240407064956.azurewebsites.net/VerifyFizzBuzzResults">https://codetestwebapp20240407064956.azurewebsites.net/VerifyFizzBuzzResults</a> and then update the UI with the result returned.
					</li>
				</ol>
			</div>
			<CardDeck/>
		</>
	)
}

export default App
