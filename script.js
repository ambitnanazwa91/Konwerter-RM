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
let finalValue
let checkedCount = 0
let project
let oldHours = 0
let summaryHours

const finalNumber = () => {
	checkedCount = 0
	checkBoxes()
	console.log(project)
	if (checkedCount === 0) {
		final.textContent = 'Wybierz projekt!'
	} else if (checkedCount > 1) {
		final.textContent = 'Głuptasie wybrałaś więcej niż jeden projekt!'
	} else {
		final.textContent = ''
		finalValue = input.value / 60
		final.textContent = `Twój czas do wbicia w tym zadaniu to: ${finalValue.toFixed(2)}`
		input.value = ''
		const newItemList = document.createElement('p')
		newItemList.textContent = `${nowDate.getHours()}:${nowDate.getMinutes()}
 wbiłaś w ${project} ${finalValue.toFixed(2)} godziny.`
		list.appendChild(newItemList)
		summaryHours = oldHours + finalValue
		console.log(summaryHours)
		oldHours = summaryHours
		checkSummary()
		summary.textContent = `W sumie przepracowałaś dziś: ${summaryHours.toFixed(2)} godzin.`
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

btn.addEventListener('click', finalNumber)
