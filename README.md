# artofad-test
## Тестовое задание

> Вёрстка должны быть выполнена с использованием Bootstrap 3, для работы с датами - moment.js, валидация форм - jQuery Validate

#### Форма добавления новой промоакции:

1. Название промоакции
2. Дата и время начала проведения промоакции (Значение по умолчанию: 00:00 следующего дня)
3. Дата и время окончания проведения промоакции (Значение по умолчанию: 00:00 следующего дня плюс неделя, например если сегодня среда 15:00, то значение по умолчанию - следующий четверг 00:00)
4. Дата окончания регистрации участников акции (Значение по умолчанию: Дата и время окончания проведения промоакции минус 3часа
5. Тип промоакции (выпадающий список, возможные значения: “Бонусные купоны”, “Рекламная акция”). При выборе типа промоакции “Рекламная акция” на форму добавляется доступное для заполнения текстовое поле “Описание”. При выборе типа промоакции “Бонусные купоны”, добавляется новая вкладка с полями:
   - Инпут “Стоимость одного купона”
   - Чекбокс “Расширенные настройки”, при выборе которого, на форме становятся активными следующие элементы:
       - Чекбокс “Регистрация участников”
       - Чекбокс “Досрочное завершение акции”
       - Выпадающий список “Право на досрочное завершение” с возможностью одновременного выбора нескольких опций (варианты выбора: “кассир”, “менеджер”, “администратор”)
6. Кнопка "Валидировать". При Валидации проверяются:
   - Название. Не короче 5 символов
   - Дата и время начала проведения промоакции не ранее текущей даты.
   - Дата и время окончания проведения промоакции не ранее даты и времени начала + 3 часа
   - Дата окончания регистрации участников акции не ранее даты и времени начала и не позднее даты и времени окончания
   - Описание рекламной акции не короче 20 символов
   - Стоимость купона - целое положительное число

#### Примерный вид форм:

![](https://image.ibb.co/fTe2ed/1.png)
![](https://image.ibb.co/kpYykJ/2.png)
