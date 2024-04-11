import './App.css'
import QuestionOne from './components/QuestionOne'
import QuestionTwo from './components/QuestionTwo'
import QuestionThree from './components/QuestionThree'

function App() {
    const baseUrl = "https://codetestwebapp20240407064956.azurewebsites.net"
    const fieldWidth = 300

    return (
        <>
            <QuestionOne url={baseUrl} fieldWidth={fieldWidth}/>
            <hr />
            <QuestionTwo url={baseUrl} fieldWidth={fieldWidth} />
            <hr />
            <QuestionThree url={baseUrl} />
        </>
    )
}

export default App
