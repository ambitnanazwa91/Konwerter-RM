const final = document.querySelector('.final')
const btn = document.querySelector('.button-54')
const input = document.querySelector('#inputNumber')
const nowDate = new Date()
const list = document.querySelector('.hour-list')
const OWCheck = document.querySelector('#OW')
const BasfCheck = document.querySelector('#basf')
const GenCheck = document.querySelector('#Gen')
const AICheck = document.querySelector('#AI')
const allCheck = document.querySelectorAll('.checkB')
const summaryWindow = document.querySelector('.summary-window')
const summary = document.querySelector('.hour-summary')
const bar = document.querySelector('.line')
const gLine = document.querySelector('.line-g')
const sumValue = document.querySelector('#sum-value')
const percentScore = document.querySelector('.percentScore')
const sixH = 6.5
const eightH = 8
let finalValue
let checkedCount = 0
let project
let oldHours = 0
let summaryHours
let precentValue

const finalNumber = () => {
	checkedCount = 0
	checkBoxes()
	console.log(project)
	if (input.value === '') {
		final.textContent = 'Wpisz wartość w minutach!'
	} else if (checkedCount === 0) {
		final.textContent = 'Wybierz projekt!'
	} else if (checkedCount > 1) {
		final.textContent = 'Głuptasie wybrałaś więcej niż jeden projekt!'
	} else {
		final.textContent = ''
		finalValue = input.value / 60
		final.textContent = `Twój czas do wbicia w tym zadaniu to: ${finalValue.toFixed(2)}`
		input.value = ''
		const newItemList = document.createElement('p')
		newItemList.textContent = `O ${nowDate.getHours()}:${nowDate.getMinutes()}
 wbiłaś w ${project} ${finalValue.toFixed(2)} godziny.`
		list.appendChild(newItemList)
		summaryHours = oldHours + finalValue
		console.log(summaryHours)
		oldHours = summaryHours
		checkSummary()
		sumValue.textContent = ` ${summaryHours.toFixed(2)} h.`
		// checkBar()
		precent()
		precentBar()
		console.log(summaryHours)
	}
}

const checkBoxes = () => {
	allCheck.forEach(checkbox => {
		if (checkbox.checked) {
			checkedCount++
			project = checkbox.value
			console.log(checkbox.value)
		}
	})
}

const checkSummary = () => {
	if (summaryHours > 0) {
		summaryWindow.classList.add('active')
	}
}

// const checkBar = () => {
// 	if (summaryHours > 0 && summaryHours < 5.0) {
// 		bar.classList.add('line-r')
// 	} else if (summaryHours >= 5.0 && summaryHours < 6.5) {
// 		bar.classList.remove('line-r')
// 		bar.classList.add('line-y')
// 	} else if (summaryHours >= 6.5 && summaryHours < 8.0) {
// 		bar.classList.remove('line-r')
// 		bar.classList.remove('line-y')
// 		bar.classList.add('line-g')
// 	} else {
// 		bar.classList.remove('line-r')
// 		bar.classList.remove('line-y')
// 		bar.classList.remove('line-g')
// 		bar.classList.add('line-b')
// 	}
// }

const precentBar = () => {
	if (precentValue > 0 && precentValue < 30) {
		bar.classList.add('line-r')
		bar.style.width = precentValue + '%'
	} else if (precentValue >= 30 && summaryHours < 6.5) {
		bar.classList.add('line-y')
		bar.style.width = precentValue + '%'
	} else if (summaryHours >= 6.5 && precentValue < 100) {
		bar.classList.add('line-g')
		bar.style.width = precentValue + '%'
	} else if (summaryHours > 8 && precentValue >= 100) {
		bar.classList.add('line-b')
		bar.style.width = '100%'
	}
}

const precent = () => {
	if (summaryHours < 6.5) {
		precentValue = (summaryHours / sixH) * 100
		precentValue = Math.floor(precentValue)
		console.log(precentValue)
		percentScore.textContent = `${precentValue}%`
	} else {
		precentValue = (summaryHours / eightH) * 100
		precentValue = Math.floor(precentValue)
		console.log(precentValue)
		percentScore.textContent = `${precentValue}%`
	}
}

btn.addEventListener('click', finalNumber)
