$(document).ready(function() {
  const START_DATE_INTERVAL = 1;              // Значение по умолчанию: 00:00 следующего дня
  const END_DATE_INTERVAL = 8;                // Значение по умолчанию: 00:00 следующего дня плюс неделя
  const REGISTRATION_DATE_INTERVAL = 8;       // Значение по умолчанию: Дата и время окончания проведения промоакции 
  const REGISTRATION_TIME_INTERVAL = 3;       // минус 3часа

  // Получить значение по умолчанию для даты начала
  function getDefaultStartDate() {
    return moment()
      .add(START_DATE_INTERVAL, 'day')
      .startOf('day');
  }

  // Получить значение по умолчанию для даты окончания
  function getDefaultEndDate() {
    return moment()
      .add(END_DATE_INTERVAL, 'day')
      .startOf('day');
  }

  // Получить значение по умольчанию для даты окончания регистрации
  function getDefaultRegistrationtDate() {
    return moment()
      .add(REGISTRATION_DATE_INTERVAL, 'day')
      .startOf('day')
      .subtract(REGISTRATION_TIME_INTERVAL, 'hours');
  }

  const defaultStartDate = getDefaultStartDate();                   //Значение по умолчанию: дата начала
  const defaultEndDate = getDefaultEndDate();                       //Значение по умолчанию: дата окончания
  const defaultRegistrationDate = getDefaultRegistrationtDate();    //Значение по умолчанию: дата окончания регистрации

  let startDate = defaultStartDate;                  // Текущая дата начала
  let endDate = defaultEndDate;                      // Текущая дата окончания
  let registrationDate = defaultRegistrationDate;    // Текущая дата окончания регистрации

  // Инициализируем DateTimePicker в элементе input #date-start
  $('#date-start').datetimepicker({
    // Устанавливаем значение в поле по умолчанию
    defaultDate: defaultStartDate,
    // Поделючаем локализацию
    // Файл локализации устарел, использование не рекомендуется
    //locale: ru;
  });

  //  Инициализируем DateTimePicker в элементе input #date-end
  $('#date-end').datetimepicker({
    defaultDate: defaultEndDate,
    // Поделючаем локализацию
    // Файл локализации устарел, использование не рекомендуется
    //locale: 'ru'
  });

  //  Инициализируем DateTimePicker в элементе input #date-registration
  $('#date-registration').datetimepicker({
    defaultDate: defaultRegistrationDate,
    // Поделючаем локализацию
    // Файл локализации устарел, использование не рекомендуется
    //locale: 'ru'
  });
  
  // Элемент select #type на вкладке "Основное"
  const select = $('#type');
  
  // Отчищаем select до выбора элемента списка
  select.prop("selectedIndex", -1);
  
  //=========================EVENTS============================
  
  // При нажатии на выпадающий список
  select.on('click', function() {
    if (select.val() == 1) {                      // Тип промоакции: Рекламная акция
      $('#extra-tab').addClass('hidden');         // Скрыть вкладку "Бонусные купоны"
      $('#description').removeClass('hidden');    // Проявить поле "Описание"
    }
    
    if (select.val() == 0) {                       // Тип промоакции: Бонусные купоны
      $('#description').addClass('hidden');        // Cкрыть поле "Опаисание"
      $('#extra-tab').removeClass('hidden');       // Проявить вкладку "Бонусные купоны"
    }
  });

  // При изменении пользователем даты в поле даты начала
  // записывает выбранное значение в startDate
  $('#date-start').on('dp.change', function(e) {
    startDate = e.date;
  });

  // При изменении пользователем даты в поле даты окончания
  // записывает выбранное значение в endDate
  $('#date-end').on('dp.change', function(e) {
    endDate = e.date;
  });

  // При изменнении пользователем даты в поле даты окончания регистрации
  // записвает выбранное значение в registrarionDate
  $('#date-registration').on('dp.change', function(e) {
    registrationDate = e.date;
  });
  
  // Скрывает и раскрывает дополнительные настройки при
  // нажатии на checkbox #settigs (Дополнительные настройки)
  $('#settings').on('change', function() {
    $('#partic-group').toggleClass('hidden');       // Чекбокс "Регистрация участников"
    $('#stock-group').toggleClass('hidden');        // Чекбокс "Досрочное завершение акции"
    $('#privilege-group').toggleClass('hidden');    // Чекбокс "Право на досрочное завершение"
  });
  
//=======================JQuery Validator============================
  
  // Инициализируем валидатор для главной формы
  // Вызывается при событие submit в форме
  // В данном случае при нажатии на кнопку #validate c типом submit
  // Форматирование (.firmat(...)) производится для корректного сравнения
  // значения в поле с требуемым
  $('#form-main').validate({
    // Набор правил для полей ввода
    rules: {
      name: {                                             // Поле ввода "Название"
        required: true,                                   // Обязательно к заполнению
        minlength: 5                                      // Минимаьлная длина - 5
      },
      dateStart: {                                        // Поле вводе "Дата начала"
        required: true,                                   // Обязательно к заполнению
        min: moment().format('MM/DD/YYYY')                // Минимальное значение - текущая дата
      },
      dateEnd: {                                          // Поле ввода "Дата окончания"
        required: true,                                   // Обязательно к заполнению
        min: function() {                                 // Минимальное значение - дата и время начала
          return startDate
            .add(3, 'hours')                              // + 3часа
            .format('MM/DD/YYYY h:mm:ss');
        }
      },
      dateRegistration: {                                 // Поле ввода "Дата окончания регистрации"
        required: true,                                   // Обязательно к заполнению
        min: function() {                                 // Минимальное значение - дата и время начала
          return startDate.format('MM/DD/YYYY h:mm:ss');
        },
        max: function() {                                 // Максимальное значение - дата и время окончания
          return endDate.format('MM/DD/YYYY h:mm:ss');
        }
      },
      description: {                                      // Поле ввода "Описание"
        required: function() {                            // Обязательно к заполнению, если раскрыто
          return !$('#description').hasClass('hidden');
        },
        minlength: 20                                     // Минимальная длина - 20
      },
      cost: {                                             // Поле ввода "Стоимость одного купона"
        required: function() {                            // Обязательно к заполнению при наличии
          return !$('#extra-tab').hasClass('hidden');     // вкладки "Бонусные купоны"
        },
        digits: true                                      // Только целые неотрицательные числа
      }
    },

    // Сообщения при несоответствии требованиям
    messages: {
      name: "Не короче 5 символов",
      dateStart: "Дата и время начала проведения промоакции не ранее текущей даты",
      dateEnd: "Дата и время окончания проведения промоакции не ранее даты и времени начала + 3 часа",
      dateRegistration: {
        min: "Дата окончания регистрации участников акции не ранее даты и времени начала",
        max: "Дата окончания регистрации участников акции не позднее даты и времени окончания"
      },
      description: "Описание рекламной акции не короче 20 символов",
      cost: "Стоимость купона - целое положительное число"
      
    },

    // Сообщения о несоответствии выводятся курсивом (в <em> элементе)
    errorElement: "em",

    // Сообщения о несоответствии помещаются в DOM по следующим правилам
    errorPlacement: function(error, element) {
      error.addClass('help-block');
      if (element.parent().hasClass("date")){       // Если это поле выбора даты
        error.insertAfter(element.parent());        // сообщения помещаются в div.col-sm-3
      } else {                                      // иначе
        error.insertAfter(element);                 // после input элемента
      }
    }
  });

});