import { z } from 'zod';
export const answersSchema = z.object({niche:z.string().trim().min(1).max(180),task:z.string().trim().min(1).max(180),audience:z.string().trim().min(1).max(180),goal:z.string().trim().min(1).max(180),details:z.string().trim().max(1200).default('')});
export type Answers = z.infer<typeof answersSchema>;
export const ideaSchema = z.object({name:z.string().min(1).max(100),description:z.string().min(1).max(650),scenario:z.string().min(1).max(450),benefit:z.string().min(1).max(450),complexity:z.enum(['Можно сделать быстро','Можно развить в полноценный продукт'])});
export const resultSchema = z.object({ideas:z.array(ideaSchema).length(3)});
export type Idea = z.infer<typeof ideaSchema>;
const quick = 'Можно сделать быстро' as const;
const product = 'Можно развить в полноценный продукт' as const;
export function generateDemo(a:Answers):Idea[] {
 const corpus = `${a.niche} ${a.task} ${a.details}`.toLowerCase();
 const beauty = /бьюти|красот|маникюр|мастер|волос|ногт/.test(corpus);
 const education = /образован|обуч|учени|курс|учител|репетитор/.test(corpus);
 const sales = /товар|продаж|магазин|покуп|одежд/.test(corpus);
 const context = beauty?'услуг мастера':education?'обучения':sales?'товаров':a.niche==='Для себя'?'личных дел':`направления «${a.niche}»`;
 const detail = a.details ? ` Отдельный фокус — твоя ситуация: «${a.details}».` : '';
 const audience = `Сервис рассчитан на аудиторию «${a.audience}».`;
 const goal = `Твоя цель — «${a.goal}»: `;
 let first:Idea;
 if (/запис|заявк/.test(corpus)) first={name:beauty?'Свободное окно':'Без переписки',description:`Помощник для ${context}: собирает пожелания, помогает выбрать ${beauty?'процедуру и удобное время':'услугу и время'} и готовит полную заявку. ${audience}${detail}`,scenario:'Пользователь → выбирает запрос и время → получает готовую заявку для подтверждения',benefit:goal+'меньше уточнений и потерянных заявок. Подтверждение остаётся за тобой.',complexity:quick};
 else if (/контент|блог|тем|пост|поиск идей/.test(corpus)) first={name:education?'Урок из жизни':'Тема с поводом',description:`Редактор идей для ${context}: превращает вопросы аудитории и реальные ситуации в темы ${education?'уроков':'публикаций'} с понятным планом. ${audience}${detail}`,scenario:'Пользователь → добавляет вопрос или наблюдение → получает тему, план и первый абзац',benefit:goal+'не начинать с пустого листа и говорить о том, что волнует твою аудиторию.',complexity:quick};
 else if (/расч[её]т|цен|стоим|бюджет/.test(corpus)) first={name:'Цена без загадок',description:`Калькулятор для ${context}: уточняет объём, пожелания и ограничения, показывает предварительную стоимость с пояснениями. ${audience}${detail}`,scenario:'Пользователь → указывает параметры → видит расчёт и что входит в стоимость',benefit:goal+'меньше ручных расчётов; ожидания и бюджет понятны до разговора.',complexity:quick};
 else if (/подбор|товар|продаж/.test(corpus)) first={name:'Точно под тебя',description:`Навигатор по выбору ${context}: задаёт короткие вопросы о потребностях и бюджете и объясняет, почему подходят конкретные варианты. ${audience}${detail}`,scenario:'Пользователь → отвечает о задаче и бюджете → получает сравнение трёх подходящих вариантов',benefit:goal+'упростить выбор и сократить повторные консультации.',complexity:quick};
 else if (/информац|документ|чтени|исслед/.test(corpus)) first={name:'Суть на ладони',description:`Рабочая выжимка для ${context}: превращает заметки и материалы в краткое резюме, вопросы и следующие действия. ${audience}${detail}`,scenario:'Пользователь → вставляет материал → получает суть, список действий и ссылки на фрагменты',benefit:goal+'быстрее находить нужное и возвращаться к первоисточнику для проверки.',complexity:quick};
 else first={name:beauty?'До визита':education?'Понятный старт':'Первый ответ',description:`Помощник для ${context}: отвечает на повторяющиеся вопросы по твоим материалам и собирает контекст перед личным разговором. ${audience}${detail}`,scenario:'Пользователь → описывает вопрос → получает ответ из твоих материалов и следующий шаг',benefit:goal+`освободить время, которое сейчас занимает «${a.task}». Сложные вопросы передаются человеку.`,complexity:quick};
 const second:Idea={name:education?'Маршрут к знанию':beauty?'Мой ритуал':sales?'После покупки':'Личный маршрут',description:`Мини-планировщик для ${context}: превращает запрос в последовательность небольших шагов с напоминаниями. ${audience}${detail}`,scenario:'Пользователь → выбирает цель и доступное время → получает личный план и отмечает прогресс',benefit:goal+`довести задачу до результата, а не ограничиться советом. Учитывает затруднение «${a.task}».`,complexity:product};
 const third:Idea={name: /контент|идей/.test(a.goal.toLowerCase())?'Банк живых историй':'Сигналы роста',description:`Карта обратной связи для ${context}: собирает короткие наблюдения и отзывы, группирует повторяющиеся запросы и предлагает ${/контент|идей/.test(a.goal.toLowerCase())?'темы из реальных историй':'одно улучшение на неделю'}. ${audience}${detail}`,scenario:'Пользователь → оставляет короткую заметку или отзыв → видит общие темы и конкретное предложение',benefit:goal+`принимать решения по реальным запросам. Первую подборку можно посвятить теме «${a.task}».`,complexity:quick};
 return [first,second,third];
}
