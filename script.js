const toggles = document.querySelectorAll('.toggle');
const main = document.querySelector('main');

toggles.forEach(toggle => {
    toggle.addEventListener('click', (e) => {
        e.preventDefault();
        main.classList.toggle('sign-up-mode');
    });
});

const inputs = document.querySelectorAll('.input-field');

inputs.forEach(input => {
    input.addEventListener('focus', () => {
        input.classList.add('active');
    });

    input.addEventListener('blur', () => {
        if (input.value === '') {
            input.classList.remove('active');
        }
    });

    input.addEventListener('input', () => {
        if (input.value !== '') {
            input.classList.add('active');
        } else {
            input.classList.remove('active');
        }
    });
});

const bullets = document.querySelectorAll('.bullets span');
const images = document.querySelectorAll('.image');
const textSlider = document.querySelector('.text-group');

let currentSlide = 1;

function moveSlider() {
    let index = currentSlide - 1;
    let currentImage = document.querySelector('.image.show');
    let activeBullet = document.querySelector('.bullets span.active');

    currentImage.classList.remove('show');
    activeBullet.classList.remove('active');

    images[index].classList.add('show');
    bullets[index].classList.add('active');

    textSlider.style.transform = `translateY(${-(index) * 2.2}rem)`;
}

bullets.forEach(bullet => {
    bullet.addEventListener('click', () => {
        currentSlide = parseInt(bullet.dataset.value);
        moveSlider();
    });
});

setInterval(() => {
    currentSlide = currentSlide >= 3 ? 1 : currentSlide + 1;
    moveSlider();
}, 4000);

function getFormData(form) {
    const formData = {};
    const inputs = form.querySelectorAll('.input-field');
    
    inputs.forEach(input => {
        const label = input.nextElementSibling.textContent;
        formData[label] = input.value.trim();
    });
    
    return formData;
}

function validateForm(form) {
    const requiredFields = form.querySelectorAll('.input-field[required]');
    let isValid = true;
    let emptyFields = [];
    
    requiredFields.forEach(input => {
        if (!input.value.trim()) {
            isValid = false;
            const label = input.nextElementSibling.textContent;
            emptyFields.push(label);
            
            input.style.borderBottomColor = '#ff4757';
        } else {
            input.style.borderBottomColor = '#151111';
        }
    });
    
    return { isValid, emptyFields };
}

const signInForm = document.querySelector('.sign-in-form');
const signUpForm = document.querySelector('.sign-up-form');

signInForm.addEventListener('submit', (e) => {
    e.preventDefault();
    
    const validation = validateForm(signInForm);
    
    if (validation.isValid) {
        const formData = getFormData(signInForm);
        
        console.log('=== ДАННЫЕ ФОРМЫ ВХОДА ===');
        console.log('Логин:', formData['Логин']);
        console.log('Пароль:', formData['Пароль']);
        console.log('========================');
        
        alert('Данные отправлены! Проверьте консоль (F12)');
        
        signInForm.reset();
        inputs.forEach(input => input.classList.remove('active'));
        
    } else {
        console.warn('Форма входа не отправлена. Не заполнены обязательные поля:', validation.emptyFields);
        alert(`Пожалуйста, заполните следующие поля: ${validation.emptyFields.join(', ')}`);
    }
});

signUpForm.addEventListener('submit', (e) => {
    e.preventDefault();
    
    const validation = validateForm(signUpForm);
    
    if (validation.isValid) {
        const formData = getFormData(signUpForm);
        
        console.log('=== ДАННЫЕ ФОРМЫ РЕГИСТРАЦИИ ===');
        console.log('Имя:', formData['Имя']);
        console.log('Фамилия:', formData['Фамилия']);
        console.log('Отчество:', formData['Отчество'] || 'Не указано');
        console.log('Город:', formData['Город']);
        console.log('Номер телефона:', formData['Номер телефона']);
        console.log('Логин:', formData['Логин']);
        console.log('Пароль:', formData['Пароль']);
        console.log('===============================');
        
        alert('Данные отправлены! Проверьте консоль (F12)');
        
        signUpForm.reset();
        inputs.forEach(input => input.classList.remove('active'));
        
    } else {
        console.warn('Форма регистрации не отправлена. Не заполнены обязательные поля:', validation.emptyFields);
        alert(`Пожалуйста, заполните следующие поля: ${validation.emptyFields.join(', ')}`);
    }
});

inputs.forEach(input => {
    input.addEventListener('input', () => {
        if (input.value.trim()) {
            input.style.borderBottomColor = '#151111';
        }
    });
});

function clearValidationErrors() {
    inputs.forEach(input => {
        input.style.borderBottomColor = '#bbb';
    });
}

toggles.forEach(toggle => {
    toggle.addEventListener('click', () => {
        setTimeout(clearValidationErrors, 100);
    });
});
