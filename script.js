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
const regex = /[\d,.]+/g
let extractedValue
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

		addItem()
		// summaryHours = oldHours + finalValue
		addSummarySum()

		
		oldHours = summaryHours
		checkSummary()
		addSumValue()
		precent()
		precentBar()
		clearChB()
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
	} else {
		summaryWindow.classList.remove('active')
	}
}

const addSummarySum = () => {
	summaryHours = oldHours + finalValue
	// summaryHours = summaryHours.toFixed(2);
}

const precentBar = () => {
	if (precentValue >= 0 && precentValue < 30) {
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

allCheck.forEach(function (checkB) {
	checkB.addEventListener('change', function () {
		// Jeśli checkbox został zaznaczony
		if (this.checked) {
			// Odznaczenie innych checkboxów
			allCheck.forEach(function (otherCheckbox) {
				if (otherCheckbox !== checkB) {
					otherCheckbox.checked = false
				}
			})
		}
	})
})

// const addDelteBtn = () => {
// 	const newDiv = document.createElement('div')
// 	newDiv.classList.add('dynamicDiv')
// 	const pInDiv = document.createElement('p')
// 	pInDiv.classList.add('pInDivClass')
// 	pInDiv.textContent = `O ${nowDate.getHours()}:${nowDate.getMinutes()}
//  wbiłaś w ${project} ${finalValue.toFixed(2)} godziny.`
// 	newDiv.appendChild(pInDiv)
// 	list.appendChild(newDiv)
// }

const addItem = () => {
	const newDiv = document.createElement('div')
	newDiv.classList.add('dynamicDiv', 'flex-row-center')

	const pInDiv = document.createElement('p') // Użyj document.createElement
	pInDiv.classList.add('pInDivClass')
	pInDiv.textContent = `O ${nowDate.getHours()}:${nowDate.getMinutes()} 
    wbiłaś w ${project} ${finalValue.toFixed(2)} godziny.`

	newDiv.appendChild(pInDiv) // Dodaj <p> do <div>

	// Tworzymy button do  kosza
	const trashIconBtn = document.createElement('button')
	trashIconBtn.classList.add('p5', 'trashButton')

	//Tworzymy ikone w buttonie
	const trashIcon = document.createElement('i')
	trashIcon.classList.add('p5', 'fa-solid', 'fa-trash')

	// Dodajemy event listener do ikony kosza
	trashIconBtn.addEventListener('click', e => removeDiv(e))

	newDiv.appendChild(trashIconBtn) // Dodaj buttonm  do <div>
	trashIconBtn.appendChild(trashIcon) // Dodaj icone do btn
	list.appendChild(newDiv) // Dodaj nowy <div> do listy
}

// Funkcja do usuwania diva
const removeDiv = e => {
	e.stopPropagation() // Zatrzymaj propagację
	const divToRemove = e.target.closest('.dynamicDiv') // Znajdź najbliższy <div>
	if (divToRemove) {
		divToRemove.remove() // Usuń <div>
	}
	getTime(e)
	removeTime()
	precent()
	precentBar()
	addSumValue()
	checkSummary()
}

const getTime = e => {
	const time = e.target
	const btnTime = time.closest('button')
	console.log(btnTime)
	const pTime = btnTime.previousSibling
	console.log(pTime)
	const text = pTime.textContent
	console.log(text)
	const dynamicMatches = text.match(regex)
	if (dynamicMatches && dynamicMatches.length >= 2) {
		extractedValue = parseFloat(dynamicMatches[2].replace(',', '.'))
		console.log(`Wyciągnięta wartość do usunięcia: ${extractedValue.toFixed(2)}`)
	} else {
		console.log('Nie znaleziono drugiej wartości.')
	}
}

const removeTime = () => {
	summaryHours = summaryHours.toFixed(2) - extractedValue.toFixed(2)
	console.log(summaryHours)
}

const addSumValue = () => {
	sumValue.textContent = ` ${summaryHours} h.`
}

const clearChB = () => {
	allCheck.forEach(box => {
		box.checked = false
	})
}

btn.addEventListener('click', finalNumber)
