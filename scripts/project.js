
const form = document.querySelector('.form')
const inputList = Array.from(form.querySelectorAll('.form__input'))
const checkboxElement = form.querySelector('.form__checkbox')
const buttonElement = form.querySelector('.button')
const formErrorElement = form.querySelector('.form__empty-error')
const showForm  = document.querySelector(".button__form")

showForm.addEventListener('click' ,    function feedBack(){
     form.style.visibility = "visible";
            })



startValidation()
function startValidation() {
  toggleButton()
  form.addEventListener('submit', (event) => {
    event.preventDefault()
    if (hasInvalidInput()) {
      formError()
      inputList.forEach((inputElement) => {
        checkInputValidity(inputElement)
        toggleInputError(inputElement)
      })
      toggleInputError(checkboxElement)
    }
  })
  inputList.forEach((inputElement) => {
    inputElement.addEventListener('input', () => {
      checkInputValidity(inputElement)
      toggleButton()
    })
    inputElement.addEventListener('blur', () => {
      toggleInputError(inputElement)
    })
    inputElement.addEventListener('focus', () => {
      toggleErrorSpan(inputElement)
    })
    checkboxElement.addEventListener('change', () => {
      toggleInputError(checkboxElement)
      toggleButton()
    })
  })
}

function checkInputValidity(inputElement) {
  if (inputElement.validity.patternMismatch) {
    inputElement.setCustomValidity(inputElement.dataset.errorMessage)
  } else {
	
    inputElement.setCustomValidity(checkLengthMismatch(inputElement))
  }
}

function checkLengthMismatch(inputElement) {
  if (inputElement.type !== 'text'&& inputElement.type !=='tel') {
    return ''
  }
  const valueLength = inputElement.value.trim().length
  if (valueLength < inputElement.minLength) {
    return `Минимальное количество символов: ${inputElement.minLength}`
  }
  return ''
}
function toggleInputError(inputElement) {
  if (!inputElement.validity.valid) {
    toggleErrorSpan(inputElement, inputElement.validationMessage)
  } else {
    toggleErrorSpan(inputElement)
  }
}

function hasInvalidInput() {
  return (
    inputList.some(inputElement => !inputElement.validity.valid) || !checkboxElement.validity.valid
  )
}

function toggleErrorSpan(inputElement, errorMessage){
  const errorElement = document.querySelector(`.${inputElement.id}-error`)
  
  if (errorMessage) {
    inputElement.classList.add('form__type-input-error')
    errorElement.textContent = errorMessage
    errorElement.classList.add('form__error-active')
  } else {
    inputElement.classList.remove('form__type-input-error')
    errorElement.textContent = ''
    errorElement.classList.remove('form__error-active')
  }
}

function toggleButton() {
  if (hasInvalidInput()) {
    buttonElement.classList.add('button-inactive')
    buttonElement.setAttribute('aria-disabled', 'true')
  } else {
    buttonElement.classList.remove('button-inactive')
    buttonElement.setAttribute('aria-disabled', 'false')
    formErrorElement.textContent = ''
  }
}

function formError() {
  const errorMessage = 'Заполните все поля для отправки формы.'
  formErrorElement.textContent = errorMessage
}
